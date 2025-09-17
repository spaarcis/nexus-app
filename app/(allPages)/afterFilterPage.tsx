import { ImgGradint } from "@/assets/images/image";
import { Card } from "@/components/shear/Card";
import tw from "@/lib/tailwind";
import { useLazyExplore_gaming_zoneQuery } from "@/redux/apiSlices/exploreApi/exploreApiSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AfterFilterPage = () => {
  const { location, date } = useLocalSearchParams();

  const [explore, setExplore] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [fetchExploreData, { isLoading, isFetching }] =
    useLazyExplore_gaming_zoneQuery();

  // Load data (pagination + filters)
  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;
      if (!hasMore && !isRefresh) return;

      if (!isRefresh) setLoadingMore(true);

      const res = await fetchExploreData({
        page: pageNum,
        location,
        date,
      }).unwrap();

      const responseData = res?.data || {};
      const newPosts = responseData?.data || [];
      const pagination = responseData?.pagination || {};

      if (isRefresh) {
        setExplore(newPosts);
      } else {
        const existingIds = new Set(explore.map((post) => post.id));
        const uniqueNewPosts = newPosts.filter(
          (post: any) => !existingIds.has(post.id)
        );
        setExplore((prev) => [...prev, ...uniqueNewPosts]);
      }

      const currentPage = pagination.current_page || pageNum;
      const lastPage = pagination.last_page || 1;
      setHasMore(currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (err) {
      console.log("Error fetching explore data:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  // Refresh list
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadPosts(1, true);
  };

  // Load more on scroll
  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetching) {
      loadPosts(page);
    }
  };

  useEffect(() => {
    loadPosts(1, true);
  }, [location, date]);

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

      {isLoading && explore.length === 0 ? (
        <ActivityIndicator size="large" color="#342bd3" />
      ) : explore.length > 0 ? (
        <FlatList
          data={explore}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => <Card item={item} />}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#342bd3" />
            ) : null
          }
        />
      ) : (
        <Text style={tw`text-gray-400 text-center mt-10 `}>
          No data found for your filters
        </Text>
      )}
    </View>
  );
};

export default AfterFilterPage;
