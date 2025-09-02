import { ImgGradint, ImgLogo } from "@/assets/images/image"
import { IconLogo } from "@/Icons/Icons"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { router } from "expo-router"
import React, { useEffect } from "react"
import { ActivityIndicator, Image, ImageBackground, View } from "react-native"
import { SvgXml } from "react-native-svg"

export default function Index() {
    useEffect(() => {
        const t = setTimeout(() => {
            // router.replace("/Main/home/home")
            router.replace("/(allPages)/seatPosotion")
            // router.replace("/Main/home/home")
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
                    <Image
                        source={ImgLogo}
                        resizeMode="contain"
                        style={{
                            width: (_Width || 400) * 0.2,
                            height: 76
                        }}
                    />
                    <SvgXml xml={IconLogo} />
                </View>
                <ActivityIndicator color="#cdd3ff" size="large" />
            </View>
        </View>
    )
}
