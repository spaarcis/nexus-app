import { ImgGradint } from "@/assets/images/image"
import { IconA1, IconButton, IconCleander, IconContact, Iconhoure, IconLoction, IconTime, IconVIP } from "@/Icons/Icons"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { Ionicons } from "@expo/vector-icons"
import { ImageBackground } from "expo-image"
import { router } from "expo-router"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"

const BookingsDetails = () => {
    return (
        <View style={tw`flex-1`}>
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

            <ScrollView style={tw`flex-1 px-5`} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={tw`flex-row items-center justify-between mt-12 mb-6`}>
                    <View style={tw`flex-row items-center justify-between w-full`}>
                        <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center`}>
                            <Ionicons name="chevron-back" size={24} color="white" />
                            <Text style={tw`text-white text-lg ml-1`}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`flex-row items-center`}>
                            <SvgXml xml={IconContact} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={tw`bg-gray-800/50 rounded-2xl p-4 mb-6`}>
                    <View style={tw`mb-6`}>
                        <Image
                            source={{
                                uri: "https://picsum.photos/200/200?random=2",
                            }}
                            style={tw`w-full h-48 rounded-2xl`}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-white text-xl font-poppinsBold mb-4`}>Alpha Esport Zone</Text>

                        <View style={tw`flex-row items-center gap-1 mb-2`}>
                            <SvgXml xml={IconLoction} />
                            <Text style={tw`text-gray-400 font-poppins ml-1`}>Los Angeles, USA</Text>
                            <View style={tw`flex-row items-center ml-auto`}>
                                <Ionicons name="star" size={16} color="#FCD34D" />
                                <Text style={tw`text-white font-poppins ml-1`}>4.5</Text>
                            </View>
                        </View>

                        <View style={tw`flex-row items-center`}>
                            <SvgXml xml={IconTime} />
                            <Text style={tw`text-gray-400 font-poppins ml-1`}>Operating hours</Text>
                            <Text style={tw`text-white font-poppins ml-auto`}>10:00 AM - 09:00 PM</Text>
                        </View>
                    </View>
                </View>

                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-lg font-poppinsSemiBold mb-4`}>Booking Information</Text>
                    <View style={tw`flex-row items-center justify-between mb-3`}>
                        <View style={tw`flex-row items-center`}>
                            <SvgXml xml={IconCleander} />
                            <Text style={tw`text-gray-400 font-poppins ml-2`}>9 June, 2025</Text>
                        </View>
                    </View>

                    <View style={tw`flex-row items-center justify-between mb-3`}>
                        <View style={tw`flex-row items-center`}>
                            <SvgXml xml={IconTime} />
                            <Text style={tw`text-gray-400 font-poppins ml-2`}>10:00 AM</Text>
                        </View>
                    </View>

                    <View style={tw`flex-row items-center justify-between mb-3`}>
                        <View style={tw`flex-row items-center`}>
                            <SvgXml xml={Iconhoure} />
                            <Text style={tw`text-gray-400 font-poppins ml-2`}>2 - Hour</Text>
                        </View>
                    </View>

                    <View style={tw`flex-row items-center justify-between mb-3`}>
                        <View style={tw`flex-row items-center`}>
                            <SvgXml xml={IconA1} />
                            <Text style={tw`text-gray-400 font-poppins ml-2`}>A1</Text>
                        </View>
                    </View>

                    <View style={tw`flex-row items-center justify-between mb-4`}>
                        <View style={tw`flex-row items-center`}>
                            <SvgXml xml={IconVIP} />
                            <Text style={tw`text-gray-400 font-poppins ml-2`}>VIP</Text>
                        </View>
                    </View>

                    <View style={tw`border-t border-gray-600 pt-4`}>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={tw`text-white text-lg  font-poppinsSemiBold`}>Paid:</Text>
                            <Text style={tw`text-white text-xl font-poppinsBold`}>€3644</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    style={tw` relative mb-8`}

                >
                    <SvgXml xml={IconButton} />
                    <Text
                        style={tw`text-primary absolute flex w-full   text-center  text-lg py-[14px] font-poppinsBold`}
                    >
                        Rating & Review
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default BookingsDetails
