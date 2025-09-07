import tw from '@/lib/tailwind'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, View } from 'react-native'

const CustomButton = ({title}: any) => {
    return (
        <View style={tw`w-full rounded-full overflow-hidden `}>
            <LinearGradient
                colors={["#6523E7", "#023CE3", "#6523E7"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text
                    style={tw`text-primary  flex w-full text-center text-lg py-[14px] font-poppinsBold`}
                >
                   {title}
                </Text>
            </LinearGradient>
        </View>
    )
}

export default CustomButton