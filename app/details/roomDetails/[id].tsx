"use client";

import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import { IconContact, IconLoction, IconStar, IconTime } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import {
  useAdd_to_favorite_zoneMutation,
  useGame_zone_detailsQuery,
} from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import { ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const roomDetails = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  const { data: details, isLoading } = useGame_zone_detailsQuery({ id });
  const [add_to_favorite_zone] = useAdd_to_favorite_zoneMutation();

  const [selectedRoom, setSelectedRoom] = useState("VIP");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("00:00");
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("Select Duration");
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showRoomDropdown, setShowRoomDropdown] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const roomOptions = ["VIP", "NON VIP", "Semi VIP", "PS5", "Common"];
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

  // handle date change
  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      const formatted = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      setSelectedDate(formatted);
    }
    setDateModalVisible(false);
  };
  // handle time change
  const handleTimeChange = (event: any, time?: Date) => {
    if (time) {
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      setSelectedTime(`${hours}:${minutes}`);
    }
    setTimeModalVisible(false);
  };
  if (isLoading) {
    <View style={tw`flex-1 justify-center items-center bg-white`}>
      <ActivityIndicator size="large" color="#0c8ce9" />
      <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
        Loading...
      </Text>
    </View>;
  }
  if (!details?.data) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text>No data available</Text>
      </View>
    );
  }
  const {
    rooms,
    rating,
    phone,
    opening_time,
    is_favorite,
    gaming_zone_name,
    gaming_zone,
    closing_time,
    address,
  } = details?.data;

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
            <Text style={tw`text-primary text-lg ml-1`}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`flex-row items-center`}>
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
              source={gaming_zone}
              style={tw`w-full h-48 rounded-xl`}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={tw`absolute top-4 right-0 bg-black bg-opacity-50 p-2 rounded-full`}
              onPress={async () => await add_to_favorite_zone({ zone_id: id })}
            >
              {is_favorite ? (
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

            <View style={tw`flex-row items-center mb-2`}>
              <SvgXml xml={IconLoction} />
              <Text style={tw`text-gray-400 font-poppins ml-1`}>{address}</Text>
              <View style={tw`flex-row items-center ml-auto`}>
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
          >
            <Text style={tw`text-gray-400 text-base font-poppins`}>
              {selectedRoom}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Room Dropdown */}
          {showRoomDropdown && (
            <View
              style={tw`bg-gray-900/95 rounded-2xl mt-2 border border-gray-700 overflow-hidden`}
            >
              {roomOptions.map((room, index) => (
                <TouchableOpacity
                  key={room}
                  onPress={() => {
                    setSelectedRoom(room);
                    setShowRoomDropdown(false);
                  }}
                  style={tw`p-4 ${
                    index !== roomOptions.length - 1
                      ? "border-b border-gray-700"
                      : ""
                  }`}
                >
                  <Text style={tw`text-white text-base font-poppins`}>
                    {room}
                  </Text>
                </TouchableOpacity>
              ))}
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
          style={tw` relative mb-4`}
          onPress={() => {
            router.push("/(allPages)/seatPosotion");
          }}
        >
          <CustomButton title={"Check Availability"} />
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker Modal */}
      {dateModalVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {/* Time Picker Modal */}
      {timeModalVisible && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

export default roomDetails;
