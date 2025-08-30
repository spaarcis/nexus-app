import { cardImg } from '@/assets/images/image'
import { IconLoction, IconStar } from '@/Icons/Icons'
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const Card = (data: any) => {
    console.log(data);
    return (
        <TouchableOpacity>
            <View style={tw`relative `}>
                <Image source={cardImg} style={[tw`h-96 w-20 rounded-2xl`, {
                    width: _Width * 0.9,
                    height: _HIGHT * 0.19,

                }]}></Image>
                <View style={tw`flex-row items-center justify-end gap-3 absolute right-5 top-5`}>
                    <SvgXml xml={IconStar} />
                    <Text style={tw`text-primary font-poppinsMedium text-base`}>4.5</Text>
                </View>
                <View style={tw` absolute left-5 bottom-5`}>
                    <Text style={tw`text-primary text-base font-poppinsSemiBold`}>Alpha Esport Zone</Text>
                    <View style={tw`flex-row gap-3 mt-2  items-center `}>
                        <SvgXml xml={IconLoction} />
                        <Text style={tw`text-primary font-poppins `}>Los Angles, USA</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Card