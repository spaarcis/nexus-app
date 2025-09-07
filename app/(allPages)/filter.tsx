import { ImgGradint } from '@/assets/images/image'
import CustomButton from '@/components/shear/CustomButton'
import { IconLoction } from '@/Icons/Icons'
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from "@react-native-community/datetimepicker"
import { ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const filter = () => {
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState("")
    // handle date change
    const handleDateChange = (event: any, date?: Date) => {
        if (date) {
            const formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            setSelectedDate(formatted)
        }
        setDateModalVisible(false)
    }

    return (
        <View style={tw`flex-1 px-5`}>
            <ImageBackground
                source={ImgGradint}
                style={{
                    width: _Width,
                    height: _HIGHT,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#000000"

                }}
            />
            <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center  mt-12 mb-6`}>
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text style={tw`text-primary text-lg ml-1`}>Back</Text>
            </TouchableOpacity>

            <View style={tw`flex-1 justify-between  `}>
                <View>
                    <View>
                        <Text style={tw`text-primary text-base font-poppinsSemiBold mb-3`}>Location</Text>
                        <View
                            style={tw`bg-white/10 py-2 px-4 rounded-full flex-row justify-between items-center`}
                        >
                            <TextInput
                                placeholder="Enter location"
                                placeholderTextColor="#B0B0B0"
                                style={tw`ml-1 text-white flex-1`}
                            />
                            <SvgXml xml={IconLoction} />
                        </View>
                    </View>
                    {/* Date Selection */}
                    <View style={tw`mb-4 mt-4`}>
                        <Text style={tw`text-primary text-base font-poppinsSemiBold mb-3`}>Date</Text>
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
                </View>
                <TouchableOpacity
                    style={tw`  mb-10`}
                    onPress={() => {
                        router.push("/(allPages)/afterFilterPage")
                    }}
                >
                    <CustomButton title={"Search"} />
                </TouchableOpacity>
            </View>
            {dateModalVisible && (
                <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    )
}

export default filter