import { nextStation } from '@/assets/images/image'
import { IconCleander, Iconhoure, IconLoction, IconTime } from '@/Icons/Icons'
import tw from '@/lib/tailwind'
import { BlurView } from 'expo-blur'
import { Image } from 'expo-image'
import React from 'react'
import { Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const BookingCard = (data: any) => {
    console.log(data);
    
    return (
        <View style={tw`mb-4`}>
            <BlurView style={tw` p-5 border  rounded-3xl overflow-hidden flex-row items-center gap-4`} intensity={10} tint="light">
                <Image source={nextStation} style={[tw`h-20 w-20 rounded-2xl`, {

                }]}></Image>
                <View style={tw`flex-1 items-start  justify-center`}>
                    <Text style={tw`text-white font-bold text-lg`}>
                        Mumba Esport House
                    </Text>

                    {/* Date and Time */}
                    <View style={tw`flex-row items-center mt-2 gap-2`}>
                        <SvgXml xml={IconCleander} />
                        <Text style={tw`text-white ml-2`}>9 June, 2025</Text>
                        <SvgXml xml={IconTime} />
                        <Text style={tw`text-white ml-1`}>10:00 AM</Text>
                    </View>

                    {/* Duration and Location */}
                    <View style={tw`flex-row items-center mt-2 gap-2`}>
                        <SvgXml xml={Iconhoure} />
                        <Text style={tw`text-white ml-2`}>2 - Hour</Text>
                        <SvgXml xml={IconLoction} />
                        <Text style={tw`text-white ml-1`}>New York, USA</Text>
                    </View>
                </View>
            </BlurView>
        </View>
    )
}

export default BookingCard