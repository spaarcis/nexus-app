import { IconAvailable, IconAvailableDenger } from "@/Icons/Icons";
import {
  useBooking_newMutation,
  useBooking_rescheduleMutation,
  useUser_promo_codeQuery,
} from "@/redux/apiSlices/bookingApi/bookingSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Image, ImageBackground } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import tw from "@/lib/tailwind";
import { useLazyCheck_availabilityQuery } from "@/redux/apiSlices/exploreApi/exploreApiSlice";
import { useGame_zone_detailsQuery } from "@/redux/apiSlices/home/homeSlice";
import { IRoom } from "@/redux/interface/interface";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { SvgXml } from "react-native-svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface IMetadata {
  availability_status: string;
  date: string;
  duration: number;
  room_id: string;
  room_image: string;
  starting_time: string;
  to_pay: number;
}

interface Seat {
  index_id: number;
  booking_id: number | null;
  is_book: boolean;
  pc_no: number;
}

interface PromoItem {
  coupon: {
    id: number;
    promo_code: string;
    percentage: number;
    validate_date: string;
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
const SeatPosition = () => {
  const { allData, type, id, selectedRoomName, booking_id } =
    useLocalSearchParams();

  const [parsedData, setParsedData] = useState<any>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [selectedPcNo, setSelectedPcNo] = useState<number | null>(null);
  const [showPromoModal, setShowPromoModal] = useState<boolean>(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<string>("Select");
  const [selectedRoomID, setSelectedRoomID] = useState<number | null>(null);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState<number | null>(
    null,
  ); // ✅ room price
  const [successModalVisible, setSuccessModalVisible] =
    useState<boolean>(false);
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);
  const [promoPercent, setPromoPercent] = useState<number>(0);
  const [couponID, setCouponID] = useState<number | null>(null);
  const [seatData, setSeatData] = useState<Seat[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<string>("");

  // ─── API hooks ───────────────────────────────────────────────────────────────
  const { data: details } = useGame_zone_detailsQuery({ id: id as string });
  const [booking_new] = useBooking_newMutation();
  const [booking_reschedule] = useBooking_rescheduleMutation();

  const [triggerCheckAvailability, { isFetching: isRoomChangeFetching }] =
    useLazyCheck_availabilityQuery();

  const metadata: IMetadata | undefined =
    parsedData?.availabilityData?.metadata;

  const { data: promoData, isLoading: promoLoading } = useUser_promo_codeQuery(
    parsedData?.roomId,
  );

  // ─── Toast helper ────────────────────────────────────────────────────────────
  const showToast = (message: string) =>
    router.push({ pathname: "/Toaster", params: { res: message } });

  // ─── Parse params + initial seat data + initial room price ───────────────────
  useEffect(() => {
    if (selectedRoomName) setSelectedRoom(selectedRoomName as string);

    if (allData) {
      try {
        const raw = Array.isArray(allData) ? allData[0] : allData;
        const parsed = JSON.parse(raw);
        setParsedData(parsed);
        setSelectedRoomID(parsed?.roomId ?? null);
        setSeatData(parsed?.availabilityData?.data ?? []);
        setAvailabilityStatus(
          parsed?.availabilityData?.metadata?.availability_status ?? "",
        );
      } catch {
        showToast("Failed to load seat data. Please go back and try again.");
      }
    }
  }, [allData, selectedRoomName]);

  useEffect(() => {
    if (!details?.data?.rooms || !parsedData?.roomId) return;
    const currentRoom = details.data.rooms.find(
      (r: IRoom) => r.id === parsedData.roomId,
    );
    if (currentRoom?.price != null) {
      setSelectedRoomPrice(currentRoom.price);
    }
  }, [details, parsedData]);

  // ─── Room change → re-fetch seat data + update price ─────────────────────────
  const handleRoomChange = async (room: IRoom) => {
    setSelectedRoom(room?.name);
    setSelectedRoomID(room?.id as any);
    setSelectedRoomPrice(room?.price ?? null);
    setShowRoomDropdown(false);
    setSelectedSeat(null);
    setSelectedPcNo(null);

    if (!metadata?.date || !metadata?.starting_time || !metadata?.duration)
      return;

    try {
      const res = await triggerCheckAvailability({
        room_id: room?.id,
        date: metadata.date,
        starting_time: metadata.starting_time,
        duration: metadata.duration,
      }).unwrap();

      setSeatData(res?.data ?? []);
      setAvailabilityStatus(res?.metadata?.availability_status ?? "");
    } catch {
      showToast("Could not fetch seats for this room. Please try again.");
    }
  };

  // ─── Loading guard ────────────────────────────────────────────────────────────

  if (promoLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base`}>
        <ActivityIndicator size="large" color="#0c8ce9" />
        <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
          Loading...
        </Text>
      </View>
    );
  }

  // ─── Seat press ───────────────────────────────────────────────────────────────
  const handleSeatPress = (
    seatLabel: string,
    pcNo: number,
    available: boolean,
  ) => {
    if (!available) return;
    if (selectedSeat === seatLabel) {
      setSelectedSeat(null);
      setSelectedPcNo(null);
    } else {
      setSelectedSeat(seatLabel);
      setSelectedPcNo(pcNo);
    }
  };

  // ─── Amount calculation ───────────────────────────────────────────────────────
  const duration = parsedData?.duration ?? metadata?.duration ?? 1;
  const originalAmount =
    selectedRoomPrice != null
      ? selectedRoomPrice * duration
      : parseFloat(String(metadata?.to_pay)) || 0;

  const discountAmount =
    selectedPromo && promoPercent ? (originalAmount * promoPercent) / 100 : 0;

  const totalAmount = originalAmount - discountAmount;

  // ─── Build booking payload ────────────────────────────────────────────────────
  const buildBaseData = () => ({
    duration: parsedData?.duration,
    pc_no: selectedPcNo,
    total: totalAmount.toFixed(2),
    starting_time: parsedData?.starting_time,
    booking_date: parsedData?.date,
    room_id: selectedRoomID ?? parsedData?.roomId,
    provider_id: id,
    ...(selectedPromo && { promo_code: selectedPromo, coupon_id: couponID }),
  });

  const validateBeforeBooking = (): boolean => {
    if (!selectedPcNo) {
      showToast("Please select a seat first");
      return false;
    }
    return true;
  };

  // ─── Confirm booking ──────────────────────────────────────────────────────────
  const handleConfirmBooking = async () => {
    if (!validateBeforeBooking()) return;

    const baseData = buildBaseData();
    const formData = new FormData();
    Object.entries(baseData).forEach(([key, value]) => {
      if (value !== undefined && value !== null)
        formData.append(key, String(value));
    });

    try {
      const res = await booking_new(formData).unwrap();
      if (res?.data || res?.status === "success") setSuccessModalVisible(true);
    } catch (error: any) {
      showToast(error?.data?.message ?? "Booking failed. Please try again.");
    }
  };

  // ─── Reschedule ───────────────────────────────────────────────────────────────
  const handleReschedule = async () => {
    if (!validateBeforeBooking()) return;

    const formData = new FormData();
    Object.entries({ _method: "PUT", ...buildBaseData() }).forEach(
      ([key, value]) => {
        if (value !== undefined && value !== null)
          formData.append(key, String(value));
      },
    );

    try {
      const res = await booking_reschedule({
        formData,
        id: booking_id,
      }).unwrap();
      if (res?.data || res?.status === "success") setSuccessModalVisible(true);
    } catch (error: any) {
      showToast(error?.data?.message ?? "Reschedule failed. Please try again.");
    }
  };

  const isAvailable = availabilityStatus === "Available Now";

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <View style={tw`flex-1`}>
      <ImageBackground
        source={ImgGradint}
        style={{
          width: _Width,
          height: _HIGHT,
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#000000",
        }}
      />

      <ScrollView style={tw`flex-1 px-4`}>
        {/* ── Header ── */}
        <View style={tw`flex-row justify-between items-center mt-2 mb-6`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`flex-row items-center`}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={tw`text-primary font-poppins text-lg ml-1`}>Back</Text>
          </TouchableOpacity>

          {availabilityStatus ? (
            <View
              style={tw`flex-row items-center gap-2 px-4 py-2 rounded-full`}
            >
              <Text
                style={tw`${isAvailable ? "text-green-600" : "text-red-500"} font-poppinsMedium`}
              >
                {availabilityStatus}
              </Text>
              <SvgXml xml={isAvailable ? IconAvailable : IconAvailableDenger} />
            </View>
          ) : null}
        </View>

        {/* ── Banner ── */}
        <View style={tw`mb-6 rounded-2xl overflow-hidden h-48`}>
          <ImageBackground
            source={{ uri: details?.data?.gaming_zone }}
            style={tw`flex-1`}
          />
        </View>

        {/* ── Select Room ── */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-lg font-poppinsBold mb-3`}>
            Select Room
          </Text>
          <TouchableOpacity
            onPress={() => setShowRoomDropdown(!showRoomDropdown)}
            style={tw`bg-white/10 mt-2 rounded-full p-4 flex-row justify-between items-center border border-gray-700`}
            disabled={isRoomChangeFetching}
          >
            {isRoomChangeFetching ? (
              <ActivityIndicator size="small" color="#9CA3AF" />
            ) : (
              <View style={tw`flex-row items-center justify-between flex-1`}>
                <Text style={tw`text-gray-400 text-base font-poppins`}>
                  {selectedRoom}
                </Text>
                {/* ✅ Selected room এর price দেখাও */}
                {selectedRoomPrice != null && (
                  <Text style={tw`text-white text-sm font-poppinsMedium mr-2`}>
                    € {selectedRoomPrice.toFixed(2)} / hr
                  </Text>
                )}
              </View>
            )}
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {showRoomDropdown && (
            <View style={tw`bg-white/10 mt-2 rounded-lg`}>
              <ScrollView
                style={tw`max-h-60`}
                nestedScrollEnabled
                showsVerticalScrollIndicator
              >
                {details?.data?.rooms?.map((room: IRoom, index: number) => (
                  <TouchableOpacity
                    key={room?.id}
                    onPress={() => handleRoomChange(room)}
                    style={tw`p-4 flex-row justify-between items-center ${
                      index !== details?.data?.rooms?.length - 1
                        ? "border-b border-gray-700"
                        : ""
                    }`}
                  >
                    <Text style={tw`text-white text-base font-poppins`}>
                      {room?.name}
                    </Text>
                    {room?.price != null && (
                      <Text style={tw`text-gray-400 text-sm font-poppins`}>
                        € {Number(room.price).toFixed(2)} / hr
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* ── Seat Grid ── */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-lg font-poppinsBold mb-4`}>
            Available Seat
          </Text>

          {seatData.length === 0 ? (
            <Text style={tw`text-gray-500 text-center py-4`}>
              No seats available
            </Text>
          ) : (
            <View style={tw`flex-row flex-wrap justify-between`}>
              {seatData.map((seat: Seat, index: number) => {
                const seatLabel = `PC ${seat.pc_no}`;
                const isSelected = selectedSeat === seatLabel;

                return (
                  <TouchableOpacity
                    key={seat.index_id ?? index}
                    onPress={() =>
                      handleSeatPress(seatLabel, seat.pc_no, !seat.is_book)
                    }
                    style={tw`items-center mb-4 ${index >= 6 ? "w-1/5" : "w-1/6"}`}
                    disabled={seat.is_book}
                  >
                    <View
                      style={tw`w-12 h-12 rounded-full border-2 items-center justify-center mb-2 ${
                        seat.is_book
                          ? "border-red-500"
                          : isSelected
                            ? "border-secondaryGreen"
                            : "bg-gray-800/80 border-gray-600"
                      }`}
                    >
                      <Ionicons
                        name="desktop-outline"
                        size={18}
                        color={seat.is_book ? "#EF4444" : "#FFFFFF"}
                      />
                    </View>
                    <Text
                      style={tw`text-xs font-poppinsMedium ${
                        seat.is_book
                          ? "text-red-400"
                          : isSelected
                            ? "text-secondaryGreen"
                            : "text-gray-400"
                      }`}
                    >
                      {seatLabel}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        {/* ── Payment Details ── */}
        <View style={tw`mb-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-white text-lg font-poppinsBold`}>
              Payment Details
            </Text>
            {(promoData?.data?.length ?? 0) > 0 && (
              <TouchableOpacity onPress={() => setShowPromoModal(true)}>
                <MaskedView
                  maskElement={
                    <Text
                      style={[
                        tw`text-base font-poppinsBold`,
                        { backgroundColor: "transparent" },
                      ]}
                    >
                      Apply promo
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={["#6523E7", "#023CE3", "#6523E7"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text
                      style={[tw`text-base font-poppinsBold`, { opacity: 0 }]}
                    >
                      Apply promo
                    </Text>
                  </LinearGradient>
                </MaskedView>
              </TouchableOpacity>
            )}
          </View>

          {/* ✅ Room price × duration breakdown */}
          {selectedRoomPrice != null && (
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <Text style={tw`text-gray-400 text-sm font-poppins`}>
                € {selectedRoomPrice.toFixed(2)} × {duration} hr
              </Text>
              <Text style={tw`text-gray-300 text-sm font-poppins`}>
                € {originalAmount.toFixed(2)}
              </Text>
            </View>
          )}

          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-gray-300 text-base font-poppins`}>
              To pay:
            </Text>
            <Text style={tw`text-white text-base font-poppinsBold`}>
              € {originalAmount.toFixed(2)}
            </Text>
          </View>

          {selectedPromo && promoPercent > 0 && (
            <>
              <View style={tw`flex-row justify-between items-center mb-1`}>
                <Text style={tw`text-gray-300 text-base font-poppins`}>
                  Discount ({promoPercent}%):
                </Text>
                <Text style={tw`text-green-400 text-base font-poppinsBold`}>
                  -€ {discountAmount.toFixed(2)}
                </Text>
              </View>
              <View style={tw`flex-row justify-between items-center mb-3`}>
                <Text style={tw`text-gray-300 text-base font-poppins`}>
                  Promo Code:
                </Text>
                <Text style={tw`text-white text-base font-poppinsBold`}>
                  {selectedPromo}
                </Text>
              </View>
            </>
          )}

          <View style={tw`h-px bg-gray-700 mb-4`} />

          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-white text-lg font-poppinsBold`}>Total:</Text>
            <Text style={tw`text-white text-xl font-poppinsBold`}>
              € {totalAmount.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* ── Confirm Button ── */}
        <TouchableOpacity
          style={tw`mb-8 mt-16`}
          onPress={type === "booking" ? handleConfirmBooking : handleReschedule}
        >
          <CustomButton title="Confirm Booking" />
        </TouchableOpacity>
      </ScrollView>

      {/* ── Promo Modal ── */}
      {showPromoModal && (
        <View
          style={tw`absolute inset-0 bg-black/80 flex-1 justify-center items-center px-4`}
        >
          <View
            style={tw`bg-primaryBlack border border-[#0c8ce9] rounded-2xl p-6 w-full max-w-sm`}
          >
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-white text-lg font-poppinsBold`}>
                Your promo code
              </Text>
              <TouchableOpacity onPress={() => setShowPromoModal(false)}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={tw`mb-6`}>
              {promoData?.data?.map((promo: PromoItem, index: number) => {
                const isSelected = selectedPromo === promo?.coupon?.promo_code;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelectedPromo(promo?.coupon?.promo_code);
                      setPromoPercent(promo?.coupon?.percentage);
                      setCouponID(promo?.coupon?.id);
                    }}
                    style={tw`flex-row items-center justify-between py-3 ${
                      index !== promoData?.data?.length - 1
                        ? "border-b border-gray-700"
                        : ""
                    }`}
                  >
                    <View style={tw`flex-row items-center`}>
                      <View
                        style={tw`w-5 h-5 rounded-full border-2 mr-3 ${
                          isSelected
                            ? "border-[#0c8ce9] bg-[#0c8ce9]"
                            : "border-gray-500"
                        }`}
                      />
                      <Text style={tw`text-white text-base font-poppins`}>
                        {promo?.coupon?.promo_code}
                      </Text>
                    </View>
                    <Text style={tw`text-gray-400 text-sm font-poppins`}>
                      Exp {promo?.coupon?.validate_date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                onPress={() => setShowPromoModal(false)}
                style={tw`flex-1 py-3 rounded-full border border-gray-600`}
              >
                <Text
                  style={tw`text-white text-center text-lg font-poppinsBlack`}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`flex-1`}
                onPress={() => setShowPromoModal(false)}
              >
                <CustomButton title="Apply" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* ── Success Modal ── */}
      <Modal
        visible={successModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/70 p-5`}>
          <View
            style={tw`bg-primaryBlack rounded-2xl border border-[#0c8ce9] p-6 w-full max-w-md`}
          >
            <View style={tw`absolute top-0 left-0 right-0 items-center`}>
              <Image
                source={require("../../../assets/images/confirm.gif")}
                style={tw`w-44 h-44`}
              />
            </View>
            <View style={tw`mt-40 items-center`}>
              <Text style={tw`text-white text-2xl font-bold mb-2`}>
                Successful
              </Text>
              <Text style={tw`text-gray-300 text-center mb-6`}>
                Your booking has been confirmed successfully.
              </Text>
              <TouchableOpacity
                style={tw`mb-4 w-full`}
                onPress={() => {
                  setSuccessModalVisible(false);
                  router.replace("/Main/Homes/Home");
                }}
              >
                <CustomButton title="Back to Home" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SeatPosition;
