"use client"

import { ImgGradint } from "@/assets/images/image"
import { IconButton, IconInputBox, IconPoword } from "@/Icons/Icons"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import Entypo from "@expo/vector-icons/Entypo"
import { router } from "expo-router"
import { Formik } from "formik"
import React from "react"
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"
import { AlertNotificationRoot } from "react-native-alert-notification"
import { SvgXml } from "react-native-svg"
import { useTailwind } from "tailwind-rn"
import * as Yup from "yup"

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showRetypePassword, setShowRetypePassword] = React.useState(false)
  const tailwind = useTailwind()

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ backgroundColor: "#000" }}>
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
          backgroundColor: "#000000",
        }}
      />
      <ScrollView contentContainerStyle={tw`px-5`}>
        <AlertNotificationRoot>
          <Formik
            initialValues={{ currentPassword: "", newPassword: "", retypePassword: "" }}
            onSubmit={async (values) => {
              console.log(values)
              // Handle password change logic here
            }}
            validationSchema={Yup.object({
              currentPassword: Yup.string().min(4, "Password is too short").required("Current password is required"),
              newPassword: Yup.string().min(4, "Password is too short").required("New password is required"),
              retypePassword: Yup.string()
                .min(4, "Password is too short")
                .required("Retype password is required")
                .oneOf([Yup.ref("newPassword")], "Passwords must match"),
            })}
          >
            {({ values, setFieldValue, handleSubmit, errors }) => {
              return (
                <View
                  style={[
                    tw`flex-col`,
                    {
                      height: _HIGHT,
                      paddingTop: 60,
                    },
                  ]}
                >
                  {/* Header */}
                  <View style={tw`flex-row items-center mb-8`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center`}>
                      <Entypo name="chevron-left" size={24} color="#FFFFFF" />
                      <Text style={tw`text-primary font-poppins text-lg ml-2`}>Back</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Title Section */}
                  <View style={tw`mb-12`}>
                    <Text style={tw`font-poppinsBlack text-3xl text-primary mb-3`}>Change Your Password</Text>
                    <Text style={tw`text-secondary font-poppins text-sm`}>
                      You have to fill current password section for change the password.
                    </Text>
                  </View>

                  {/* Form Fields */}
                  <View>
                    {/* Current Password */}
                    <Text style={tw`text-primary font-poppinsSemiBold text-base pl-2 pb-2`}>Current Password</Text>
                    <View style={tw`rounded-2xl relative overflow-hidden mb-6`}>
                      <SvgXml xml={IconInputBox} />
                      <View style={tw`absolute w-full flex-row items-center justify-start px-4`}>
                        <SvgXml xml={IconPoword} />
                        <TextInput
                          style={tw`text-secondary w-full rounded-full font-poppins text-base px-5 h-14`}
                          placeholder="••••••••"
                          placeholderTextColor="#888888"
                          secureTextEntry={!showCurrentPassword}
                          value={values.currentPassword}
                          onChangeText={(txt) => setFieldValue("currentPassword", txt)}
                        />
                        <TouchableOpacity
                          style={tw`absolute right-12 top-5`}
                          onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          <Entypo name={showCurrentPassword ? "eye" : "eye-with-line"} size={20} color="#777" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {errors.currentPassword && (
                      <Text style={tw`p-2 text-red-700 font-poppins mb-2`}>{errors.currentPassword}</Text>
                    )}

                    {/* New Password */}
                    <Text style={tw`text-primary font-poppinsSemiBold text-base pl-2 pb-2`}>New Password</Text>
                    <View style={tw`rounded-2xl relative overflow-hidden mb-6`}>
                      <SvgXml xml={IconInputBox} />
                      <View style={tw`absolute w-full flex-row items-center justify-start px-4`}>
                        <SvgXml xml={IconPoword} />
                        <TextInput
                          style={tw`text-secondary w-full rounded-full font-poppins text-base px-5 h-14`}
                          placeholder="••••••••"
                          placeholderTextColor="#888888"
                          secureTextEntry={!showNewPassword}
                          value={values.newPassword}
                          onChangeText={(txt) => setFieldValue("newPassword", txt)}
                        />
                        <TouchableOpacity
                          style={tw`absolute right-12 top-5`}
                          onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                          <Entypo name={showNewPassword ? "eye" : "eye-with-line"} size={20} color="#777" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {errors.newPassword && (
                      <Text style={tw`p-2 text-red-700 font-poppins mb-2`}>{errors.newPassword}</Text>
                    )}

                    {/* Retype New Password */}
                    <Text style={tw`text-primary font-poppinsSemiBold text-base pl-2 pb-2`}>Retype New Password</Text>
                    <View style={tw`rounded-2xl relative overflow-hidden mb-6`}>
                      <SvgXml xml={IconInputBox} />
                      <View style={tw`absolute w-full flex-row items-center justify-start px-4`}>
                        <SvgXml xml={IconPoword} />
                        <TextInput
                          style={tw`text-secondary w-full rounded-full font-poppins text-base px-5 h-14`}
                          placeholder="••••••••"
                          placeholderTextColor="#888888"
                          secureTextEntry={!showRetypePassword}
                          value={values.retypePassword}
                          onChangeText={(txt) => setFieldValue("retypePassword", txt)}
                        />
                        <TouchableOpacity
                          style={tw`absolute right-12 top-5`}
                          onPress={() => setShowRetypePassword(!showRetypePassword)}
                        >
                          <Entypo name={showRetypePassword ? "eye" : "eye-with-line"} size={20} color="#777" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {errors.retypePassword && (
                      <Text style={tw`p-2 text-red-700 font-poppins mb-2`}>{errors.retypePassword}</Text>
                    )}

                    {/* Update Button */}
                    <TouchableOpacity
                      style={tw`relative mt-10`}
                      onPress={() => {
                        handleSubmit()
                      }}
                    >
                      <SvgXml xml={IconButton} />
                      <Text
                        style={tw`text-primary absolute flex w-full text-center text-lg py-[14px] font-poppinsBold`}
                      >
                        Update
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }}
          </Formik>
        </AlertNotificationRoot>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ChangePassword
