"use client"

import { ImgGradint } from "@/assets/images/image"
import { IconButton, IconLoction, IconStar, IconTime } from "@/Icons/Icons"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import { BlurView } from "expo-blur"
import { ImageBackground } from "expo-image"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"

const roomDetails = () => {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    const [selectedRoom, setSelectedRoom] = useState("VIP")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("00:00")
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [timeModalVisible, setTimeModalVisible] = useState(false)
    const [selectedDuration, setSelectedDuration] = useState("Select Duration");
    const [showDurationDropdown, setShowDurationDropdown] = useState(false);
    const [showRoomDropdown, setShowRoomDropdown] = useState(false);

    const roomOptions = ['VIP', 'NON VIP', 'Semi VIP', 'PS5', 'Common'];
    const durations = ["1 hour", "2 hour", "3 hour", "4 hour", "5 hour", "6 hour", "7 hour", "8 hour"];

    // handle date change
    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            setSelectedDate(formatted)
        }
        setDateModalVisible(false)
    }
    // handle time change
    const handleTimeChange = (event: any, time?: Date) => {
        if (time) {
            const hours = time.getHours().toString().padStart(2, "0")
            const minutes = time.getMinutes().toString().padStart(2, "0")
            setSelectedTime(`${hours}:${minutes}`)
        }
        setTimeModalVisible(false)
    }

    return (
        <View style={tw`flex-1`}>
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

            <ScrollView style={tw`flex-1 px-4`}>
                {/* Header */}
                <View style={tw`flex-row justify-between items-center mt-12 mb-6`}>
                    <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center`}>
                        <Ionicons name="chevron-back" size={24} color="white" />
                        <Text style={tw`text-primary text-lg ml-1`}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw`bg-blue-600 px-4 py-2 rounded-full`}>
                        <Text style={tw`text-primary font-poppinsMedium`}>Contact</Text>
                    </TouchableOpacity>
                </View>

                <BlurView style={tw`p-4 rounded-3xl overflow-hidden gap-4`} intensity={10} tint="light">
                    {/* Gaming Room Image */}
                    <View style={tw`mb-6`}>
                        <Image
                            source={{ uri: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop" }}
                            style={tw`w-full h-48 rounded-xl`}
                            resizeMode="cover"
                        />
                        <TouchableOpacity style={tw`absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full`}>
                            <Ionicons name="heart-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Room Info */}
                    <View style={tw`mb-6`}>
                        <Text style={tw`text-primary text-2xl font-poppinsBold mb-4`}>Alpha Esport Zone</Text>

                        <View style={tw`flex-row items-center mb-2`}>
                            <SvgXml xml={IconLoction} />
                            <Text style={tw`text-gray-400 font-poppins ml-1`}>Los Angeles, USA</Text>
                            <View style={tw`flex-row items-center ml-auto`}>
                                <SvgXml xml={IconStar} />
                                <Text style={tw`text-primary ml-1 font-poppins`}>4.6</Text>
                            </View>
                        </View>

                        <View style={tw`flex-row items-center gap-1`}>
                            <SvgXml xml={IconTime} />
                            <Text style={tw`text-gray-400 ml-1 font-poppins`}>Operating Hours</Text>
                            <Text style={tw`text-primary ml-auto font-poppins`}>10:00 AM - 09:00 PM</Text>
                        </View>
                    </View>
                </BlurView>
                {/* Select Room */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-white text-lg font-poppinsBold mb-3`}>Select Room</Text>
                    <TouchableOpacity
                        onPress={() => setShowRoomDropdown(!showRoomDropdown)}
                        style={tw`bg-white/10 mt-2 rounded-full p-4 flex-row justify-between items-center border border-gray-700`}
                    >
                        <Text style={tw`text-gray-400 text-base font-poppins`}>{selectedRoom}</Text>
                        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* Room Dropdown */}
                    {showRoomDropdown && (
                        <View style={tw`bg-gray-900/95 rounded-2xl mt-2 border border-gray-700 overflow-hidden`}>
                            {roomOptions.map((room, index) => (
                                <TouchableOpacity
                                    key={room}
                                    onPress={() => {
                                        setSelectedRoom(room);
                                        setShowRoomDropdown(false);
                                    }}
                                    style={tw`p-4 ${index !== roomOptions.length - 1 ? 'border-b border-gray-700' : ''}`}
                                >
                                    <Text style={tw`text-white text-base font-poppins`}>{room}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* Date Selection */}
                <View style={tw`mb-4 `}>
                    <Text style={tw`text-primary text-lg font-poppinsSemiBold mb-3`}>Date</Text>
                    <TouchableOpacity
                        style={tw`bg-white/10 p-4 rounded-full flex-row justify-between items-center`}
                        onPress={() => setDateModalVisible(true)}
                    >
                        <Text style={tw`text-gray-400`}>
                            {selectedDate ? selectedDate : "DD/MM/YYYY"}
                        </Text>
                        <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                {/* Starting Time */}
                <View style={tw`mb-4`}>
                    <Text style={tw`text-primary text-lg font-poppinsSemiBold mb-3`}>Starting time</Text>
                    <TouchableOpacity
                        style={tw`bg-gray-800 bg-white/10 p-4 rounded-full flex-row justify-between items-center`}
                        onPress={() => setTimeModalVisible(true)}
                    >
                        <Text style={tw`text-gray-400`}>
                            {selectedTime ? selectedTime : "00:00"}
                        </Text>
                        <Ionicons name="time-outline" size={20} color="#9CA3AF" />
                    </TouchableOpacity>
                </View>

                {/* Duration */}
                <View style={tw`mb-8 `}>
                    <Text style={tw`text-primary text-lg font-semibold mb-3`}>
                        Duration
                    </Text>

                    <TouchableOpacity
                        style={tw`bg-white/10 p-4 rounded-full flex-row justify-between items-center`}
                        onPress={() => setShowDurationDropdown(!showDurationDropdown)}
                    >
                        <Text style={tw`text-gray-400`}>{selectedDuration}</Text>
                        <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    {/* Dropdown */}
                    {showDurationDropdown && (
                        <View style={tw`bg-white/10  mt-2 rounded-lg`}>
                            <ScrollView
                                style={tw`max-h-60`}
                                nestedScrollEnabled={true}
                                showsVerticalScrollIndicator={true}
                            >
                                {durations.map((duration) => (
                                    <TouchableOpacity
                                        key={duration}
                                        style={tw`p-3 border-b border-gray-700`}
                                        onPress={() => {
                                            setSelectedDuration(duration);
                                            setShowDurationDropdown(false);
                                        }}
                                    >
                                        <Text style={tw`text-white`}>{duration}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                </View>

                <TouchableOpacity
                    style={tw` relative mb-4`}
                    onPress={() => {
                        router.push("/(allPages)/seatPosotion")
                    }}
                >
                    <SvgXml xml={IconButton} />
                    <Text
                        style={tw`text-primary absolute flex w-full text-center text-lg py-[14px] font-poppinsBold`}
                    >
                        Check Availability
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Date Picker Modal */}
            {dateModalVisible && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            {/* Time Picker Modal */}
            {timeModalVisible && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                />
            )}
            <Modal>
                <View>
                
                </View>
            </Modal>
        </View>
    )
}

export default roomDetails
