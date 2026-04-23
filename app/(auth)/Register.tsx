import * as Yup from "yup";

import { IconEmail, IconPoword, IconProfile } from "@/Icons/Icons";
import { _HIGHT, _Width } from "@/utils/utils";

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

import { ImgGradint } from "@/assets/images/image";
import CustomButton from "@/components/shear/CustomButton";
import tw from "@/lib/tailwind";
import { useRegisterUserMutation } from "@/redux/apiSlices/authApiSlices";
import Entypo from "@expo/vector-icons/Entypo";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { SvgXml } from "react-native-svg";
import { useTailwind } from "tailwind-rn";

const Register = () => {
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showNewRePassword, setShowNewRePassword] = React.useState(false);
  const tailwind = useTailwind();
  const [checked, setIsChecked] = React.useState(false);

  // ...........api.............//

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async (values: any) => {
    const payload = {
      ...values,
      role: "USER",
    };

    try {
      const res = await registerUser(payload).unwrap();

      if (res.status === "success") {
        setTimeout(() => {
          router.push(`/(auth)/VerifyOTP?email=${values?.email}&flow=register`);
        }, 1000);
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Waring",
          textBody: res?.message?.email?.[0] || "Something went wrong!",
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
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      // .min(8, "Password must be at least 8 characters ")
      .required("Password is required"),
    retype_password: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleCheckBox = () => {
    setIsChecked(!checked);
  };

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
      <ScrollView contentContainerStyle={tw`px-5`} style={tw``}>
        <AlertNotificationRoot>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              retype_password: "",
            }}
            onSubmit={handleRegister}
            validationSchema={validationSchema}
          >
            {({
              values,
              touched,
              handleSubmit,
              handleBlur,
              handleChange,
              errors,
            }) => {
              return (
                <View
                  style={[
                    tw`flex-grow justify-between pb-6`,
                    {
                      // height: _HIGHT * 0.8,
                    },
                  ]}
                >
                  {/* <View></View> */}
                  <View>
                    <View style={tw` py-10 gap-2 `}>
                      <Text
                        style={tw`font-poppinsBlack mx-auto text-3xl  text-primary`}
                      >
                        Register now
                      </Text>
                      <Text
                        style={tw`mx-auto text-secondary text-center font-poppins text-sm py-1`}
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
                        <View
                          style={tw` bg-white/10 rounded-full overflow-hidden`}
                        >
                          <View
                            style={tw` w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconProfile} />
                            <TextInput
                              style={tw`   text-secondary flex-1 rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Enter your full name..."
                              placeholderTextColor="#888888"
                              value={values.name}
                              onChangeText={handleChange("name")}
                              onBlur={handleBlur("name")}
                            />
                          </View>
                        </View>
                        {errors.name && touched.name && (
                          <Text style={tw`p-2 text-red-700 font-poppins`}>
                            {errors.name}
                          </Text>
                        )}
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}
                        >
                          Email
                        </Text>
                        <View
                          style={tw` bg-white/10 rounded-full overflow-hidden`}
                        >
                          <View
                            style={tw` w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconEmail} />
                            <TextInput
                              style={tw`   text-secondary flex-1 rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Enter your email..."
                              placeholderTextColor="#888888"
                              value={values.email}
                              onChangeText={handleChange("email")}
                              onBlur={handleBlur("email")}
                            />
                          </View>
                        </View>
                        {errors.email && touched.email && (
                          <Text style={tw`p-2 text-red-700 font-poppins`}>
                            {errors.email}
                          </Text>
                        )}
                        <Text
                          style={tw`text-primary font-poppinsSemiBold text-base pl-2 pt-5 pb-2`}
                        >
                          Password
                        </Text>
                        <View
                          style={tw` bg-white/10 rounded-full  overflow-hidden`}
                        >
                          <View
                            style={tw` w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Password"
                              placeholderTextColor="#888888"
                              secureTextEntry={!showNewPassword}
                              value={values.password}
                              onChangeText={handleChange("password")}
                              onBlur={handleBlur("password")}
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
                        {errors.password && touched.password && (
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
                          style={tw` bg-white/10 rounded-full  overflow-hidden`}
                        >
                          <View
                            style={tw` w-full flex-row items-center justify-start px-4`}
                          >
                            <SvgXml xml={IconPoword} />
                            <TextInput
                              style={tw` text-secondary  w-full rounded-full font-poppins text-base px-5 h-14`}
                              placeholder="Password"
                              placeholderTextColor="#888888"
                              secureTextEntry={!showNewRePassword}
                              value={values.retype_password}
                              onChangeText={handleChange("retype_password")}
                              onBlur={handleBlur("retype_password")}
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
                      {errors.retype_password && touched.retype_password && (
                        <Text style={tw`p-2 text-red-700 font-poppins`}>
                          {errors.retype_password}
                        </Text>
                      )}
                    </View>
                    {/* ============= Terms and conditions ============= checkbox  */}

                    <View
                      style={tw`flex-row gap-2 items-start rounded-none pt-3 px-3`}
                    >
                      <TouchableOpacity
                        onPress={() => handleCheckBox()}
                        style={tw.style(
                          `border border-gray-400 w-5 h-5  justify-center items-center rounded-sm`,
                          checked ? `bg-blue-800 border-0` : `bg-transparent`,
                        )}
                      >
                        {checked ? (
                          <Text style={tw`text-white text-sm`}>✔</Text>
                        ) : null}
                      </TouchableOpacity>
                      <Text numberOfLines={2} style={tw`text-gray-400 text-sm`}>
                        By create a account you agree to our{" "}
                        <Text style={tw`font-semibold underline`}>
                          terms of use{" "}
                        </Text>{" "}
                        &{" "}
                        <Text style={tw`font-semibold underline`}>
                          privacy policy.
                        </Text>
                      </Text>
                    </View>
                    {!checked ? (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={tw`h-14 mt-10 bg-slate-600 rounded-full`}
                      >
                        <Text
                          style={tw`text-gray-400  flex w-full text-center text-lg py-[14px] font-poppinsBold`}
                        >
                          Register
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={tw`relative mt-10`}
                        onPress={() => {
                          handleSubmit();
                        }}
                      >
                        <CustomButton
                          title={isLoading ? "Registering..." : " Register"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={tw`flex-row items-center justify-center pb-3`}>
                    <Text style={tw`text-white font-poppins text-sm`}>
                      Have an account?{" "}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => router.replace("/(auth)/Login")}
                      style={tw`py-4`}
                    >
                      <MaskedView
                        maskElement={
                          <Text
                            style={[
                              tw`text-base font-semibold`,
                              { backgroundColor: "transparent" },
                            ]}
                          >
                            Sign in
                          </Text>
                        }
                      >
                        <LinearGradient
                          colors={["#6523E7", "#023CE3CC", "#6523E7CC"]}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 2 }}
                        >
                          <Text style={tw` font-semibold text-base opacity-0 `}>
                            Sign in
                          </Text>
                        </LinearGradient>
                      </MaskedView>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          </Formik>
        </AlertNotificationRoot>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
