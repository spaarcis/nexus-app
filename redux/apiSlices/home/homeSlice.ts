import { api } from "@/redux/api/baseApi";

// authApiSlices.ts
export const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    user_profile: builder.query({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
    popular_zone: builder.query({
      query: () => ({
        url: `/popular-zone`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
    next_station: builder.query({
      query: () => ({
        url: `/next-station`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
    newly_added: builder.query({
      query: () => ({
        url: `/newly-added`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUser_profileQuery,
  usePopular_zoneQuery,
  useNext_stationQuery,
  useNewly_addedQuery,
} = authSlice;
