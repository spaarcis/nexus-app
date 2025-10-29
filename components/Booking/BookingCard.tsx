import { IconCleander, Iconhoure, IconLoction, IconTime } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const BookingCard = ({ data }: any) => {
  console.log(data?.status);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/details/BookingsDetails/[id]",
          params: {
            id: data?.id,
            status: data?.status,
          },
        })
      }
      style={tw`mb-4`}
    >
      <BlurView
        style={tw` p-5 border  rounded-3xl overflow-hidden flex-row items-center gap-4`}
        intensity={10}
        tint="light"
      >
        <Image
          source={{ uri: data?.provider?.gaming_zone }}
          style={[tw`h-20 w-20 rounded-2xl`, {}]}
        />
        <View style={tw`flex-1 items-start  justify-center`}>
          <Text style={tw`text-white font-bold `}>
            {data?.provider?.gaming_zone_name}
          </Text>

          {/* Date and Time */}
          <View style={tw`flex-row items-center mt-2 gap-1`}>
            <SvgXml xml={IconCleander} />
            <Text style={tw`text-white text-xs font-poppins ml-1`}>
              {data?.booking_date}
            </Text>
            <SvgXml xml={IconTime} />
            <Text style={tw`text-white text-xs font-poppins ml-1`}>
              {" "}
              {data?.starting_time}
            </Text>
          </View>

          {/* Duration and Location */}
          <View style={tw`flex-row items-center mt-2 gap-1`}>
            <SvgXml xml={Iconhoure} />
            <Text style={tw`text-white ml-2 text-xs font-poppins`}>
              {" "}
              {data?.duration} - Hour
            </Text>
            <SvgXml xml={IconLoction} />
            <Text style={tw`text-white text-xs font-poppins ml-1`}>
              {data?.provider?.address?.split(" ")?.slice(0, 2)?.join(" ") +
                " ..."}
            </Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

export default BookingCard;
