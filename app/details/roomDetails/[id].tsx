import {
  IconContact,
  IconLocationDetails,
  IconLoction,
  IconStar,
  IconTime,
} from "@/Icons/Icons";
import {
  useAdd_to_favorite_zoneMutation,
  useGame_zone_detailsQuery,
} from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import tw from "@/lib/tailwind";
import { useLazyCheck_availabilityQuery } from "@/redux/apiSlices/exploreApi/exploreApiSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import moment from "moment";
import { useState } from "react";
import { SvgXml } from "react-native-svg";

// Define TypeScript interfaces
interface Room {
  id: string;
  name: string;
}

interface PCAvailability {
  pc_no: number;
  is_book: boolean;
  booking_id: number | null;
}

interface CheckAvailabilityResponse {
  status: string;
  status_code: number;
  message: string;
  data: PCAvailability[];
}

const RoomDetails = () => {
  const { id, type, provider_id } = useLocalSearchParams();
  console.log(id, type, provider_id, "is ans");
  const { data: details, isLoading } = useGame_zone_detailsQuery({ id });
  const [add_to_favorite_zone, { isLoading: isAddLoading }] =
    useAdd_to_favorite_zoneMutation();
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("00:00");
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [timeModalVisible, setTimeModalVisible] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] =
    useState<string>("Select Duration");
  const [showDurationDropdown, setShowDurationDropdown] =
    useState<boolean>(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState<boolean>(false);
  const [selectedRoomID, setSelectedRoomID] = useState<string | null>(null);

  const durations = [
    "1 hour",
    "2 hour",
    "3 hour",
    "4 hour",
    "5 hour",
    "6 hour",
    "7 hour",
    "8 hour",
  ];

  // Format date to YYYY-MM-DD format as required by API
  const formatDateForAPI = (dateString: string): string => {
    if (!dateString) return "";
    const parts = dateString.split("/");
    if (parts.length !== 3) return "";
    return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(
      2,
      "0"
    )}`;
  };

  // Extract duration number from string (e.g., "2 hour" → 2)
  const getDurationNumber = (durationString: string): number => {
    if (!durationString || durationString === "Select Duration") return 0;
    return parseInt(durationString, 10);
  };

  // Call the API with all required parameters - moved to top level
  const [
    triggerCheckAvailability,
    { data: Check_availability, isFetching: isCheckingAvailability },
  ] = useLazyCheck_availabilityQuery();

  const logAllSelectionsAsync = async () => {
    if (!selectedRoomID) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please select a room" },
      });
      return;
    }

    if (!selectedDate) {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please select a date" },
      });
      return;
    }

    if (selectedDuration === "Select Duration") {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please select a duration" },
      });
      return;
    }
    if (selectedTime === "Select time") {
      router.push({
        pathname: "/Toaster",
        params: { res: "Please select a time" },
      });
      return;
    }

    // Lazy query trigger করা হচ্ছে
    const res = await triggerCheckAvailability({
      room_id: selectedRoomID,
      date: formatDateForAPI(selectedDate),
      starting_time: selectedTime,
      duration: getDurationNumber(selectedDuration),
    });

    if (res.data) {
      const dataToPass = JSON.stringify({
        availabilityData: res.data,
        roomId: selectedRoomID,
      });

      // console.log("Send to Seat screen", JSON.parse(dataToPass));
      router.push({
        pathname: "/details/SeatPosition/[allData]",
        params: {
          allData: dataToPass,
          type,
          id,
          selectedRoomName: selectedRoom,
        },
      });
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      const formatted = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      setSelectedDate(formatted);
    }
    setDateModalVisible(false);
  };

  const handleTimeChange = (event: any, time?: Date) => {
    if (time) {
      const formatTime = moment(time).format("hh:mm A");

      setSelectedTime(formatTime);

      const open = details?.data?.opening_time;
      const close = details?.data?.closing_time;

      const selected = moment(formatTime, "hh:mm A");
      const opening = moment(open, "hh:mm A");
      const closing = moment(close, "hh:mm A");

      if (selected.isBefore(opening) || selected.isAfter(closing)) {
        router.push({
          pathname: "/Toaster",
          params: { res: `Please select a time between ${open} and ${close}` },
        });
        return;
      }

      console.log("✅ Valid time:", formatTime);
    }

    setTimeModalVisible(false);
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base`}>
        <ActivityIndicator size="large" color="#0c8ce9" />
        <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
          Loading...
        </Text>
      </View>
    );
  }

  if (!details?.data) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-base`}>
        <ActivityIndicator size="large" color="#0c8ce9" />
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
            style={tw`flex-row items-center`}
          >
            <SvgXml xml={IconContact} />
          </TouchableOpacity>
        </View>

        <BlurView
          style={tw`p-4 rounded-3xl overflow-hidden gap-4`}
          intensity={10}
          tint="light"
        >
          {/* Gaming Room Image */}
          <View style={tw`mb-6`}>
            <Image
              source={{ uri: gaming_zone }}
              style={tw`w-full h-48 rounded-xl`}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={tw`absolute top-4 right-0 bg-black bg-opacity-50 p-2 rounded-full`}
              onPress={async () => await add_to_favorite_zone({ zone_id: id })}
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

          {/* Room Info */}
          <View style={tw`mb-6`}>
            <Text style={tw`text-primary text-2xl font-poppinsBold mb-4`}>
              {gaming_zone_name}
            </Text>

            <View style={tw`flex-row items-center justify-between mb-2`}>
              <View style={tw`flex-row items-center gap-1 `}>
                <SvgXml xml={IconLocationDetails} />
                <Text style={tw`text-gray-400 font-poppins ml-1 `}>
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

        {/* Select Room */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-white text-lg font-poppinsBold my-3`}>
            Select Room
          </Text>
          <TouchableOpacity
            onPress={() => setShowRoomDropdown(!showRoomDropdown)}
            style={tw`bg-white/10 mt-2 rounded-full p-4 flex-row justify-between items-center border border-gray-700`}
            // disabled={isCheckingAvailability}
          >
            <Text style={tw`text-gray-400 text-base font-poppins`}>
              {selectedRoom || "Select a room"}
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
                {rooms.map((roomItem: Room, index: number) => (
                  <TouchableOpacity
                    key={roomItem.id}
                    onPress={() => {
                      setSelectedRoom(roomItem.name);
                      setSelectedRoomID(roomItem.id as any);
                      setShowRoomDropdown(false);
                    }}
                    style={tw`p-4 ${
                      index !== rooms.length - 1
                        ? "border-b border-gray-700"
                        : ""
                    }`}
                  >
                    <Text style={tw`text-white text-base font-poppins`}>
                      {roomItem.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Date Selection */}
        <View style={tw`mb-4 `}>
          <Text style={tw`text-primary text-lg font-poppinsSemiBold mb-3`}>
            Date
          </Text>
          <TouchableOpacity
            style={tw`bg-white/10 p-4 rounded-full flex-row justify-between items-center`}
            onPress={() => setDateModalVisible(true)}
            disabled={isCheckingAvailability}
          >
            <Text style={tw`text-gray-400`}>
              {selectedDate ? selectedDate : "DD/MM/YYYY"}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Starting Time */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-primary text-lg font-poppinsSemiBold mb-3`}>
            Starting time
          </Text>
          <TouchableOpacity
            style={tw`bg-gray-800 bg-white/10 p-4 rounded-full flex-row justify-between items-center`}
            onPress={() => setTimeModalVisible(true)}
            disabled={isCheckingAvailability}
          >
            <Text style={tw`text-gray-400`}>
              {selectedTime ? selectedTime : "00:00"}
            </Text>
            <Ionicons name="time-outline" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Duration */}
        <View style={tw`mb-8 `}>
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

          {/* Dropdown */}
          {showDurationDropdown && (
            <View style={tw`bg-white/10  mt-2 rounded-lg`}>
              <ScrollView
                style={tw`max-h-60`}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={true}
              >
                {durations.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={tw`p-3 border-b border-gray-700`}
                    onPress={() => {
                      setSelectedDuration(duration);
                      setShowDurationDropdown(false);
                    }}
                  >
                    <Text style={tw`text-white`}>{duration}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={tw`relative mb-4`}
          onPress={logAllSelectionsAsync}
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

      {/* Date Picker Modal */}
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
      {/* Time Picker Modal */}
      {timeModalVisible && (
        <DateTimePicker
          themeVariant="dark"
          value={new Date()}
          mode="time"
          // is24Hour={true}
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default RoomDetails;
