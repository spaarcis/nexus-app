import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';
import tw from '@/lib/tailwind';
import { ImgGradint, profileImg } from '@/assets/images/image';
import { _HIGHT, _Width } from '@/utils/utils';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { IconButton, IconDower, IconExploreBanner, IconHand, IconLoction, IconNotification } from '@/Icons/Icons';
import { Image } from "expo-image"
import { BlurView } from 'expo-blur';

const Home = () => {

    const navigation = useNavigation();

    return (
        <View>  {/* Background Image */}
            <ImageBackground
                source={ImgGradint}
                resizeMode="cover"
                style={{
                    width: _Width,
                    height: _HIGHT,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "#000000"

                }}
            />

            <ScrollView contentContainerStyle={tw` px-6 py-9 `}>
                {/* header */}
                <View>
                    <View style={tw`flex-row items-center justify-between  gap-3`}>
                        <View style={tw`flex-row items-center gap-3`}>
                            <TouchableOpacity
                                onPress={() => {
                                    (navigation as any)?.openDrawer();
                                }}
                            >
                                <SvgXml xml={IconDower} />
                            </TouchableOpacity>
                            <Text style={tw`text-primary font-poppinsSemiBold text-3xl`}>Hi, Suuu</Text>
                            <SvgXml xml={IconHand} />
                        </View>
                        <View style={tw`flex-row gap-3 mt-2  items-center `}>
                            <SvgXml xml={IconNotification} />
                            <Image source={profileImg} height={40} width={40} />
                        </View>
                    </View>
                    <View style={tw`flex-row gap-3 mt-2  items-center px-7`}>
                        <SvgXml xml={IconLoction} />
                        <Text style={tw`text-secondary font-poppins `}>Los Angles, USA</Text>
                    </View>
                </View>
                {/* Explore banner */}
                <View style={tw`text-primary overflow-hidden rounded-2xl`}>
                    <BlurView style={tw` p-5`} intensity={10} tint="light">
                        <Text style={tw`text-primary text-xl font-poppinsSemiBold text-center`}>
                            Explore Gaming Rooms.
                            Find setups near you by game, time or location.</Text>

                        {/* <TouchableOpacity
                            style={tw` relative`}

                        >
                            <SvgXml xml={IconButton} width={330} />
                            <View style={tw`flex-row`}>

                                <SvgXml xml={IconExploreBanner} width={330} />
                                <Text
                                    style={tw`text-primary  flex w-full text-center text-lg py-[14px] font-poppinsBold`}
                                >
                                    Explore
                                </Text>

                            </View>
                        </TouchableOpacity> */}
                    </BlurView>
                </View>
            </ScrollView>

        </View>
    )
}

export default Home