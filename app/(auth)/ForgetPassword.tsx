import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import { IcoBack, IconEmail } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useForgotPasswordMutation } from "@/redux/apiSlices/authApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";
import { useTailwind } from "tailwind-rn";
import * as Yup from "yup";
const ForgetPassword = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const tailwind = useTailwind();
  const [forgotPassword] = useForgotPasswordMutation();
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
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              const data = {
                email: values.email,
              };
              try {
                const res = await forgotPassword(data).unwrap();
                if (res.status) {
                  setTimeout(() => {
                    router.push(
                      `/(auth)/VerifyOTP?email=${values?.email}&flow=forget`
                    );
                  }, 1000);
                } else {
                  router.push({
                    pathname: "/Toaster",
                    params: { res: res?.message?.email?.[0] },
                  });
                }
              } catch (error: any) {
                router.push({
                  pathname: "/Toaster",
                  params: { res: error?.message },
                });
              }
            }}
            validationSchema={Yup.object({
              email: Yup.string().email().required("email is required"),
            })}
          >
            {({ values, setFieldValue, handleSubmit, errors }) => {
              return (
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
                        Forget Password
                      </Text>
                      <Text
                        style={tw` mx-auto text-secondary font-poppins text-sm py-1`}
                      >
                        Provide email address which you used to create account
                      </Text>
                    </View>
                    <View style={tw`  rounded-t-[40px]`}>
                      {/* login from */}
                      <View>
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2 `}
                        >
                          Email
                        </Text>
                        <View style={tw` rounded-full  `}>
                          <View
                            style={tw`bg-white/10 w-full rounded-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconEmail} />
                            <TextInput
                              style={tw`   text-secondary flex-1 rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Enter your email..."
                              placeholderTextColor="#888888"
                              value={values.email}
                              onChangeText={(txt) =>
                                setFieldValue("email", txt)
                              }
                            />
                          </View>
                        </View>
                        {errors.email && (
                          <Text
                            style={tw`text-center text-red-700 font-poppins`}
                          >
                            {errors.email}
                          </Text>
                        )}
                      </View>

                      <TouchableOpacity
                        style={tw`relative mb-4 mt-9`}
                        onPress={() => {
                          handleSubmit();
                        }}
                      >
                        <CustomButton title={"Get Code"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View></View>
                </View>
              );
            }}
          </Formik>
        </AlertNotificationRoot>
      </ScrollView>
      <View></View>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;
