import * as Yup from "yup";

import {
  IconEmail,
  IconForgetPass,
  IconGoogleIcon,
  IconPoword,
  IconRegisterText,
} from "@/Icons/Icons";
import {
  useLoginUserMutation,
  useSocialLoginMutation,
} from "@/redux/apiSlices/authApiSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import tw from "@/lib/tailwind";
import Entypo from "@expo/vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { SvgXml } from "react-native-svg";
import { useTailwind } from "tailwind-rn";

const Login = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [isChecked, setChecked] = React.useState(false);
  const tailwind = useTailwind();
  const [socialLogin] = useSocialLoginMutation();
  // sign in google
  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "408739532193-ccqlar2l4bcmpdf03ct45aplgs7lljoc.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const user = response?.data?.user;
      if (!user) {
        router.push({
          pathname: "/Toaster",
          params: {
            res:
              response?.type === "cancelled"
                ? "You are cancelled your login request"
                : "Something went wrong",
          },
        });

        return;
      }

      // Convert Google photo URL into file object
      let photoFile: any = null;
      if (user?.photo) {
        const filename = `profile_${Date.now()}.jpg`;
        const photoResp = await fetch(user.photo);
        const blob = await photoResp.blob();

        photoFile = {
          uri: user.photo,
          name: filename,
          type: blob.type || "image/jpeg",
        };
      }

      // Create FormData
      const formData = new FormData();
      formData.append("name", user?.name || "");
      formData.append("email", user?.email || "");
      formData.append("google_id", user?.id || "");
      if (photoFile) {
        formData.append("photo", photoFile as any);
      }

      // Send to backend
      const res = await socialLogin(formData).unwrap();

      if (res.status) {
        AsyncStorage.setItem("token", res?.data?.access_token);
        setTimeout(() => {
          router?.replace(`/Main/Homes/Home`);
        }, 1000);
      } else {
      }
    } catch (error) {}
  };

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (values: any) => {
    try {
      const res = await loginUser(values).unwrap();
      if (res.status === "success") {
        router.replace("/Main/Homes/Home");
        AsyncStorage.setItem("token", res?.data?.access_token);
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
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <ScrollView
            contentContainerStyle={tw`px-5`}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AlertNotificationRoot>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  try {
                    const res = await loginUser(values).unwrap();
                    if (res.status) {
                      router.push("/Main/Homes/Home");
                      AsyncStorage.setItem("token", res?.data?.access_token);
                      router.push({
                        pathname: "/Toaster",
                        params: { res: res.message },
                      });
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
                  email: Yup.string().email().required("Email is required"),
                  password: Yup.string()
                    // .min(6, "Password is too sort ")
                    .required("Password is required")
                    .uppercase("1 lowercase letter added"),
                })}
              >
                {({
                  values,
                  touched,
                  handleSubmit,
                  errors,
                  handleBlur,
                  handleChange,
                }) => {
                  return (
                    <View
                      style={[
                        tw`flex-col items-center justify-between`,
                        {
                          height: _HIGHT * 0.9,
                        },
                      ]}
                    >
                      <View></View>
                      <View>
                        <View style={tw` pb-14 gap-2`}>
                          <Text
                            style={tw`font-poppinsBlack mx-auto text-3xl text-primary`}
                          >
                            Sign In
                          </Text>
                          <Text
                            style={tw` mx-auto text-secondary font-poppins text-sm py-1`}
                          >
                            Access your account with correct information
                          </Text>
                        </View>
                        <View style={tw`  `}>
                          {/* login from */}
                          <View>
                            <Text
                              style={tw`text-primary font-poppinsSemiBold text-base pl-2  pb-2`}
                            >
                              Email
                            </Text>
                            <View
                              style={tw` rounded-full relative overflow-hidden`}
                            >
                              <View
                                style={tw`bg-white/10  w-[100%] flex-row items-center justify-start px-4`}
                              >
                                <SvgXml xml={IconEmail} />
                                <TextInput
                                  style={tw`   text-secondary flex-1 rounded-full font-poppins text-base px-5 h-14`}
                                  placeholder="Enter your email..."
                                  placeholderTextColor="#888888"
                                  value={values.email}
                                  onBlur={handleBlur("email")}
                                  onChangeText={handleChange("email")}
                                />
                              </View>
                            </View>
                            {errors.email && touched.email && (
                              <Text style={tw` pl-4 text-red-700 font-poppins`}>
                                {errors.email}
                              </Text>
                            )}
                            <Text
                              style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5  pb-2`}
                            >
                              Password
                            </Text>
                            <View
                              style={tw` rounded-full relative overflow-hidden`}
                            >
                              <View
                                style={tw`bg-white/10  w-full flex-row items-center justify-start px-4`}
                              >
                                <SvgXml xml={IconPoword} />
                                <TextInput
                                  style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                                  placeholder="Password"
                                  placeholderTextColor="#888888"
                                  secureTextEntry={!showNewPassword}
                                  value={values.password}
                                  onBlur={handleBlur("password")}
                                  onChangeText={handleChange("password")}
                                />
                                <Entypo
                                  name={
                                    showNewPassword ? "eye" : "eye-with-line"
                                  }
                                  style={tw`absolute right-12 top-5 `}
                                  size={20}
                                  color="#777"
                                  onPress={() =>
                                    setShowNewPassword(!showNewPassword)
                                  }
                                />
                              </View>
                            </View>
                          </View>
                          {errors.password && touched.password && (
                            <Text
                              style={tw`px-4 pt-1 text-red-700 font-poppins`}
                            >
                              {errors.password}
                            </Text>
                          )}
                          <View
                            style={tw`pb-7 pt-3 px-7 flex-row justify-end `}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                router.push("/(auth)/ForgetPassword")
                              }
                            >
                              <SvgXml xml={IconForgetPass} />
                            </TouchableOpacity>
                          </View>

                          <TouchableOpacity
                            style={tw`relative mb-4`}
                            onPress={() => {
                              handleSubmit();
                            }}
                          >
                            <CustomButton
                              title={isLoading ? "Loading..." : " Sign in"}
                            />
                          </TouchableOpacity>

                          <Text
                            style={tw`text-sm text-secondary  mx-auto  pb-4`}
                          >
                            Or continue with
                          </Text>
                          <TouchableOpacity
                            onPress={signIn}
                            style={tw`border rounded-full  py-4 flex-row items-center justify-center border-[#5E5E5E] `}
                          >
                            <SvgXml xml={IconGoogleIcon} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={tw`flex-row justify-center gap-3 mb-5`}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => router.push("/(auth)/Register")}
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
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
// new app
