import { ImgGradint } from "@/assets/images/image";
import { IcoBack, IconButton, IconSendText } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useVerifyOtpMutation } from "@/redux/apiSlices/authApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { OtpInput } from "react-native-otp-entry";
import { SvgXml } from "react-native-svg";
import { useTailwind } from "tailwind-rn";

const VerifyOTP = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const tailwind = useTailwind();
  const { email, flow } = useLocalSearchParams();

  const [verifyOtp] = useVerifyOtpMutation();
  const handleOtpVerification = async (otp: string) => {
    try {
      const data = { email: email as string, otp };
      const res = await verifyOtp(data).unwrap();

      if (res) {
        router.push({
          pathname: "/Toaster",
          params: { res: res.message },
        });

        setTimeout(() => {
          if (flow === "register") {
            router.replace("/Main/Homes/Home");
          } else if (flow === "forget") {
            router.replace(`/(auth)/Createnewpassword?email=${email}`);
          }
        }, 1000);
      } else {
        router.push({
          pathname: "/Toaster",
          params: { res: res.message || "Something went wrong" },
        });
      }
    } catch (error: any) {
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message || "An error occurred" },
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "#000" }}
    >
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

          // backgroundColor: colors.primary
        }}
      />
      <ScrollView contentContainerStyle={tw` px-5 `}>
        <TouchableOpacity style={tw`pt-6`} onPress={() => router.back()}>
          <SvgXml xml={IcoBack} />
        </TouchableOpacity>
        <AlertNotificationRoot>
          <View
            style={[
              tw`flex-col items-center justify-between`,
              {
                height: _HIGHT,
              },
            ]}
          >
            <View></View>
            <View>
              <View style={tw` pb-14 `}>
                <Text
                  style={tw`font-poppinsBlack mx-auto text-3xl text-primary`}
                >
                  Verify Email
                </Text>
                <Text
                  style={tw` mx-auto text-secondary font-poppins text-sm py-1`}
                >
                  We’ve sent 6 digits code on your email
                </Text>
              </View>
              <View style={tw`  rounded-t-[40px]`}>
                {/* login from */}
                <View>
                  <Text
                    style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2 `}
                  >
                    Verify OTP
                  </Text>
                  {/* login from */}
                  <View>
                    <View style={tw`py-3  mb-2`}>
                      <OtpInput
                        numberOfDigits={6}
                        onTextChange={async (text: any) => {}}
                        onFilled={handleOtpVerification}
                        // onBlur={handleBlur("otp")}
                        theme={{
                          pinCodeContainerStyle: {
                            width: 55,
                            height: 70,
                            margin: 4,
                            backgroundColor: "#151416",
                            borderColor: "#151416",
                          },
                          pinCodeTextStyle: {
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#fff",
                          },
                        }}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={tw`flex-row justify-end`}>
                  <SvgXml xml={IconSendText} />
                </TouchableOpacity>
                <TouchableOpacity style={tw` relative mt-16`}>
                  <SvgXml xml={IconButton} />
                  <Text
                    style={tw`text-primary absolute flex w-full   text-center  text-lg py-[14px] font-poppinsBold`}
                  >
                    Verify
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View></View>
          </View>
        </AlertNotificationRoot>
      </ScrollView>
      <View></View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;
