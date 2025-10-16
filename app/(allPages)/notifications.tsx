import {
  useLazyNotificationsQuery,
  useMark_all_notificationMutation,
  useSingle_markMutation,
} from "@/redux/apiSlices/notifications/notificationsSlices";
import { _HIGHT, _Width } from "@/utils/utils";
import { Image, ImageBackground } from "expo-image";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { IconReadAll } from "@/Icons/Icons";
import { ImgGradint } from "@/assets/images/image";
import NotificationsSkeleton from "@/components/skeleton/notificationsSkeleton";
import tw from "@/lib/tailwind";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SvgXml } from "react-native-svg";

interface NotificationItem {
  id: string;
  icon: string;
  title: string;
  created_time: string;
  image: string;
  is_read: boolean;
}

const Notifications = () => {
  // Pagination state
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [singleNotificationId, setSingleNotificationId] = useState();
  const [fetchNotifications, { isLoading, isFetching }] =
    useLazyNotificationsQuery();
  const [single_mark] = useSingle_markMutation();
  const [mark_all_notification] = useMark_all_notificationMutation();

  // Load notifications function
  const loadNotifications = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;

      setLoadingMore(true);
      const res = await fetchNotifications({
        page: pageNum,
      }).unwrap();

      const responseData = res?.data || {};
      const notificationsData = responseData?.notifications || {};
      const newNotifications = notificationsData?.data || [];
      const pagination = notificationsData || {};

      if (isRefresh) {
        setNotifications(newNotifications);
      } else {
        const existingIds = new Set(
          notifications.map((notification) => notification.id)
        );
        const uniqueNewNotifications = newNotifications.filter(
          (notification: any) => !existingIds.has(notification.id)
        );
        setNotifications((prev) => [...prev, ...uniqueNewNotifications]);
      }

      const currentPage = pagination.current_page || pageNum;
      const lastPage = pagination.last_page || 1;

      setHasMore(currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (error) {
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadNotifications(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetching) {
      setLoadingMore(true);
      loadNotifications(page);
    }
  };

  useEffect(() => {
    loadNotifications(1, true);
  }, []);

  const singleMarkFnc = async (id: string) => {
    try {
      console.log("Marking notification:", id);
      await single_mark(id).unwrap();

      // Update local state to mark as read
      setNotifications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_read: true } : item))
      );
    } catch (error: any) {
      console.error("Error marking notification:", error);
    }
  };

  const hendelReadAll = async () => {
    try {
      console.log("clicked");
      const res = await mark_all_notification().unwrap();
      console.log("Response:", res);

      // Update all notifications to read in local state
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, is_read: true }))
      );
    } catch (error: any) {
      router.push({
        pathname: "/Toaster",
        params: { res: error?.message },
      });
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
      <View style={tw`flex-row items-center justify-between mt-8 mb-6`}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={tw`flex-row items-center`}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={tw`text-primary text-lg ml-1`}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={hendelReadAll}>
          <SvgXml xml={IconReadAll} />
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `notification-${item.id}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#0000ff"]}
            tintColor="#0000ff"
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        renderItem={renderNotificationItem}
        contentContainerStyle={tw`pb-10`}
        ListFooterComponent={
          <View style={tw`py-4 mb-20 flex justify-center items-center`}>
            {loadingMore ? (
              <>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={tw`mt-2 text-gray-500`}>
                  Loading more notifications...
                </Text>
              </>
            ) : !hasMore && notifications.length > 0 ? (
              <Text style={tw`text-gray-500`}>
                No more notifications to load
              </Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          !isLoading && !refreshing ? (
            <View style={tw`py-10 flex justify-center items-center`}>
              <Text style={tw`text-gray-500`}>No notifications found</Text>
            </View>
          ) : null
        }
      />

      {/* Loading Skeleton */}
      {isLoading && !refreshing && (
        <View style={tw`pb-10`}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={tw`mb-4`}>
              <NotificationsSkeleton />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Notifications;
