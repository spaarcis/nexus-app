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

const Canceled = () => {
  // --- Pagination States ---
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [canceledBookings, setCanceledBookings] = useState<any[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);

  const [fetchCanceledQuery, { isLoading, isFetching }] = useLazyBookingQuery();

  // --- Fetch Data Function ---
  const fetchCanceledBookings = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || isLoadingMore) && !isRefresh) return;
      if (!isRefresh) setIsLoadingMore(true);

      const res = await fetchCanceledQuery({
        page: pageNum,
        type: "Canceled",
      }).unwrap();

      const responseData = res?.data || {};
      const newBookings = responseData?.data || [];
      const pagination = responseData?.pagination || {};

      setCanceledBookings((prev) => {
        if (isRefresh) return newBookings;
        const existingIds = new Set(prev.map((b) => b.id));
        const uniqueBookings = newBookings.filter(
          (b: any) => !existingIds.has(b.id)
        );

        return [...prev, ...uniqueBookings];
      });

      const current = pagination.current_page || pageNum;
      const last = pagination.last_page || 1;
      setHasMorePages(current < last);
      setCurrentPage(current + 1);
    } catch (err) {
      console.log("fetchCanceledBookings error:", err);
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
    fetchCanceledBookings(1, true);
  };

  // --- Handle Load More ---
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMorePages && !isFetching) {
      setIsLoadingMore(true);
      fetchCanceledBookings(currentPage);
    }
  };

  // --- Initial Fetch ---
  useEffect(() => {
    fetchCanceledBookings(1, true);
  }, []);

  return (
    <View>
      {isLoading && canceledBookings.length === 0 ? (
        <View style={tw`pb-10`}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={tw`mb-4`}>
              <BokCardSkeleton />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={canceledBookings}
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
            return <BookingCard data={item} status="Canceled" />;
          }}
          contentContainerStyle={tw`pb-10`}
          ListFooterComponent={
            <View style={tw`py-4 flex justify-center items-center`}>
              {isLoadingMore ? (
                <>
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text style={tw`mt-2 text-gray-500`}>Loading more ...</Text>
                </>
              ) : !hasMorePages && canceledBookings.length > 0 ? (
                <Text style={tw`text-gray-500`}>
                  No more canceled bookings to load
                </Text>
              ) : null}
            </View>
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={tw`py-10 flex justify-center items-center`}>
                <Text style={tw`text-gray-500`}>
                  No canceled bookings found
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default Canceled;
