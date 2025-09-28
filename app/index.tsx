import { ImgGradint, ImgLogo } from "@/assets/images/image";
import { IconLogo } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useLazyTokenCheckerQuery } from "@/redux/apiSlices/authApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, ImageBackground, View } from "react-native";
import { SvgXml } from "react-native-svg";

export default function Index() {
  const [tokenChecker] = useLazyTokenCheckerQuery();

  const handleUserNavigate = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await tokenChecker({});
      // console.log(res);
      if (res?.data?.metadata) {
        router.push("/Main/Homes/Home");
      } else {
        router.push("/(auth)/Login");
      }
    } else {
      router.push("/(auth)/Login");
    }
  };

  useEffect(() => {
    // const t = setTimeout(() => {
    //   // router.replace("/Main/Homes/Home");
    //   // router.replace("/(auth)/Login");
    //   // router.replace("/(allPages)/seatPosotion")
    //   // router.replace("/Main/home/home")
    // }, 2000);
    // return () => clearTimeout(t);

    handleUserNavigate();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Background Image */}
      <ImageBackground
        source={ImgGradint}
        style={{
          width: _Width,
          height: _HIGHT,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Foreground Content */}
      <View style={tw`flex-1 py-16 justify-between items-center`}>
        <View></View>
        <View style={tw`flex-row items-center gap-3`}>
          <Image
            source={ImgLogo}
            resizeMode="contain"
            style={{
              width: (_Width || 400) * 0.2,
              height: 76,
            }}
          />
          <SvgXml xml={IconLogo} />
        </View>
        <ActivityIndicator color="#cdd3ff" size="large" />
      </View>
    </View>
  );
}
