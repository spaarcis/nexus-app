import React, { useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ImageBackground } from "react-native"
import { router } from "expo-router"
import tw from "@/lib/tailwind"
import { ImgGradint, ImgLogo } from "@/assets/images/image"
import { _HIGHT, _Width } from "@/utils/utils"
import { SvgXml } from "react-native-svg"
import { IconLogo } from "@/Icons/Icons"

export default function Index() {
    useEffect(() => {
        const t = setTimeout(() => {
            router.replace("/Login")
        }, 2000)
        return () => clearTimeout(t)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            {/* Background Image */}
            <ImageBackground
                source={ImgGradint}
                resizeMode="cover" 
                style={{
                    width: _Width,
                    height: _HIGHT,
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
            />

            {/* Foreground Content */}
            <View style={tw`flex-1 py-16 justify-between items-center`}>
                <View></View>
                <View style={tw`flex-row items-center gap-3`}>
                    <SvgXml xml={IconLogo} />
                    <Image
                        source={ImgLogo}
                        resizeMode="contain"
                        style={{
                            width: (_Width || 400) * 0.2,
                            height: 76
                        }}
                    />
                </View>
                <ActivityIndicator color="#cdd3ff" size="large" />
            </View>
        </View>
    )
}
