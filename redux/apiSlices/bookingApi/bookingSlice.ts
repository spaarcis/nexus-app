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
    user_promo_code: builder.query<any, any>({
      query: (id) => ({
        url: `/user-promo-code?provider_id=${id}`,
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
    // review
    ratings: builder.mutation<any, any>({
      query: (data) => ({
        url: `/ratings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
    booking_new: builder.mutation<any, any>({
      query: (data) => ({
        url: `/booking-new`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
    booking_reschedule: builder.mutation<any, any>({
      query: ({ id, formData }) => {
        return {
          url: `/booking-reschedule/${id}`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useLazyBookingQuery,
  useBooking_detailsQuery,
  useBooking_cancelMutation,
  useRatingsMutation,
  useBooking_newMutation,
  useUser_promo_codeQuery,
  useBooking_rescheduleMutation,
} = bookingSlice;
