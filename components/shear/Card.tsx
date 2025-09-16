import { IconLoction, IconStar } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { _HIGHT } from "@/utils/utils";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

export const Card = ({ item }: any) => {
  if (!item) return null;
  const { rating, id, gaming_zone_name, gaming_zone, address } = item;

  return (
    <TouchableOpacity
      style={tw`mb-6`}
      onPress={() =>
        router.push({
          pathname: "/details/RoomDetails/[id]",
          params: { id: id },
        })
      }
    >
      <View style={tw`relative `}>
        {/* Background Image */}
        <Image
          source={gaming_zone}
          style={[
            tw`rounded-2xl`,
            {
              width: "100%",
              height: _HIGHT * 0.19,
            },
          ]}
        />
        <View style={tw` gap-2 absolute right-3 top-3`}>
          <BlurView
            style={tw` flex-row items-center justify-end p-2 rounded-lg ${
              Platform.OS === "android" ? "bg-black/50" : ""
            }`}
            intensity={20}
            tint="dark"
          >
            <SvgXml xml={IconStar} />
            <Text style={tw`text-primary font-poppinsMedium text-base`}>
              {rating}
            </Text>
          </BlurView>
        </View>

        <View style={tw`w-full absolute bottom-3`}>
          <BlurView
            style={tw`w-[95%] mx-auto  rounded-lg h-16  px-3 ${
              Platform.OS === "android" ? "bg-black/50" : ""
            }`}
            intensity={20}
            tint="dark"
          >
            <View style={tw`flex-col justify-center top-2`}>
              <Text style={tw`text-primary text-base font-poppinsBold`}>
                {gaming_zone_name}
              </Text>
              <View style={tw`flex-row gap-2 mt-1 items-center`}>
                <SvgXml xml={IconLoction} />
                <Text style={tw`text-primary font-poppins`}>{address}</Text>
              </View>
            </View>
          </BlurView>
        </View>
      </View>
    </TouchableOpacity>
  );
};
