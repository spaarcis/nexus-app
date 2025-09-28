import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import { IconAvailable, IconAvailableDenger } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import {
  useBooking_newMutation,
  useBooking_rescheduleMutation,
  useUser_promo_codeQuery,
} from "@/redux/apiSlices/bookingApi/bookingSlice";
import { useCheck_availabilityQuery } from "@/redux/apiSlices/exploreApi/exploreApiSlice";
import { useGame_zone_detailsQuery } from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { Image, ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

interface Room {
  id: number;
  name: string;
}
interface Seat {
  index_id: number;
  booking_id: number;
  is_book: boolean;
  pc_no: number;
}

const seatPosotion = () => {
  const { allData, type, id } = useLocalSearchParams();
  const [parsedData, setParsedData] = useState<any>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Select");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<string | null>(null);
  const [selectedRoomID, setSelectedRoomID] = useState<number | null>(null);
  const [backendSeats, setBackendSeats] = useState<Seat[]>([]);
  const [percen, setPercen] = useState([]);
  const [pc_No, setPc_No] = useState([]);
  const [couponID, setCouponID] = useState([]);

  useEffect(() => {
    if (allData) {
      try {
        const dataString = Array.isArray(allData) ? allData[0] : allData;
        const parsed = JSON.parse(dataString);
        setParsedData(parsed);
      } catch (error) {
        console.error("Error parsing allData:", error);
      }
    }
  }, [allData]);
  const metadata = parsedData?.availabilityData?.metadata;
  const { data: details, isLoading } = useGame_zone_detailsQuery({
    id: parsedData?.roomId,
  });
  const [booking_new] = useBooking_newMutation();
  const [booking_reschedule] = useBooking_rescheduleMutation();
  const { data: Check_availability, isLoading: isCheckingAvailability } =
    useCheck_availabilityQuery({
      room_id: selectedRoomID || parsedData?.roomId,
      date: metadata?.date,
      starting_time: metadata?.starting_time,
      duration: metadata?.duration,
    });
  const { data: promoData, isLoading: promoLodding } = useUser_promo_codeQuery(
    parsedData?.roomId
  );

  useEffect(() => {
    if (Check_availability?.data) {
      setBackendSeats(Check_availability?.data);
    }
  }, [Check_availability?.data]);

  if (isCheckingAvailability || isLoading || promoLodding) {
    return (
      // Added return here
      <View style={tw`flex-1 justify-center items-center bg-base`}>
        <ActivityIndicator size="large" color="#0c8ce9" />
        <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
          Loading...
        </Text>
      </View>
    );
  }
  const handleSeatPress = (seatId: string, available: boolean) => {
    if (available) {
      setSelectedSeat(selectedSeat === seatId ? null : seatId);
    }
  };

  const calculateTotalAmount = () => {
    const originalAmount = parseFloat(metadata?.to_pay) || 0;

    if (selectedPromo && percen) {
      const discountAmount = (originalAmount * parseInt(percen as any)) / 100;
      return originalAmount - discountAmount;
    }

    return originalAmount;
  };

  const totalAmount = calculateTotalAmount();
  const originalAmount = parseFloat(metadata?.to_pay) || 0;
  // -----------booking------------//
  const handelConfirmBokking = async () => {
    //----------- Base data object ------------//
    const baseData = {
      duration: metadata?.duration,
      pc_no: pc_No,
      total: totalAmount.toFixed(2),
      starting_time: metadata?.starting_time,
      booking_date: metadata?.date,
      room_id: selectedRoomID || parsedData?.roomId,
      provider_id: parsedData?.roomId,
    };

    const dataWithPromo = selectedPromo
      ? {
          ...baseData,
          promo_code: selectedPromo,
          coupon_id: couponID,
        }
      : baseData;

    try {
      const res = await booking_new(dataWithPromo).unwrap();
      if (res?.data) {
        setSuccessModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelReschedule = async () => {
    const baseData = {
      _method: "PUT",
      duration: metadata?.duration,
      pc_no: pc_No,
      total: totalAmount.toFixed(2),
      starting_time: metadata?.starting_time,
      booking_date: metadata?.date,
      room_id: selectedRoomID || parsedData?.roomId,
      provider_id: parsedData?.roomId,
    };

    const dataWithPromo = selectedPromo
      ? {
          ...baseData,
          promo_code: selectedPromo,
          coupon_id: couponID,
        }
      : baseData;
    console.log(dataWithPromo, "dataWithPromo");

    // 👉 Convert to FormData
    const formData = new FormData();
    Object.entries(dataWithPromo).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      const res = await booking_reschedule({
        formData,
        id: id,
      }).unwrap();
      if (res?.data) {
        console.log("booking_reschedule", res.data);
        setSuccessModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(id, "id ididididididididididididid");

  return (
    <View style={tw`flex-1`}>
      {/* Background Image */}
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
        {/* Header */}
        <View style={tw`flex-row justify-between items-center mt-12 mb-6`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`flex-row items-center`}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={tw`text-primary font-poppins text-lg ml-1`}>Back</Text>
          </TouchableOpacity>

          {Check_availability?.metadata?.availability_status ==
          "Available Now" ? (
            <TouchableOpacity
              style={tw` flex-row items-center justify-center gap-2 px-4 py-2 rounded-full`}
            >
              <Text style={tw`text-green-600 font-poppinsMedium`}>
                {Check_availability?.metadata?.availability_status}
              </Text>
              <SvgXml xml={IconAvailable} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={tw` flex-row items-center justify-center gap-2 px-4 py-2 rounded-full`}
            >
              <Text style={tw`text-red-500 font-poppinsMedium`}>
                {Check_availability?.metadata?.availability_status}
              </Text>
              <SvgXml xml={IconAvailableDenger} />
            </TouchableOpacity>
          )}
        </View>

        {/* Gaming Lounge Banner */}
        <View style={tw`mb-6 rounded-2xl overflow-hidden h-48`}>
          <ImageBackground
            source={{
              uri: details?.address?.gaming_zone,
            }}
            style={tw`flex-1 justify-end`}
          >
            <View style={tw`bg-black/60 p-4`}>
              <Text style={tw`text-white text-xl font-poppinsBold`}>
                Gaming Lounge
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Select Room */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-lg font-poppinsBold mb-3`}>
            Select Room
          </Text>
          <TouchableOpacity
            onPress={() => setShowRoomDropdown(!showRoomDropdown)}
            style={tw`bg-white/10 mt-2 rounded-full p-4 flex-row justify-between items-center border border-gray-700`}
          >
            <Text style={tw`text-gray-400 text-base font-poppins`}>
              {selectedRoom}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
          </TouchableOpacity>
          {showRoomDropdown && (
            <View style={tw`bg-white/10 mt-2 rounded-lg`}>
              <ScrollView
                style={tw`max-h-60`}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {details?.data?.rooms?.map((roomItem: Room, index: number) => (
                  <TouchableOpacity
                    key={roomItem?.id}
                    onPress={() => {
                      setSelectedRoom(roomItem?.name);
                      setSelectedRoomID(roomItem?.id);
                      setShowRoomDropdown(false);
                    }}
                    style={tw`p-4 ${
                      index !== details?.data?.rooms?.length - 1
                        ? "border-b border-gray-700"
                        : ""
                    }`}
                  >
                    <Text style={tw`text-white text-base font-poppins`}>
                      {roomItem?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Available Seat */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-lg font-poppinsBold mb-4`}>
            Available Seat
          </Text>

          {/* All seats in proper grid */}
          <View style={tw`flex-row flex-wrap justify-between`}>
            {backendSeats.map((seat: Seat, index) => (
              <TouchableOpacity
                key={seat.index_id}
                onPress={() => {
                  handleSeatPress(`PC ${seat.pc_no}`, !seat.is_book);
                  setPc_No(seat.pc_no as any);
                }}
                style={tw`items-center mb-4 ${index >= 6 ? "w-1/5" : "w-1/6"}`}
                disabled={seat.is_book}
              >
                <View
                  style={tw`w-12 h-12 rounded-full border-2 items-center justify-center mb-2 ${
                    seat.is_book
                      ? "border-red-500"
                      : selectedSeat === `PC ${seat.pc_no}`
                      ? " border-secondaryGreen"
                      : "bg-gray-800/80 border-gray-600"
                  }`}
                >
                  <Ionicons
                    name="desktop-outline"
                    size={18}
                    color={
                      seat.is_book
                        ? "#EF4444"
                        : selectedSeat === `PC ${seat.pc_no}`
                        ? "#FFFFFF"
                        : "#FFFFFF"
                    }
                  />
                </View>
                <Text
                  style={tw`text-xs font-poppinsMedium ${
                    seat.is_book
                      ? "text-red-400"
                      : selectedSeat === `PC ${seat.pc_no}`
                      ? "text-secondaryGreen"
                      : "text-gray-400"
                  }`}
                >
                  PC {seat.pc_no}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Details */}
        <View style={tw`mb-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-white text-lg font-poppinsBold`}>
              Payment Details
            </Text>
            {promoData?.data.length > 0 && (
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

          <View>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-gray-300 text-base font-poppins`}>
                To pay:
              </Text>
              <Text style={tw`text-white text-base font-poppinsBold`}>
                € {originalAmount.toFixed(2)}
              </Text>
            </View>

            {/* Show discount details if promo is applied */}
            {selectedPromo && percen && (
              <>
                <View style={tw`flex-row justify-between items-center mb-1`}>
                  <Text style={tw`text-gray-300 text-base font-poppins`}>
                    Discount ({percen}%):
                  </Text>
                  <Text style={tw`text-green-400 text-base font-poppinsBold`}>
                    -€{" "}
                    {((originalAmount * parseInt(percen as any)) / 100).toFixed(
                      2
                    )}
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
              <Text style={tw`text-white text-lg font-poppinsBold`}>
                Total:
              </Text>
              <Text style={tw`text-white text-xl font-poppinsBold`}>
                € {totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Promo Code Modal */}
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
              {/* Promo Code Options */}
              <View style={tw`mb-6`}>
                {promoData?.data?.map((promo: any, index: any) => {
                  const isSelected =
                    selectedPromo === promo?.coupon?.promo_code;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedPromo(promo?.coupon?.promo_code);
                        setPercen(promo?.coupon?.percentage);
                        setCouponID(promo?.coupon?.id);
                      }}
                      style={tw`flex-row items-center justify-between py-3 ${
                        index !== promoData?.data?.length - 1
                          ? "border-b border-gray-700"
                          : ""
                      }`}
                    >
                      <View style={tw`flex-row items-center`}>
                        {/* Radio Circle */}
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
                        Exp in {promo?.coupon?.validate_date}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Modal Buttons */}
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
                  onPress={() => {
                    if (selectedPromo) {
                    }
                    setShowPromoModal(false);
                  }}
                >
                  <CustomButton title={"Apply"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* footer confirm btn */}
        <TouchableOpacity
          style={tw` mb-8 mt-16`}
          onPress={type == "booking" ? handelConfirmBokking : handelReschedule}
        >
          <CustomButton title={"Confirm Booking"} />
        </TouchableOpacity>
      </ScrollView>
      {/* Success Modal */}
      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/70 p-5`}>
          <View
            style={tw`bg-primaryBlack rounded-2xl border border-[#0c8ce9]  p-6 w-full max-w-md`}
          >
            <View style={tw`absolute top-0 left-0 right-0 items-center`}>
              <Image
                source={require("../../../assets/images/confirm.gif")}
                style={tw`w-44 h-44`}
              />
            </View>
            {/* Success Content */}
            <View style={tw`mt-40 items-center`}>
              <Text style={tw`text-white text-2xl font-bold mb-2`}>
                Successful
              </Text>
              <Text style={tw`text-gray-300 text-center mb-6`}>
                Your successfully confirm the booking.
              </Text>

              <TouchableOpacity
                style={tw`mb-4 w-full`}
                onPress={() => {
                  setSuccessModalVisible(false);
                  router.push("/");
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

export default seatPosotion;
