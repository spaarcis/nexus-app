import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import { IcoBack, IconPoword } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useResetPasswordMutation } from "@/redux/apiSlices/authApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import Entypo from "@expo/vector-icons/Entypo";
import { router, useLocalSearchParams } from "expo-router";
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
const Createnewpassword = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showNewRePassword, setShowNewRePassword] = React.useState(false);
  //-----------get email----------
  const { email } = useLocalSearchParams();
  const tailwind = useTailwind();
  const [resetPassword] = useResetPasswordMutation();
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
        }}
      />

      <ScrollView contentContainerStyle={tw` px-5`}>
        <TouchableOpacity style={tw`pt-6`} onPress={() => router.back()}>
          <SvgXml xml={IcoBack} />
        </TouchableOpacity>
        <AlertNotificationRoot>
          <Formik
            initialValues={{ password: "", retype_password: "" }}
            onSubmit={async (values) => {
              const data = {
                email: email,
                password: values.password,
                retype_password: values.retype_password,
              };
              try {
                const res = await resetPassword(data).unwrap();
                if (res.status) {
                  router.push({
                    pathname: "/Toaster",
                    params: { res: res.message },
                  });
                  setTimeout(() => {
                    router.push("/(auth)/Login");
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
                  params: { res: error.message },
                });
              }
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(4, "Password is too sort ")
                .required("email is required")
                .uppercase("1 lowercase letter added"),
              retype_password: Yup.string().min(4, "Password is too sort "),
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
                  <View>
                    <View style={tw`mt-28 `}>
                      <Text
                        style={tw`font-poppinsBlack mx-auto text-2xl text-primary pb-2`}
                      >
                        Create New Password
                      </Text>
                      <Text
                        style={tw` mx-auto text-secondary font-poppins text-sm py-1`}
                      >
                        You have to create a new password after forget
                      </Text>
                    </View>
                    <View style={tw`  rounded-t-[40px]`}>
                      {/* login from */}
                      <View>
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}
                        >
                          New Password
                        </Text>
                        <View
                          style={tw` rounded-full relative overflow-hidden`}
                        >
                          <View
                            style={tw`bg-white/10 w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="********"
                              placeholderTextColor="#888888"
                              secureTextEntry={!showNewPassword}
                              value={values.password}
                              onChangeText={(txt) =>
                                setFieldValue("password", txt)
                              }
                            />
                            <Entypo
                              name={showNewPassword ? "eye" : "eye-with-line"}
                              style={tw`absolute right-12 top-5 `}
                              size={20}
                              color="#777"
                              onPress={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            />
                          </View>
                        </View>
                        {errors.password && (
                          <Text style={tw`p-2  text-red-700 font-poppins`}>
                            {errors.password}
                          </Text>
                        )}
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}
                        >
                          Retype Password
                        </Text>
                        <View
                          style={tw` rounded-full relative overflow-hidden`}
                        >
                          <View
                            style={tw`bg-white/10 w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="********"
                              placeholderTextColor="#888888"
                              secureTextEntry={!showNewRePassword}
                              value={values.retype_password}
                              onChangeText={(txt) =>
                                setFieldValue("retype_password", txt)
                              }
                            />
                            <Entypo
                              name={showNewRePassword ? "eye" : "eye-with-line"}
                              style={tw`absolute right-12 top-5 `}
                              size={20}
                              color="#777"
                              onPress={() =>
                                setShowNewRePassword(!showNewRePassword)
                              }
                            />
                          </View>
                        </View>
                      </View>
                      {errors.retype_password && (
                        <Text style={tw`p-2 text-red-700 font-poppins`}>
                          {errors.retype_password}
                        </Text>
                      )}
                      <TouchableOpacity
                        style={tw`mt-7 mb-4`}
                        onPress={() => {
                          handleSubmit();
                          router.push("/(auth)/Login");
                        }}
                      >
                        <CustomButton title={"Update"} />
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

export default Createnewpassword;
