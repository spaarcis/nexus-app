import tw from "@/lib/tailwind";
import { useLazyBookingQuery } from "@/redux/apiSlices/bookingApi/bookingSlice";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { BokCardSkeleton } from "../skeleton/BokCardSkeleton";
import BookingCard from "./BookingCard";

const Completed = () => {
  // --- Pagination States ---
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [completedBookings, setCompletedBookings] = useState<any[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);

  const [fetchCompletedQuery, { isLoading, isFetching }] =
    useLazyBookingQuery();

  // --- Fetch Data Function ---
  const fetchCompletedBookings = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || isLoadingMore) && !isRefresh) return;
      setIsLoadingMore(true);

      const res = await fetchCompletedQuery({
        page: pageNum,
        type: "Completed",
      }).unwrap();

      const responseData = res?.data || {};
      const newBookings = responseData?.data || [];
      const pagination = responseData?.pagination || {};

      if (isRefresh) {
        setCompletedBookings(newBookings);
      } else {
        const existingIds = new Set(completedBookings.map((b) => b.id));
        const uniqueBookings = newBookings.filter(
          (b: any) => !existingIds.has(b.id)
        );
        setCompletedBookings((prev) => [...prev, ...uniqueBookings]);
      }

      const current = pagination.current_page || pageNum;
      const last = pagination.last_page || 1;

      setHasMorePages(current < last);
      setCurrentPage(current + 1);
    } catch (err) {
      // handle error silently
    } finally {
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  // --- Handle Pull-to-Refresh ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setHasMorePages(true);
    fetchCompletedBookings(1, true);
  };

  // --- Handle Load More ---
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMorePages && !isFetching) {
      setIsLoadingMore(true);
      fetchCompletedBookings(currentPage);
    }
  };

  // --- Initial Fetch ---
  useEffect(() => {
    fetchCompletedBookings(1, true);
  }, []);

  return (
    <View>
      {isLoading && completedBookings.length === 0 ? (
        <View style={tw`pb-10`}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={tw`mb-4`}>
              <BokCardSkeleton />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={completedBookings}
          keyExtractor={(item, index) => `booking-${item.id}-${index}`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            console.log("completed booking item", item);
            return <BookingCard data={item} />;
          }}
          contentContainerStyle={tw`pb-10`}
          ListFooterComponent={
            <View style={tw`py-4 flex justify-center items-center `}>
              {isLoadingMore ? (
                <>
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text style={tw`mt-2 text-gray-500`}>Loading more ...</Text>
                </>
              ) : !hasMorePages && completedBookings.length > 0 ? (
                <Text style={tw`text-gray-500`}>
                  No more completed bookings
                </Text>
              ) : null}
            </View>
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={tw`py-10 flex justify-center items-center`}>
                <Text style={tw`text-gray-500`}>
                  No completed bookings found
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default Completed;
