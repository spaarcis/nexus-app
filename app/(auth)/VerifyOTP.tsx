import { IcoBack, IconSendText } from "@/Icons/Icons";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
} from "@/redux/apiSlices/authApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import { router, useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import tw from "@/lib/tailwind";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { OtpInput } from "react-native-otp-entry";
import { SvgXml } from "react-native-svg";

const VerifyOTP = () => {
  const { email, flow } = useLocalSearchParams();
  const [otp, setOtp] = React.useState<string>("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [forgetPassword, { isLoading: isLoading2 }] =
    useForgotPasswordMutation();
  const handleOtpVerification = async (otp: string) => {
    try {
      const data = { email: email as string, otp };
      const res = await verifyOtp(data).unwrap();
      if (res) {
        router.push({
          pathname: "/Toaster",
          params: { res: res.message },
        });

        AsyncStorage.setItem("token", res?.data?.access_token);

        setTimeout(() => {
          if (flow === "register") {
            router.replace("/");
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

  const handleSendOtp = async () => {
    try {
      const data = { email: email as string };
      const res = await forgetPassword(data).unwrap();
      router.push({
        pathname: "/Toaster",
        params: { res: res.message },
      });
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
              tw`flex-col items-center justify-center`,
              {
                height: _HIGHT * 0.8,
              },
            ]}
          >
            <View></View>
            <View>
              <View style={tw``}>
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
                        onTextChange={async (text: any) => {
                          setOtp(text);
                        }}
                        onFilled={handleOtpVerification}
                        // onBlur={handleBlur("otp")}
                        theme={{
                          pinCodeContainerStyle: {
                            width: 50,
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
                <TouchableOpacity
                  onPress={handleSendOtp}
                  style={tw`flex-row justify-end mb-3`}
                >
                  <Text>
                    <SvgXml xml={IconSendText} />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleOtpVerification(otp);
                  }}
                  style={tw` mb-4`}
                >
                  <CustomButton
                    title={isLoading ? "Verifying..." : " Verify"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AlertNotificationRoot>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;
