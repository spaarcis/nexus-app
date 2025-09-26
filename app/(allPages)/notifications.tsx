import { ImgGradint } from "@/assets/images/image";
import NotificationsSkeleton from "@/components/skeleton/notificationsSkeleton";
import { IconReadAll } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import {
  useNotificationsQuery,
  useSingle_markMutation,
} from "@/redux/apiSlices/notifications/notificationsSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Image, ImageBackground } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  created_time: string;
  image: string;
  is_read: boolean;
}
const notifications = () => {
  const [singleNotificationId, setSingleNotificationId] = useState();
  const { data: notificationsData, isLoading: notificationsLoading } =
    useNotificationsQuery({});
  const [single_mark] = useSingle_markMutation();

  const singleMarkFnc = async (id: string) => {
    try {
      console.log("Marking notification:", id);
      await single_mark(id).unwrap();
    } catch (error) {
      console.error("Error marking notification:", error);
    }
  };

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity onPress={() => singleMarkFnc(item?.id)}>
      <View
        style={tw` ${
          item.is_read ? "" : "bg-gray-800/50"
        } rounded-xl p-4 mb-3 flex-row items-center`}
      >
        <View
          style={[tw`w-10 h-10 rounded-lg items-center justify-center mr-3`]}
        >
          <Image
            style={tw`h-11 w-11 rounded-lg`}
            source={{ uri: item?.image }}
          />
        </View>
        <View style={tw`flex-1`}>
          <Text style={tw`text-white text-sm leading-5`}>{item.title}</Text>
        </View>
        <Text style={tw`text-gray-400 text-xs ml-2`}>{item?.created_time}</Text>
      </View>
    </TouchableOpacity>
  );
  console.log("singleNotificationId", singleNotificationId);

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
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`flex-row items-center`}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={tw`text-primary text-lg ml-1`}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <SvgXml xml={IconReadAll} />
        </TouchableOpacity>
      </View>
      {notificationsLoading ? (
        <View style={tw`pb-10`}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={tw`mb-4`}>
              <NotificationsSkeleton />
            </View>
          ))}
        </View>
      ) : (
        <View>
          <FlatList
            data={notificationsData?.data?.notifications?.data}
            renderItem={renderNotificationItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-6`}
          />
        </View>
      )}
    </View>
  );
};
export default notifications;
