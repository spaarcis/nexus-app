import { cardImg } from '@/assets/images/image'
import { IconLoction, IconStar } from '@/Icons/Icons'
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Image } from 'expo-image'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export const Card = ({ item }: any) => {
    if (!item) return null; // extra safety

    console.log("Card item 👉", item);

    return (
        <TouchableOpacity style={tw`py-3 `}>
            <View style={tw`relative `}>
                {/* Background Image */}
                <Image
                    source={cardImg}
                    style={[
                        tw`rounded-2xl`,
                        {
                            width: _Width * 0.9,
                            height: _HIGHT * 0.19,
                        },
                    ]}
                />

                {/* Rating top-right */}
                <View style={tw`flex-row items-center justify-end gap-2 absolute right-5 top-5`}>
                    <SvgXml xml={IconStar} />
                    <Text style={tw`text-primary font-poppinsMedium text-base`}>
                        {item.rating}
                    </Text>
                </View>

                {/* Title + Location bottom-left */}
                <View style={tw`absolute left-5 bottom-5 `}>
                    <Text style={tw`text-primary text-base font-poppinsSemiBold`}>
                        {item.title}
                    </Text>
                    <View style={tw`flex-row gap-2 mt-2 items-center`}>
                        <SvgXml xml={IconLoction} />
                        <Text style={tw`text-primary font-poppins`}>
                            {item.location}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
