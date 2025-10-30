import { ImgGradint } from "@/assets/images/image";
import { BackIcon, DocumentIcon } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useTermsConPrivacyPolQuery } from "@/redux/apiSlices/DowerAllApi/authTermsConPrivacyPol";

import { _HIGHT, _Width } from "@/utils/utils";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RenderHtml from "react-native-render-html";
import { SvgXml } from "react-native-svg";

const TermsConditions = () => {
  const {
    data: termsData,
    error,
    isLoading,
  } = useTermsConPrivacyPolQuery(encodeURIComponent("Terms & Conditions"));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    <View style={tw`flex-1 justify-center items-center `}>
      <ActivityIndicator size="large" color="#0c8ce9" />
      <Text style={tw`mt-4 text-lg font-poppinsLight text-gray-700`}>
        Loading...
      </Text>
    </View>;
  }
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

      {/* Header */}
      <View style={tw`pt-12 px-6 pb-6`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`flex-row items-center mb-6`}
        >
          <SvgXml xml={BackIcon} width={24} height={24} />
          <Text style={tw`text-white text-lg ml-2 font-poppins`}>Back</Text>
        </TouchableOpacity>

        <View style={tw`flex-row items-center mb-2`}>
          <SvgXml xml={DocumentIcon} width={24} height={24} />
          <Text style={tw`text-white text-2xl font-poppinsBold ml-3`}>
            {termsData?.data[0]?.type}
          </Text>
        </View>

        <Text style={tw`text-gray-400 text-sm font-poppins mb-4`}>
          Updated{" "}
          {termsData?.data[0]?.updated_at
            ? formatDate(termsData?.data[0]?.updated_at)
            : "Loading..."}
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={tw`flex-1 px-6`} showsVerticalScrollIndicator={false}>
        <RenderHtml
          contentWidth={_Width}
          source={{ html: termsData?.data[0]?.text }}
          tagsStyles={{
            body: {
              color: "white",
              fontFamily: "Poppins-Regular",
            },
            p: {
              color: "#D1D5DB",
              fontSize: 16,
              lineHeight: 24,
              fontFamily: "Poppins-Regular",
            },
            h2: {
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "Poppins-Bold",
            },
            div: {
              color: "white",
            },
          }}
          baseStyle={{
            color: "white",
            backgroundColor: "transparent",
          }}
        />
        <View style={tw`h-20`} />
      </ScrollView>
    </View>
  );
};

export default TermsConditions;
