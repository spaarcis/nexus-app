import { ImgGradint } from "@/assets/images/image"
import { IconReadAll } from "@/Icons/Icons"
import tw from "@/lib/tailwind"
import { _HIGHT, _Width } from "@/utils/utils"
import { Ionicons } from "@expo/vector-icons"
import { ImageBackground } from "expo-image"
import { router } from "expo-router"
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import { SvgXml } from "react-native-svg"

interface NotificationItem {
    id: string
    icon: string
    iconColor: string
    title: string
    time: string
}

const notificationData: NotificationItem[] = [
    {
        id: "1",
        icon: "gift",
        iconColor: "#8B5CF6",
        title: "You earned a promo code.",
        time: "09:00 AM",
    },
    {
        id: "2",
        icon: "checkmark-circle",
        iconColor: "#3B82F6",
        title: "Your booking has been confirmed at Delta Station.",
        time: "09:00 AM",
    },
    {
        id: "3",
        icon: "calendar",
        iconColor: "#10B981",
        title: "Your seat has been successfully rescheduled at Play Arena.",
        time: "09:00 AM",
    },
    {
        id: "4",
        icon: "close-circle",
        iconColor: "#EF4444",
        title: "Your booking at Delta Station has been cancelled.",
        time: "11/20/25",
    },
    {
        id: "5",
        icon: "checkmark-circle",
        iconColor: "#3B82F6",
        title: "Your booking has been confirmed at Delta Station.",
        time: "09:00 AM",
    },
    {
        id: "6",
        icon: "calendar",
        iconColor: "#10B981",
        title: "Your seat has been successfully rescheduled at Play Arena.",
        time: "09:00 AM",
    },
    {
        id: "7",
        icon: "close-circle",
        iconColor: "#EF4444",
        title: "Your booking at Delta Station has been cancelled.",
        time: "11/20/25",
    },
]

const notifications = () => {
    const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
        <View style={tw`bg-gray-800/50 rounded-xl p-4 mb-3 flex-row items-center`}>
            <View
                style={[tw`w-10 h-10 rounded-lg items-center justify-center mr-3`, { backgroundColor: item.iconColor + "20" }]}
            >
                <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
            </View>
            <View style={tw`flex-1`}>
                <Text style={tw`text-white text-sm leading-5`}>{item.title}</Text>
            </View>
            <Text style={tw`text-gray-400 text-xs ml-2`}>{item.time}</Text>
        </View>
    )

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
                    backgroundColor: "#000000",
                }}
            />
            {/* Header */}
            <View style={tw`flex-row items-center justify-between mt-12 mb-6`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`flex-row items-center`}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                    <Text style={tw`text-primary text-lg ml-1`}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <SvgXml xml={IconReadAll} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={notificationData}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={tw`pb-6`}
            />
        
        </View>
    )
}

export default notifications
