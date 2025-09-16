import { ImgGradint } from "@/assets/images/image";
import { Card } from "@/components/shear/Card";
import tw from "@/lib/tailwind";
import { useLazyFavorite_zoneQuery } from "@/redux/apiSlices/DowerAllApi/authTermsConPrivacyPol";
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

const favoriteZone = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorite, setFavorite] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [fetchFavoriteData, { isLoading, isFetching }] =
    useLazyFavorite_zoneQuery();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;
      setLoadingMore(true);

      const res = await fetchFavoriteData({ page: pageNum }).unwrap();
      console.log(res);

      const responseData = res?.data || {};
      const newPosts = responseData?.data || [];
      const pagination = responseData?.pagination || {};
      console.log(res);
      if (isRefresh) {
        setFavorite(newPosts);
      } else {
        const existingIds = new Set(favorite.map((post) => post.id));
        const uniqueNewPosts = newPosts.filter(
          (post: any) => !existingIds.has(post.id)
        );
        setFavorite((prev) => [...prev, ...uniqueNewPosts]);
      }

      const currentPage = pagination.current_page || pageNum;
      const lastPage = pagination.last_page || 1;

      setHasMore(currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (err) {
      console.log("Error fetching Favorite data:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadPosts(1, true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !isFetching) {
      setLoadingMore(true);
      loadPosts(page);
    }
  };

  useEffect(() => {
    loadPosts(1, true);
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
        style={tw`flex-row items-center  mt-12 mb-6`}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
        <Text style={tw`text-primary text-lg ml-1`}>Back</Text>
      </TouchableOpacity>
      <View style={tw``}>
        <FlatList
          data={favorite}
          keyExtractor={(item, index) => `explore-${item.id}-${index}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Card item={item} />}
          contentContainerStyle={tw`pb-10`}
          ListFooterComponent={
            <View style={tw`py-4 mb-44 flex justify-center items-center`}>
              {loadingMore ? (
                <>
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text style={tw`mt-2 text-gray-500`}>Loading more ...</Text>
                </>
              ) : !hasMore && favorite.length > 0 ? (
                <Text style={tw`text-gray-500`}>No more Explore to load</Text>
              ) : null}
            </View>
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={tw`py-10 flex justify-center items-center`}>
                <Text style={tw`text-gray-500`}>No Explore data found</Text>
              </View>
            ) : null
          }
        />
      </View>
    </View>
  );
};

export default favoriteZone;
