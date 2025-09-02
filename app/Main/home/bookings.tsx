import { ImgGradint } from "@/assets/images/image";
import Canceled from "@/components/Booking/Canceled";
import Completed from "@/components/Booking/Completed";
import Upcoming from "@/components/Booking/Upcoming";

import tw from "@/lib/tailwind";
import { _HIGHT, _Width } from "@/utils/utils";
import MaskedView from "@react-native-masked-view/masked-view";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

const tabs = ["Upcoming", "Completed", "Canceled"];

const Bookings = () => {
  const [currentPage, setCurrentPage] = useState("Upcoming");
  const underlineX = useRef(new Animated.Value(0)).current;
  const tabWidth = _Width / tabs.length ;

  useEffect(() => {
    const index = tabs.indexOf(currentPage);
    Animated.spring(underlineX, {
      toValue: index * tabWidth,
      useNativeDriver: false,
    }).start();
  }, [currentPage]);

  const ActivePage = () => {
    switch (currentPage) {
      case "Upcoming":
        return <Upcoming />;
      case "Completed":
        return <Completed />;
      case "Canceled":
        return <Canceled />;
      default:
        return <Upcoming />;
    }
  };

  return (
    <View style={tw`flex-1`}>
      {/* Background */}
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

      {/* Header */}
      <View style={tw`px-4 pt-12`}>
        <Text style={tw`text-white text-2xl font-poppinsBold`}>Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={tw`mt-6`}>
        <View style={tw`flex-row justify-around`}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} onPress={() => setCurrentPage(tab)}>
              {currentPage === tab ? (
                <MaskedView
                  maskElement={
                    <Text
                      style={[
                        tw`text-base font-poppinsBold`,
                        { backgroundColor: "transparent" },
                      ]}
                    >
                      {tab}
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
                      {tab}
                    </Text>
                  </LinearGradient>
                </MaskedView>
              ) : (
                <Text
                  style={[
                    tw`text-base font-poppinsBold`,
                    { color: "#ccc", fontWeight: "400" },
                  ]}
                >
                  {tab}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Animated Underline */}
        <Animated.View
          style={{
            width: tabWidth,
            transform: [{ translateX: underlineX }],
            marginTop: 4,
          }}
        >
          <LinearGradient
            colors={["#6523E7", "#023CE3", "#6523E7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={tw`h-0.5 rounded w-24 mx-auto`}
          />
        </Animated.View>
      </View>

      {/* Active Page */}
      <View style={tw`flex-1 mt-4 px-4`}>{ActivePage()}</View>
    </View>
  );
};

export default Bookings;
