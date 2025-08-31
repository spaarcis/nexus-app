import { ImgGradint } from "@/assets/images/image"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { Ionicons } from "@expo/vector-icons"
import { ImageBackground } from "expo-image"
import { Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"

const Profile = () => {
    return (
        <View style={tw`flex-1`}>
            <StatusBar barStyle="light-content" />

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
                            source={{
                                uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                            }}
                            style={tw`w-24 h-24 rounded-full`}
                        />
                        <TouchableOpacity
                            style={tw`absolute -bottom-1 -right-1 bg-blue-500 w-8 h-8 rounded-full items-center justify-center border-2 border-white`}
                        >
                            <Ionicons name="add" size={16} color="white" />
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
                            <Text style={tw`text-gray-400 text-sm ml-2`}>Full Name</Text>
                        </View>
                        <TextInput
                            value="Siva Rohitha"
                            style={tw`text-white text-base py-3 border-b border-gray-600`}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    {/* Email Field */}
                    <View style={tw`mb-4`}>
                        <View style={tw`flex-row items-center mb-2`}>
                            <Ionicons name="mail-outline" size={16} color="#9CA3AF" />
                            <Text style={tw`text-gray-400 text-sm ml-2`}>Email</Text>
                        </View>
                        <TextInput
                            value="ronaldoSiva@gmail.com"
                            style={tw`text-white text-base py-3 border-b border-gray-600`}
                            placeholderTextColor="#9CA3AF"
                            keyboardType="email-address"
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Profile
