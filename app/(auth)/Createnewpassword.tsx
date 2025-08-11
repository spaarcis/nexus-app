import { ImgGradint, ImgLogo } from "@/assets/images/image";
import { IcoBack, IconButton, IconEmail, IconfacebookButton, IconForgetPass, IconGoogleButton, IconInputBox, IconLogo, IconPoword, IconRegisterText } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { _HIGHT, _Width } from "@/utils/utils";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { useTailwind } from 'tailwind-rn';
import { SvgXml } from "react-native-svg";
import * as Yup from "yup";
import { BlurView } from "expo-blur";
const Createnewpassword = () => {

  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showNewRePassword, setShowNewRePassword] = React.useState(false);
  const tailwind = useTailwind();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ backgroundColor: "#000" }}
    >

      {/* Background Image */}
      <ImageBackground
        source={ImgGradint}
        resizeMode="cover"
        style={{
          width: _Width,
          height: _HIGHT,
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#000000"

        }}
      />

      <ScrollView contentContainerStyle={tw` px-5`}>
        <TouchableOpacity style={tw`pt-6`} onPress={() => router.back()}>
          <SvgXml xml={IcoBack} />
        </TouchableOpacity>
        <AlertNotificationRoot>
          <Formik
            initialValues={{ password: "", rePassword: "" }}
            onSubmit={async (values) => {
              console.log(values);

              //   try {
              //     const res = await loginUser(values).unwrap();
              //     if (res.status) {
              //       AsyncStorage.setItem("token", res?.data?.access_token);
              //       Toast.show({
              //         type: ALERT_TYPE.SUCCESS,
              //         title: 'Success',
              //         textBody: res?.message,
              //         autoClose: 2000,
              //       });
              //       setTimeout(() => {
              //         router?.push(`/home/(tabs)/landingPage`);
              //       }, 1000);
              //     } else {
              //       Toast.show({
              //         type: ALERT_TYPE.DANGER,
              //         title: 'Waring',
              //         textBody: res?.message?.email?.[0] || "Something went wrong!",
              //         autoClose: 2000,
              //       });
              //     }

              //   } catch (error: any) {
              //     Toast.show({
              //       type: ALERT_TYPE.WARNING,
              //       title: 'Waring',
              //       textBody: error?.message,
              //     });
              //   }
            }}

            validationSchema={Yup.object({
              email: Yup.string().email().required("email is required"),
              password: Yup.string()
                // .min(6, "Password is too sort ")
                .required("email is required")
                .uppercase("1 lowercase letter added"),
            })}
          >
            {({ values, setFieldValue, handleSubmit, errors }) => {
              return (
                <View style={[tw`flex-col items-center justify-between`, {
                  height: _HIGHT,
                }]}>
                  <View></View>
                  <View>

                    <View
                      style={tw` pb-14 `}
                    >
                      <Text style={tw`font-poppinsBlack mx-auto text-3xl text-primary pb-2`}>
                        Create New Password
                      </Text>
                      <Text style={tw` mx-auto text-secondary font-poppins text-sm py-1`}>
                        You have to create a new password after forget
                      </Text>
                    </View>
                    <View style={tw`  rounded-t-[40px]`}>

                      {/* login from */}
                      <View>
                        <Text style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}>New Password</Text>
                        <View style={tw` rounded-2xl relative overflow-hidden`}>
                          <SvgXml xml={IconInputBox} />
                          <View style={tw`absolute w-full flex-row items-center justify-start px-4`}>
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="********"
                              placeholderTextColor="#888888"
                              secureTextEntry={!showNewPassword}
                              value={values.password}
                              onChangeText={(txt) => setFieldValue("password", txt)}
                            />
                            <Entypo
                              name={showNewPassword ? "eye" : "eye-with-line"}
                              style={tw`absolute right-12 top-5 `}
                              size={20}
                              color="#777"
                              onPress={() => setShowNewPassword(!showNewPassword)}
                            />
                          </View>
                        </View>
                        {errors.password && (
                          <Text style={tw`p-2  text-red-700 font-poppins`}>
                            {errors.password}
                          </Text>
                        )}
                        <Text style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}>Retype Password</Text>
                        <View style={tw` rounded-2xl relative overflow-hidden`}>
                          <SvgXml xml={IconInputBox} />
                          <View style={tw`absolute w-full flex-row items-center justify-start px-4`}>
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="********"
                              placeholderTextColor="#888888"
                              secureTextEntry={!showNewRePassword}
                              value={values.rePassword}
                              onChangeText={(txt) => setFieldValue("rePassword", txt)}
                            />
                            <Entypo
                              name={showNewRePassword ? "eye" : "eye-with-line"}
                              style={tw`absolute right-12 top-5 `}
                              size={20}
                              color="#777"
                              onPress={() => setShowNewRePassword(!showNewRePassword)}
                            />
                          </View>
                        </View>
                      </View>
                      {errors.rePassword && (
                        <Text style={tw`p-2 text-red-700 font-poppins`}>
                          {errors.rePassword}
                        </Text>
                      )}


                      <TouchableOpacity
                        style={tw` relative mt-14`}
                        onPress={() => {
                          handleSubmit();
                          router.push("/(auth)/Login")
                        }}
                      >
                        <SvgXml xml={IconButton} />
                        <Text
                          style={tw`text-primary absolute flex w-full   text-center  text-lg py-[14px] font-poppinsBold`}
                        >
                          Update
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View>
                  </View>
                </View>
              );
            }}
          </Formik>
        </AlertNotificationRoot>
      </ScrollView>
      <View></View>
    </KeyboardAvoidingView >
  );
};

export default Createnewpassword;