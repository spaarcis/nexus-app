import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import {
  IconContact,
  IconLocationDetails,
  IconStar,
  IconTime,
} from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useLazyCheck_availabilityQuery } from "@/redux/apiSlices/exploreApi/exploreApiSlice";
import {
  useAdd_to_favorite_zoneMutation,
  useGame_zone_detailsQuery,
} from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { Image, ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Room {
  id: string;
  name: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDateForAPI = (dateString: string): string => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  if (!day || !month || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const getDurationNumber = (durationString: string): number => {
  if (!durationString || durationString === "Select Duration") return 0;
  return parseInt(durationString, 10);
};

const parseTime = (time: string) =>
  time.includes("AM") || time.includes("PM")
    ? moment(time, "hh:mm A")
    : moment(time, "HH:mm");

const DURATIONS = [
  "1 hour",
  "2 hour",
  "3 hour",
  "4 hour",
  "5 hour",
  "6 hour",
  "7 hour",
  "8 hour",
];

// ─── Component ────────────────────────────────────────────────────────────────
const RoomDetails = () => {
  const { id, type, booking_id } = useLocalSearchParams();
  const { data: details, isLoading } = useGame_zone_detailsQuery({ id });
  const [add_to_favorite_zone, { isLoading: isAddLoading }] =
    useAdd_to_favorite_zoneMutation();
  const [triggerCheckAvailability, { isFetching: isCheckingAvailability }] =
    useLazyCheck_availabilityQuery();

  // ── Form state
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedRoomID, setSelectedRoomID] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isTimeValid, setIsTimeValid] = useState<boolean>(true);
  const [selectedDuration, setSelectedDuration] =
    useState<string>("Select Duration");

  // ── UI toggles
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);
  const [showDurationDropdown, setShowDurationDropdown] =
    useState<boolean>(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState<boolean>(false);

  // ─── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (message: string) =>
    router.push({ pathname: "/Toaster", params: { res: message } });

  // ─── Date picker ────────────────────────────────────────────────────────────
  const handleDateChange = (_event: any, date?: Date) => {
    setDateModalVisible(false);
    if (!date) return;
    const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    setSelectedDate(formatted);
  };

  // ─── Time picker ────────────────────────────────────────────────────────────
  const handleTimeChange = (_event: any, time?: Date) => {
    setTimeModalVisible(false);
    if (!time) return;

    const formatTime = moment(time).format("hh:mm A");
    const open = details?.data?.opening_time as string;
    const close = details?.data?.closing_time as string;

    const opening = parseTime(open);
    const closing = parseTime(close);
    const selected = moment(formatTime, "hh:mm A");

    // handle overnight ranges (e.g. 08:30 AM → 08:30 PM next day)
    if (closing.isBefore(opening)) closing.add(1, "day");

    const adjustedSelected = selected.clone();
    if (selected.isBefore(opening)) adjustedSelected.add(1, "day");

    const withinHours =
      !adjustedSelected.isBefore(opening) && !adjustedSelected.isAfter(closing);

    setSelectedTime(formatTime);
    setIsTimeValid(withinHours);

    if (!withinHours) {
      showToast(`Please select a time between ${open} and ${close}`);
    }
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────
  const handleCheckAvailability = async () => {
    if (!selectedRoomID) return showToast("Please select a room");
    if (!selectedDate) return showToast("Please select a date");
    if (selectedDuration === "Select Duration")
      return showToast("Please select a duration");
    if (!selectedTime) return showToast("Please select a time");
    if (!isTimeValid)
      return showToast("Selected time is outside operating hours");

    const res = await triggerCheckAvailability({
      room_id: selectedRoomID,
      date: formatDateForAPI(selectedDate),
      starting_time: selectedTime,
      duration: getDurationNumber(selectedDuration),
    });

    if (res.data) {
      router.push({
        pathname: "/details/SeatPosition/[allData]",
        params: {
          allData: JSON.stringify({
            availabilityData: res.data,
            roomId: selectedRoomID,
            date: formatDateForAPI(selectedDate), // এটা add করো
            starting_time: selectedTime, // এটা add করো
            duration: getDurationNumber(selectedDuration), // এটা add করো
          }),
          type,
          id,
          booking_id,
          selectedRoomName: selectedRoom,
        },
      });
    }
  };

  // ─── Loading / empty guards ─────────────────────────────────────────────────
  if (isLoading || !details?.data) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base`}>
        <ActivityIndicator size="large" color="#0c8ce9" />
        <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
          Loading...
        </Text>
      </View>
    );
  }

  const {
    rooms,
    rating,
    opening_time,
    is_favorite,
    gaming_zone_name,
    gaming_zone,
    closing_time,
    address,
  } = details.data;

  // ─── Render ──────────────────────────────────────────────────────────────────
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
        <View style={tw`flex-row justify-between items-center mt-8 mb-6`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`flex-row items-center`}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
            <Text style={tw`text-primary text-lg ml-1`}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${details?.data?.phone}`)}
          >
            <SvgXml xml={IconContact} />
          </TouchableOpacity>
        </View>

        {/* ── Zone info card ── */}
        <BlurView
          style={tw`p-4 rounded-3xl overflow-hidden gap-4`}
          intensity={10}
          tint="light"
        >
          <View style={tw`mb-6`}>
            <Image
              source={gaming_zone}
              style={tw`w-full h-48 rounded-xl`}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={tw`absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full`}
              onPress={() => add_to_favorite_zone({ zone_id: id })}
            >
              {isAddLoading ? (
                <View style={tw`w-6 h-6 items-center justify-center`}>
                  <ActivityIndicator size="small" color="white" />
                </View>
              ) : is_favorite ? (
                <MaterialIcons name="favorite" size={24} color="red" />
              ) : (
                <Ionicons name="heart-outline" size={25} color="white" />
              )}
            </TouchableOpacity>
          </View>

          <View style={tw`mb-6`}>
            <Text style={tw`text-primary text-2xl font-poppinsBold mb-4`}>
              {gaming_zone_name}
            </Text>

            <View style={tw`flex-row items-center justify-between mb-2`}>
              <View style={tw`flex-row items-center gap-1`}>
                <SvgXml xml={IconLocationDetails} />
                <Text style={tw`text-gray-400 font-poppins ml-1`}>
                  {address}
                </Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <SvgXml xml={IconStar} />
                <Text style={tw`text-primary ml-1 font-poppins`}>{rating}</Text>
              </View>
            </View>

            <View style={tw`flex-row items-center gap-1`}>
              <SvgXml xml={IconTime} />
              <Text style={tw`text-gray-400 ml-1 font-poppins`}>
                Operating Hours
              </Text>
              <Text style={tw`text-primary ml-auto font-poppins`}>
                {opening_time} - {closing_time}
              </Text>
            </View>
          </View>
        </BlurView>

        {/* ── Select Room ── */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-lg font-poppinsBold my-3`}>
            Select Room
          </Text>
          <TouchableOpacity
            onPress={() => setShowRoomDropdown(!showRoomDropdown)}
            style={tw`bg-white/10 mt-2 rounded-full p-4 flex-row justify-between items-center border border-gray-700`}
          >
            <Text style={tw`text-gray-400 text-base font-poppins`}>
              {rooms.length === 0
                ? "No room available"
                : selectedRoom || "Select a room"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {showRoomDropdown && (
            <View style={tw`bg-white/10 mt-2 rounded-lg`}>
              <ScrollView
                style={tw`max-h-60`}
                nestedScrollEnabled
                showsVerticalScrollIndicator
              >
                {rooms.map((room: Room, index: number) => (
                  <TouchableOpacity
                    key={room.id}
                    onPress={() => {
                      setSelectedRoom(room.name);
                      setSelectedRoomID(room.id);
                      setShowRoomDropdown(false);
                    }}
                    style={tw`p-4 ${index !== rooms.length - 1 ? "border-b border-gray-700" : ""}`}
                  >
                    <Text style={tw`text-white text-base font-poppins`}>
                      {room.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* ── Date ── */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-primary text-lg font-poppinsSemiBold mb-3`}>
            Date
          </Text>
          <TouchableOpacity
            style={tw`bg-white/10 p-4 rounded-full flex-row justify-between items-center`}
            onPress={() => setDateModalVisible(true)}
            disabled={isCheckingAvailability}
          >
            <Text style={tw`text-gray-400`}>
              {selectedDate || "DD/MM/YYYY"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* ── Starting Time ── */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-primary text-lg font-poppinsSemiBold mb-3`}>
            Starting time
          </Text>
          <TouchableOpacity
            style={tw`bg-white/10 p-4 rounded-full flex-row justify-between items-center border ${
              !isTimeValid ? "border-red-500" : "border-transparent"
            }`}
            onPress={() => setTimeModalVisible(true)}
            disabled={isCheckingAvailability}
          >
            <Text
              style={tw`${!isTimeValid ? "text-red-400" : "text-gray-400"}`}
            >
              {selectedTime || "Select time"}
            </Text>
            <Ionicons
              name="time-outline"
              size={20}
              color={!isTimeValid ? "#EF4444" : "#9CA3AF"}
            />
          </TouchableOpacity>
          {!isTimeValid && (
            <Text style={tw`text-red-400 text-xs mt-1 ml-2`}>
              Must be within {opening_time} – {closing_time}
            </Text>
          )}
        </View>

        {/* ── Duration ── */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-primary text-lg font-semibold mb-3`}>
            Duration
          </Text>
          <TouchableOpacity
            style={tw`bg-white/10 p-4 rounded-full flex-row justify-between items-center`}
            onPress={() => setShowDurationDropdown(!showDurationDropdown)}
            disabled={isCheckingAvailability}
          >
            <Text style={tw`text-gray-400`}>{selectedDuration}</Text>
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {showDurationDropdown && (
            <View style={tw`bg-white/10 mt-2 rounded-lg`}>
              <ScrollView
                style={tw`max-h-60`}
                nestedScrollEnabled
                showsVerticalScrollIndicator
              >
                {DURATIONS.map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={tw`p-3 border-b border-gray-700`}
                    onPress={() => {
                      setSelectedDuration(d);
                      setShowDurationDropdown(false);
                    }}
                  >
                    <Text style={tw`text-white`}>{d}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* ── Submit ── */}
        <TouchableOpacity
          style={tw`relative mb-4`}
          onPress={handleCheckAvailability}
          disabled={isCheckingAvailability}
        >
          <CustomButton
            title={
              isCheckingAvailability
                ? "Checking Availability..."
                : "Check Availability"
            }
          />
        </TouchableOpacity>
      </ScrollView>

      {/* ── Date Picker ── */}
      {dateModalVisible && (
        <DateTimePicker
          value={new Date()}
          themeVariant="dark"
          minimumDate={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* ── Time Picker ── */}
      {timeModalVisible && (
        <DateTimePicker
          themeVariant="dark"
          value={new Date()}
          mode="time"
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default RoomDetails;
