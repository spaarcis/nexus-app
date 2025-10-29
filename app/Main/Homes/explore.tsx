import { ImgGradint } from "@/assets/images/image";
import { Card } from "@/components/shear/Card";
import { IconFilter, IconSearch } from "@/Icons/Icons";
import tw from "@/lib/tailwind";
import { useLazyExplore_gaming_zoneQuery } from "@/redux/apiSlices/exploreApi/exploreApiSlice";
import { _HIGHT, _Width } from "@/utils/utils";
import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const Explore = () => {
  const [text, setText] = useState("");
  // pagenation start
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [explore, setExplore] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [fetchExploreData, { isLoading, isFetching }] =
    useLazyExplore_gaming_zoneQuery();

  const loadPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || loadingMore) && !isRefresh) return;
      setLoadingMore(true);

      const res = await fetchExploreData({
        page: pageNum,
        search: text,
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
  // pagenation end
  const handleSearch = (value: string) => {
    setText(value);
    setPage(1);
    setHasMore(true);
    loadPosts(1, true);
  };

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
          backgroundColor: "#000000",
        }}
      />
      {/* Content */}
      <View style={tw`px-5 pt-10`}>
        {/* Title */}
        <Text style={tw`text-white text-2xl font-poppinsBold mb-5`}>
          Explore Gaming Zone
        </Text>

        {/* Search Bar with Filter */}
        <View style={tw`flex-row items-center mb-5`}>
          {/* Search Input */}
          <View
            style={tw`flex-row items-center flex-1 bg-white/10 rounded-3xl px-4 py-2 `}
          >
            <SvgXml xml={IconSearch} />
            <TextInput
              placeholder="Search by gaming zone name"
              placeholderTextColor="#B0B0B0"
              value={text}
              style={tw`ml-1 text-white flex-1`}
              onChangeText={(val) => handleSearch(val)}
            />
          </View>

          {/* Filter Button */}
          <TouchableOpacity
            style={tw`ml-3 p-3 rounded-full bg-white/10`}
            onPress={() => router.push("/(allPages)/filter")}
          >
            <SvgXml xml={IconFilter} />
          </TouchableOpacity>
        </View>

        <View style={tw``}>
          <FlatList
            data={explore}
            keyExtractor={(item, index) => `explore-${item.id}-${index}`}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <Card item={item} />}
            contentContainerStyle={tw`pb-10`}
            ListFooterComponent={
              <View
                style={tw`py-4 mb-[300px] flex justify-center items-center `}
              >
                {loadingMore ? (
                  <>
                    <ActivityIndicator size="small" color="#0000ff" />
                    <Text style={tw`mt-2 text-gray-500`}>Loading more ...</Text>
                  </>
                ) : !hasMore && explore.length > 0 ? (
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
    </View>
  );
};

export default Explore;
