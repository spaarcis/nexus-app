import { ImgGradint } from '@/assets/images/image'
import { Card } from '@/components/shear/Card'
import data from "@/lib/data.json"
import tw from '@/lib/tailwind'
import { _HIGHT, _Width } from '@/utils/utils'
import { Ionicons } from '@expo/vector-icons'
import { ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'

const favoriteZone = () => {
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
           <View style={tw``}>
                    <FlatList
                        data={data}
                        keyExtractor={(item: any) => item.id.toString()} 
                        renderItem={({ item }) =>  <Card item={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
        </View>
    )
}

export default favoriteZone