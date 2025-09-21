import { ImgGradint } from "@/assets/images/image";
import { IconButton, IconEdit, IconUpload } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import {
  useEdit_profileMutation,
  useUser_profileQuery,
} from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
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
  const [image, setImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState("Siva Rohitha");
  const { data: user, isLoading } = useUser_profileQuery({});
  const [edit_profile] = useEdit_profileMutation();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const handleEditProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", fullName);

      if (image) {
        formData.append("avatar", {
          uri: image,
          type: "image/jpeg",
          name: "profile.jpg",
        } as any);
      }
      const res = await edit_profile(formData).unwrap();

      alert("Profile updated successfully!");
    } catch (err) {}
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
                source={
                  user?.data?.avatar || {
                    uri: image,
                  }
                }
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
          {/* Basic Information Section */}
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
