import { ImgGradint } from "@/assets/images/image"
import { IconButton, IconEdit, IconUpload } from "@/Icons/Icons"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { Ionicons } from "@expo/vector-icons"
import { ImageBackground } from "expo-image"
import * as ImagePicker from 'expo-image-picker'
import { useState } from "react"
import { Image, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SvgXml } from "react-native-svg"

const Profile = () => {
    const [image, setImage] = useState<string | null>(null);
    const [fullName, setFullName] = useState("Siva Rohitha");
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
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
                    <Text style={tw`text-white text-2xl font-semibold mb-8`}>My Profile</Text>

                    {/* Profile Image Section */}
                    <View style={tw`items-center mb-8`}>
                        <View style={tw`relative`}>

                            <Image
                                source={{ uri: image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }}
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
                        <Text style={tw`text-white text-lg font-medium mb-4`}>Basic Information</Text>

                        {/* Full Name Field */}
                        <View style={tw`mb-4`}>
                            <View style={tw`flex-row items-center mb-2`}>
                                <Ionicons name="person-outline" size={16} color="#9CA3AF" />
                                <Text style={tw`text-secondary font-poppins text-base ml-2`}>Full Name</Text>
                            </View>
                            <TextInput
                                value="Siva Rohitha"
                                style={tw`text-primary text-base py-3 border-b border-secondary`}
                                placeholderTextColor="#9CA3AF"
                                onChangeText={(text) => {
                                    setFullName(text);  // state update
                                    console.log(text);  // console log
                                }}
                            />
                            <View style={tw`absolute right-0 bottom-3`}>
                                <SvgXml xml={IconEdit} />
                            </View>
                        </View>
                        {/* Email Field */}
                        <View style={tw`mb-4`}>
                            <View style={tw`flex-row items-center mb-2`}>
                                <Ionicons name="mail-outline" size={16} color="#9CA3AF" />
                                <Text style={tw`text-secondary font-poppins text-base ml-2`}>Email</Text>
                            </View>
                            <Text style={tw`text-primary  text-base py-3  border-secondary`}>
                                ronaldoSiva@gmail.com
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={tw` relative mx-auto mt-28`}
                    onPress={() => { }}
                >
                    <SvgXml xml={IconButton} />
                    <Text
                        style={tw`text-primary absolute flex w-full   text-center  text-lg py-[14px] font-poppinsBold`}
                    >
                        Edit profile
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Profile
