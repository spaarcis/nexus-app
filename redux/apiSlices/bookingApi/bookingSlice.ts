import { api } from "@/redux/api/baseApi";

export const bookingSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    booking: builder.query<any, any>({
      query: ({ type, page }) => ({
        url: `/booking-list?type=${type}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    booking_details: builder.query<any, any>({
      query: (id) => ({
        url: `/booking-details/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    booking_cancel: builder.mutation<any, any>({
      query: (id) => ({
        url: `/booking-cancel/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useLazyBookingQuery,
  useBooking_detailsQuery,
  useBooking_cancelMutation,
} = bookingSlice;
