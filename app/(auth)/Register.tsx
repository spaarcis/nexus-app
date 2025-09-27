import { ImgGradint } from "@/assets/images/image";
import {
  IconButton,
  IconEmail,
  IconfacebookButton,
  IconGoogleButton,
  IconInputBox,
  IconPoword,
  IconProfile,
  IconRegisterText,
} from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useRegisterUserMutation } from "@/redux/apiSlices/authApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import Entypo from "@expo/vector-icons/Entypo";
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
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";
import { useTailwind } from "tailwind-rn";
import * as Yup from "yup";
const Register = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showNewRePassword, setShowNewRePassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const tailwind = useTailwind();

  // ...........api.............//

  const [registerUser] = useRegisterUserMutation();
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
        <AlertNotificationRoot>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              retype_password: "",
            }}
            onSubmit={async (values) => {
              const payload = {
                ...values,
                role: "USER",
              };

              try {
                const res = await registerUser(payload).unwrap();

                if (res.status === "success") {
                  setTimeout(() => {
                    router.push(
                      `/(auth)/VerifyOTP?email=${values?.email}&flow=register`
                    );
                  }, 1000);
                } else {
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "Waring",
                    textBody:
                      res?.message?.email?.[0] || "Something went wrong!",
                    autoClose: 2000,
                  });
                }
              } catch (error: any) {
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Waring",
                  textBody: error?.message,
                });
              }
            }}
            validationSchema={Yup.object({
              name: Yup.string().required("Full Name is required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
              password: Yup.string()
                .min(4, "Password is too short")
                .required("Password is required"),
              retype_password: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Retype Password is required"),
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
                        style={tw`font-poppinsBlack mx-auto text-3xl pt-8 text-primary`}
                      >
                        Register now
                      </Text>
                      <Text
                        style={tw`mx-auto text-secondary font-poppins text-sm py-1`}
                      >
                        Give correct information to create NEXUS account
                      </Text>
                    </View>
                    <View style={tw`  rounded-t-[40px]`}>
                      {/* login from */}
                      <View>
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}
                        >
                          Full Name
                        </Text>
                        <View style={tw` rounded-2xl relative overflow-hidden`}>
                          <SvgXml xml={IconInputBox} />
                          <View
                            style={tw`absolute w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconProfile} />
                            <TextInput
                              style={tw`   text-secondary flex-1 rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Enter your full name..."
                              placeholderTextColor="#888888"
                              value={values.name}
                              onChangeText={(txt) => setFieldValue("name", txt)}
                            />
                          </View>
                        </View>
                        {errors.name && (
                          <Text style={tw`p-2 text-red-700 font-poppins`}>
                            {errors.name}
                          </Text>
                        )}
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}
                        >
                          Email
                        </Text>
                        <View style={tw` rounded-2xl relative overflow-hidden`}>
                          <SvgXml xml={IconInputBox} />
                          <View
                            style={tw`absolute w-full flex-row items-center justify-start px-4`}
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
                          <Text style={tw`p-2 text-red-700 font-poppins`}>
                            {errors.email}
                          </Text>
                        )}
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}
                        >
                          Password
                        </Text>
                        <View style={tw` rounded-2xl relative overflow-hidden`}>
                          <SvgXml xml={IconInputBox} />
                          <View
                            style={tw`absolute w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Password"
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
                        <View style={tw` rounded-2xl relative overflow-hidden`}>
                          <SvgXml xml={IconInputBox} />
                          <View
                            style={tw`absolute w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Password"
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
                        style={tw` relative mt-10`}
                        onPress={() => {
                          handleSubmit();
                        }}
                      >
                        <SvgXml xml={IconButton} />
                        <Text
                          style={tw`text-primary absolute flex w-full   text-center  text-lg py-[14px] font-poppinsBold`}
                        >
                          Register
                        </Text>
                      </TouchableOpacity>

                      <Text style={tw`text-sm text-secondary  mx-auto py-8`}>
                        Or continue with
                      </Text>

                      <View style={tw`flex-row gap-3`}>
                        <TouchableOpacity style={tw` `}>
                          <SvgXml xml={IconGoogleButton} />
                        </TouchableOpacity>
                        <TouchableOpacity style={tw` `}>
                          <SvgXml xml={IconfacebookButton} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={tw`flex-row justify-center gap-3 mb-8`}>
                    <TouchableOpacity
                      onPress={() => router.push("/(auth)/Login")}
                      style={tw`flex-row items-center gap-1`}
                    >
                      <SvgXml xml={IconRegisterText} />
                    </TouchableOpacity>
                  </View>
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

export default Register;
