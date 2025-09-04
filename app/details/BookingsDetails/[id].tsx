import { ImgGradint } from "@/assets/images/image"
import { IconA1, IconButton, IconCleander, IconContact, IconDone, Iconhoure, IconLoction, IconStar, IconTime, IconVIP } from "@/Icons/Icons"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { Ionicons } from "@expo/vector-icons"
import { ImageBackground } from "expo-image"
import { router } from "expo-router"
import { useState } from "react"
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"

const BookingsDetails = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [rating, setRating] = useState(0)
    const [reviewText, setReviewText] = useState("")

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <TouchableOpacity key={index} onPress={() => setRating(index + 1)} style={tw`mr-2`}>
                <Ionicons
                    name={index < rating ? "star" : "star-outline"}
                    size={32}
                    color={index < rating ? "#FFA500" : "#6B7280"}
                />
            </TouchableOpacity>
        ))
    }
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
                                <SvgXml xml={IconStar} />
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
                    onPress={() => setIsModalVisible(true)}
                >
                    <SvgXml xml={IconButton} />
                    <Text
                        style={tw`text-primary absolute flex w-full   text-center  text-lg py-[14px] font-poppinsBold`}
                    >
                        Rating & Review
                    </Text>
                </TouchableOpacity>
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setIsModalVisible(false)}
                >
                    <View style={tw`flex-1 bg-black/70 justify-center items-center px-5`}>
                        <View style={tw`bg-black/40 shadow-lg shadow-[#A7BEFE] rounded-2xl p-8 w-full max-w-sm`}>
                            {/* Modal Header */}
                            <View style={tw`flex-row items-center justify-between mb-6`}>
                                <Text style={tw`text-white text-xl font-semibold`}>Ratings & Review</Text>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                    <Ionicons name="close" size={24} color="#EF4444" />
                                </TouchableOpacity>
                            </View>
                            {/* Rating Section */}
                            <View style={tw`mb-6`}>
                                <Text style={tw`text-white text-lg font-medium mb-3`}>Rating</Text>
                                <View style={tw`flex-row`}>{renderStars()}</View>
                            </View>

                            {/* Review Section */}
                            <View style={tw`mb-8`}>
                                <Text style={tw`text-white text-lg font-medium mb-3`}>Review</Text>
                                <TextInput
                                    style={tw`bg-[#5E5E5E33] rounded-xl p-4  text-white min-h-24 text-base`}
                                    placeholder="Additional Sentence"
                                    placeholderTextColor="#6B7280"
                                    multiline={true}
                                    textAlignVertical="top"
                                    value={reviewText}
                                    onChangeText={setReviewText}
                                />
                            </View>

                            {/* Action Buttons */}
                            <View style={tw`gap-3`}>
                                <TouchableOpacity
                                    style={tw`bg-[#5E5E5E33] rounded-full py-3 items-center`}
                                    onPress={() => setIsModalVisible(false)}
                                >
                                    <Text style={tw`text-red-500 text-lg font-medium`}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={tw` relative`}
                                    onPress={() => {
                                        router.push("/Main/Home/home")
                                    }}
                                >
                                    <SvgXml xml={IconDone} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    )
}

export default BookingsDetails
