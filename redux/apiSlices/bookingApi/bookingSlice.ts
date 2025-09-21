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
  }),
});

export const { useLazyBookingQuery } = bookingSlice;
