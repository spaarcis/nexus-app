import { ImgGradint } from "@/assets/images/image";
import { IconButton, IconEdit, IconUpload } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useEdit_profile_pictureMutation } from "@/redux/apiSlices/authApiSlices";
import {
  useEdit_profileMutation,
  useUser_profileQuery,
} from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

const Profile = () => {
  const [image, setImage] = React.useState<ImagePicker.ImagePickerAsset | null>(
    null
  );
  const [fullName, setFullName] = useState("Siva Rohitha");

  const { data: user, isLoading } = useUser_profileQuery({});
  const [edit_profile] = useEdit_profileMutation();
  const [edit_profile_picture] = useEdit_profile_pictureMutation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      const pickedImage = result.assets[0];
      setImage(pickedImage as any);

      const formData = new FormData();
      formData.append("photo", {
        uri: pickedImage.uri,
        name: pickedImage.fileName || "profile.jpg",
        type: pickedImage.mimeType || "image/jpeg",
      } as any);

      try {
        const res = await edit_profile_picture(formData).unwrap();
        console.log(res, "edit_profile_picture success");
      } catch (err) {
        console.log(err, "edit_profile_picture error");
      }
    }
  };

  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", fullName);

      if (image?.uri) {
        formData.append("gaming_zone", {
          uri: image?.uri,
          name: image?.fileName || "profile.jpg",
          type: image?.mimeType || "image/jpeg",
        } as any);
      }
      const res = await edit_profile(formData).unwrap();
      console.log(res, "almssss");

      // alert("Profile updated successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.data?.name) {
      setFullName(user.data.name);
    }
  }, [user]);
  if (isLoading) {
    <View style={tw`flex-1 justify-center items-center `}>
      <ActivityIndicator size="large" color="#0c8ce9" />
      <Text style={tw`mt-4 text-lg font-poppins text-gray-700`}>
        Loading...
      </Text>
    </View>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex-1`}
    >
      <ScrollView>
        {/* Background */}
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

        <View style={tw`flex-1 px-6 pt-16`}>
          {/* Header */}
          <Text style={tw`text-white text-2xl font-semibold mb-8`}>
            My Profile
          </Text>
          {/* Profile Image Section */}
          <View style={tw`items-center mb-8`}>
            <View style={tw`relative`}>
              <Image
                source={image ? { uri: image.uri } : user?.data?.avatar}
                style={tw`w-24 h-24 rounded-full`}
              />
              <TouchableOpacity
                style={tw`absolute -bottom-1 -right-1 bg-primary w-8 h-8 rounded-full items-center justify-center border-2 border-white`}
                onPress={pickImage}
              >
                <SvgXml xml={IconUpload} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw`mb-6`}>
            <Text style={tw`text-white text-lg font-medium mb-4`}>
              Basic Information
            </Text>

            {/* Full Name Field */}
            <View style={tw`mb-4`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Ionicons name="person-outline" size={16} color="#9CA3AF" />
                <Text style={tw`text-secondary font-poppins text-base ml-2`}>
                  Full Name
                </Text>
              </View>
              <TextInput
                value={fullName}
                style={tw`text-primary text-base py-3 border-b border-secondary`}
                placeholderTextColor="#9CA3AF"
                onChangeText={(text) => setFullName(text)}
              />
              <View style={tw`absolute right-0 bottom-3`}>
                <SvgXml xml={IconEdit} />
              </View>
            </View>
            {/* Email Field */}
            <View style={tw`mb-4`}>
              <View style={tw`flex-row items-center mb-2`}>
                <Ionicons name="mail-outline" size={16} color="#9CA3AF" />
                <Text style={tw`text-secondary font-poppins text-base ml-2`}>
                  Email
                </Text>
              </View>
              <Text style={tw`text-primary  text-base py-3  border-secondary`}>
                {user?.data?.email}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={tw` relative mx-auto mt-28`}
          onPress={handleEditProfile}
        >
          <SvgXml xml={IconButton} />
          <Text
            style={tw`text-primary absolute flex w-full text-center text-lg py-[14px] font-poppinsBold`}
          >
            Edit profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
