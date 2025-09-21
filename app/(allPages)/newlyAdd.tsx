import { ImgGradint } from "@/assets/images/image";
import { Card } from "@/components/shear/Card";
import tw from "@/lib/tailwind";
import { useLazyNewly_addedQuery } from "@/redux/apiSlices/home/homeSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const NewlyAddedZones = () => {
  // --- Pagination States ---
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [newlyAddedZones, setNewlyAddedZones] = useState<any[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const [fetchNewlyAddedZones, { isLoading, isFetching }] =
    useLazyNewly_addedQuery();

  // --- Fetch Data Function ---
  const fetchZones = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || isLoadingMore) && !isRefresh) return;
      setIsLoadingMore(true);

      const res = await fetchNewlyAddedZones({ page: pageNum }).unwrap();
      const responseData = res?.data || {};
      const newZones = responseData?.data || [];
      const pagination = responseData?.pagination || {};

      if (isRefresh) {
        setNewlyAddedZones(newZones);
      } else {
        const existingIds = new Set(newlyAddedZones.map((zone) => zone.id));
        const uniqueZones = newZones.filter(
          (zone: any) => !existingIds.has(zone.id)
        );
        setNewlyAddedZones((prev) => [...prev, ...uniqueZones]);
      }

      const current = pagination.current_page || pageNum;
      const last = pagination.last_page || 1;

      setHasNextPage(current < last);
      setCurrentPage(current + 1);
    } catch (err) {
    } finally {
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  // --- Handle Pull-to-Refresh ---
  const onRefresh = () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setHasNextPage(true);
    fetchZones(1, true);
  };

  // --- Handle Load More ---
  const onLoadMore = () => {
    if (!isLoadingMore && hasNextPage && !isFetching) {
      setIsLoadingMore(true);
      fetchZones(currentPage);
    }
  };

  // --- Initial Fetch ---
  useEffect(() => {
    fetchZones(1, true);
  }, []);

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
      <TouchableOpacity
        onPress={() => router.back()}
        style={tw`flex-row items-center mt-12 mb-6`}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
        <Text style={tw`text-primary text-lg ml-1`}>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={newlyAddedZones}
        keyExtractor={(item, index) => `zone-${item.id}-${index}`}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerStyle={tw`pb-10`}
        ListFooterComponent={
          <View style={tw`py-4 mb-44 flex justify-center items-center`}>
            {isLoadingMore ? (
              <>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={tw`mt-2 text-gray-500`}>Loading more ...</Text>
              </>
            ) : !hasNextPage && newlyAddedZones.length > 0 ? (
              <Text style={tw`text-gray-500`}>No more zones to load</Text>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={tw`py-10 flex justify-center items-center`}>
              <Text style={tw`text-gray-500`}>No newly added zones found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default NewlyAddedZones;
