import { ImgGradint, profileImg } from '@/assets/images/image';
import BookingCard from '@/components/Booking/BookingCard';
import { CarouselCard } from '@/components/shear/Carousel';
import { IconButtonExp, IconDower, IconHand, IconLoction, IconNotification, IconSeaall } from '@/Icons/Icons';
import tw from '@/lib/tailwind';
import { _HIGHT, _Width } from '@/utils/utils';
import { BlurView } from 'expo-blur';
import { Image } from "expo-image";
import { useNavigation } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

const Home = () => {

    const navigation = useNavigation();

    return (
        <View style={tw` flex-1`}>  {/* Background Image */}
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
                <View style={tw`text-primary overflow-hidden rounded-2xl mt-10`}>
                    <BlurView style={tw` p-5`} intensity={10} tint="light">
                        <Text style={tw`text-primary text-xl font-poppinsSemiBold text-center`}>
                            Explore Gaming Rooms.
                            Find setups near you by game, time or location.</Text>

                        <TouchableOpacity
                            style={tw` mt-4`}
                        >
                            <SvgXml xml={IconButtonExp} width={330} />

                        </TouchableOpacity>
                    </BlurView>
                </View>
                {/* Carousel  Popular Zone  */}
                <View style={tw`flex-row items-center justify-between pt-6 `}>
                    <Text style={tw`text-primary text-lg font-poppinsBold`}>
                        Popular Zone
                    </Text>
                    <TouchableOpacity>
                        <SvgXml xml={IconSeaall} />
                    </TouchableOpacity>
                </View>
                <CarouselCard />
                <View style={[tw``, {
                    width: _Width * 0.3
                }]}>
                </View>
                <Text style={tw`text-primary py-3 text-lg font-poppinsBold`}>
                    Your Next Station
                </Text>
                {/* Your Next Station */}
                <BookingCard />
                {/* Carousel Newly Added */}
                <View style={tw`flex-row items-center justify-between`}>
                    <Text style={tw`text-primary py-3 text-lg font-poppinsBold`}>
                        Newly Added
                    </Text>
                    <TouchableOpacity>
                        <SvgXml xml={IconSeaall} />
                    </TouchableOpacity>
                </View>

                <View style={tw`mb-32`}>
                    <CarouselCard />
                </View>
            </ScrollView>
        </View>
    )
}

export default Home
