import { ImgGradint } from '@/assets/images/image'
import { IconAvailable, IconButton } from '@/Icons/Icons'
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Ionicons } from '@expo/vector-icons'
import MaskedView from '@react-native-masked-view/masked-view'
import { ImageBackground } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const seatPosotion = () => {
    const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
    const [showPromoModal, setShowPromoModal] = useState(false);
    const [showRoomDropdown, setShowRoomDropdown] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('Select');

    const seats = [
        { id: 'PC 1', available: true },
        { id: 'PC 2', available: false },
        { id: 'PC 3', available: true },
        { id: 'PC 4', available: false },
        { id: 'PC 5', available: true },
        { id: 'PC 6', available: true },
        { id: 'PC 7', available: true },
        { id: 'PC 8', available: true },
        { id: 'PC 9', available: true },
        { id: 'PC 10', available: true },
        { id: 'PC 11', available: true },
        { id: 'PC 12', available: true },
    ];

    const roomOptions = ['VIP', 'NON VIP', 'Semi VIP', 'PS5', 'Common'];
    const promoCodes = [
        { code: 'SAD564', expiry: '12/25/25' },
        { code: 'SAD564', expiry: '12/25/25' },
        { code: 'SAD564', expiry: '12/25/25' },
    ];

    const handleSeatPress = (seatId: string, available: boolean) => {
        if (available) {
            setSelectedSeat(selectedSeat === seatId ? null : seatId);
        }
    };

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
                        <Text style={tw`text-primary font-poppins text-lg ml-1`}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={tw` flex-row items-center justify-center gap-2 px-4 py-2 rounded-full`}>
                        <Text style={tw`text-primary font-poppinsMedium`}>Available Now</Text>
                        <SvgXml xml={IconAvailable} />
                    </TouchableOpacity>
                </View>

                {/* Gaming Lounge Banner */}
                <View style={tw`mb-6 rounded-2xl overflow-hidden h-48`}>
                    <ImageBackground
                        source={{ uri: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg' }}
                        style={tw`flex-1 justify-end`}
                    >
                        <View style={tw`bg-black/60 p-4`}>
                            <Text style={tw`text-white text-xl font-poppinsBold`}>Gaming Lounge</Text>
                        </View>
                    </ImageBackground>
                </View>

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

                {/* Available Seat */}
                <View style={tw`mb-6`}>
                    <Text style={tw`text-white text-lg font-poppinsBold mb-4`}>Available Seat</Text>

                    {/* All 10 seats in proper grid */}
                    <View style={tw`flex-row flex-wrap justify-between`}>
                        {seats.map((seat, index) => (
                            <TouchableOpacity
                                key={seat.id}
                                onPress={() => handleSeatPress(seat.id, seat.available)}
                                style={tw`items-center mb-4 ${index >= 6 ? 'w-1/5' : 'w-1/6'}`}
                                disabled={!seat.available}
                            >
                                <View style={tw`w-12 h-12 rounded-full border-2 items-center justify-center mb-2 ${!seat.available
                                    ? 'border-red-500'
                                    : selectedSeat === seat.id
                                        ? ' border-secondaryGreen'
                                        : 'bg-gray-800/80 border-gray-600'
                                    }`}>
                                    <Ionicons
                                        name="desktop-outline"
                                        size={18}
                                        color={
                                            !seat.available
                                                ? '#EF4444'
                                                : selectedSeat === seat.id
                                                    ? '#FFFFFF'
                                                    : '#9CA3AF'
                                        }
                                    />
                                </View>
                                <Text style={tw`text-xs font-poppinsMedium ${!seat.available
                                    ? 'text-red-400'
                                    : selectedSeat === seat.id
                                        ? 'text-secondaryGreen'
                                        : 'text-gray-400'
                                    }`}>
                                    {seat.id}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Payment Details */}
                <View style={tw`mb-8`}>
                    <View style={tw`flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-white text-lg font-poppinsBold`}>Payment Details</Text>
                        <TouchableOpacity onPress={() => setShowPromoModal(true)}>
                            <MaskedView
                                maskElement={
                                    <Text
                                        style={[
                                            tw`text-base font-poppinsBold`,
                                            { backgroundColor: "transparent" },
                                        ]}
                                    >
                                         Apply promo
                                    </Text>
                                }
                            >

                                <LinearGradient
                                    colors={["#6523E7", "#023CE3", "#6523E7"]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                >
                                    <Text
                                        style={[tw`text-base font-poppinsBold`, { opacity: 0 }]}
                                    >
                                        Apply promo
                                    </Text>
                                </LinearGradient>
                            </MaskedView>
                        </TouchableOpacity>
                    </View>

                    <View >
                        <View style={tw`flex-row justify-between items-center mb-3`}>
                            <Text style={tw`text-gray-300 text-base font-poppins`}>To pay:</Text>
                            <Text style={tw`text-white text-base font-poppinsBold`}>€ 5604</Text>
                        </View>

                        <View style={tw`flex-row justify-between items-center mb-4`}>
                            <Text style={tw`text-gray-300 text-base font-poppins`}>Promo Code:</Text>
                            <Text style={tw`text-white text-base font-poppinsBold`}>SAD564</Text>
                        </View>

                        <View style={tw`h-px bg-gray-700 mb-4`} />

                        <View style={tw`flex-row justify-between items-center`}>
                            <Text style={tw`text-white text-lg font-poppinsBold`}>Total:</Text>
                            <Text style={tw`text-white text-xl font-poppinsBold`}>€ 4500</Text>
                        </View>
                    </View>
                </View>
                {/* Promo Code Modal */}
                {showPromoModal && (
                    <View style={tw`absolute inset-0 bg-black/80 flex-1 justify-center items-center px-4`}>
                        <View style={tw`bg-gray-900 rounded-2xl p-6 w-full max-w-sm`}>
                            <View style={tw`flex-row justify-between items-center mb-6`}>
                                <Text style={tw`text-white text-lg font-poppinsBold`}>Your promo code</Text>
                                <TouchableOpacity onPress={() => setShowPromoModal(false)}>
                                    <Ionicons name="close" size={24} color="white" />
                                </TouchableOpacity>
                            </View>

                            {/* Promo Code Options */}
                            <View style={tw`mb-6`}>
                                {promoCodes.map((promo, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={tw`flex-row items-center justify-between py-3 ${index !== promoCodes.length - 1 ? 'border-b border-gray-700' : ''}`}
                                    >
                                        <View style={tw`flex-row items-center`}>
                                            <View style={tw`w-5 h-5 rounded-full border-2 border-gray-500 mr-3`} />
                                            <Text style={tw`text-white text-base font-poppins`}>{promo.code}</Text>
                                        </View>
                                        <Text style={tw`text-gray-400 text-sm font-poppins`}>Exp in {promo.expiry}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Modal Buttons */}
                            <View style={tw`flex-row gap-3`}>
                                <TouchableOpacity
                                    onPress={() => setShowPromoModal(false)}
                                    style={tw`flex-1 py-3 rounded-full border border-gray-600`}
                                >
                                    <Text style={tw`text-white text-center font-poppinsMedium`}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`flex-1 bg-purple-600 py-3 rounded-full`}>
                                    <Text style={tw`text-white text-center font-poppinsMedium`}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}



                {/* footer confirm btn */}
                <TouchableOpacity
                    style={tw`relative mb-8 mt-16`}
                    onPress={() => {

                    }}
                >
                    <SvgXml xml={IconButton} />
                    <Text
                        style={tw`text-primary absolute flex w-full    text-center  text-lg py-[14px] font-poppinsBold`}
                    >
                        Confirm Booking
                    </Text>
                </TouchableOpacity>

            </ScrollView>

        </View >
    )
}

export default seatPosotion