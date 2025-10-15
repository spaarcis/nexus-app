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

const Upcoming = () => {
  // --- Pagination States ---
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [hasMorePages, setHasMorePages] = useState<boolean>(true);

  const [triggerBookingQuery, { isLoading, isFetching }] =
    useLazyBookingQuery();

  // --- Fetch Data Function ---
  const fetchUpcomingBookings = async (pageNum = 1, isRefresh = false) => {
    try {
      if ((isLoading || isFetching || isLoadingMore) && !isRefresh) return;
      setIsLoadingMore(true);

      const res = await triggerBookingQuery({
        page: pageNum,
        type: "Upcoming",
      }).unwrap();
      const responseData = res?.data || {};
      const newBookings = responseData?.data || [];
      const pagination = responseData?.pagination || {};

      if (isRefresh) {
        setUpcomingBookings(newBookings);
      } else {
        const existingIds = new Set(upcomingBookings.map((b) => b.id));
        const uniqueBookings = newBookings.filter(
          (b: any) => !existingIds.has(b.id)
        );
        setUpcomingBookings((prev) => [...prev, ...uniqueBookings]);
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
    fetchUpcomingBookings(1, true);
  };

  // --- Handle Load More ---
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMorePages && !isFetching) {
      setIsLoadingMore(true);
      fetchUpcomingBookings(currentPage);
    }
  };

  // --- Initial Fetch ---
  useEffect(() => {
    fetchUpcomingBookings(1, true);
  }, []);

  return (
    <View>
      {isLoading && upcomingBookings.length === 0 ? (
        <View style={tw`pb-10`}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={tw`mb-4`}>
              <BokCardSkeleton />
            </View>
          ))}
        </View>
      ) : (
        <FlatList
          data={upcomingBookings}
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
          renderItem={({ item }) => <BookingCard data={item} />}
          contentContainerStyle={tw`pb-10`}
          ListFooterComponent={
            <View style={tw`py-4 flex justify-center items-center`}>
              {isLoadingMore ? (
                <>
                  <ActivityIndicator size="small" color="#0000ff" />
                  <Text style={tw`mt-2 text-gray-500`}>Loading more ...</Text>
                </>
              ) : !hasMorePages && upcomingBookings.length > 0 ? (
                <Text style={tw`text-gray-500`}>No more bookings to load</Text>
              ) : null}
            </View>
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={tw`py-10 flex justify-center items-center`}>
                <Text style={tw`text-gray-500`}>
                  No upcoming bookings found
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default Upcoming;
