import { ImgGradint } from '@/assets/images/image'
import { Card } from '@/components/shear/Card'
import { CarouselCard } from '@/components/shear/Carousel'
import { IconFilter, IconSearch } from '@/Icons/Icons'
import data from "@/lib/data.json"
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { ImageBackground } from 'expo-image'
import React from 'react'
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const Explore = () => {



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
                    backgroundColor: "#000000"

                }}
            />
            {/* Content */}
            <View style={tw`px-5 pt-10`}>
                {/* Title */}
                <Text style={tw`text-white text-2xl font-bold mb-5`}>
                    Explore Gaming Zone
                </Text>

                {/* Search Bar with Filter */}
                <View style={tw`flex-row items-center`}>
                    {/* Search Input */}
                    <View
                        style={tw`flex-row items-center flex-1 bg-white/10 rounded-3xl px-4 py-3`}
                    >
                        <SvgXml xml={IconSearch} />
                        <TextInput
                            placeholder="Search by location"
                            placeholderTextColor="#B0B0B0"
                            style={tw`ml-2 text-white flex-1`}
                        />
                    </View>

                    {/* Filter Button */}
                    <TouchableOpacity
                        style={tw`ml-3 p-3 rounded-full bg-white/10`}
                    >
                        <SvgXml xml={IconFilter} />
                    </TouchableOpacity>

                </View>

                <View style={tw``}>
                    <FlatList
                        data={data}
                        keyExtractor={(item: any) => item.id.toString()} // string এ convert করলাম
                        renderItem={({ item }) => <Card item={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                 <View style={tw` pb-[600px]`}>
                    <CarouselCard />
                </View>
            </View>
        </View>
    )
}

export default Explore