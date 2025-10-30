import { api } from "@/redux/api/baseApi";
import { IRoomDetailsResponse } from "@/redux/interface/interface";

// authApiSlices.ts
export const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    popular_zone: builder.query({
      query: ({ page }) => ({
        url: `/popular-zone?page=${page}`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
    next_station: builder.query({
      query: () => ({
        url: `/next-station`,
        method: "GET",
      }),
      providesTags: ["home", "booking", "cancel", "next_station"],
    }),
    newly_added: builder.query({
      query: ({ page }) => ({
        url: `/newly-added?page=${page}`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),
    game_zone_details: builder.query<IRoomDetailsResponse, any>({
      query: ({ id }) => ({
        url: `/game-zone-details/${id}`,
        method: "GET",
      }),
      providesTags: ["home", "favorite"],
    }),
    add_to_favorite_zone: builder.mutation({
      query: (data) => ({
        url: `/add-to-favorite-zone`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["home", "addFavorite"],
    }),
    // edit_profile: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: `/edit-profile`,
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ["profile", "user", "home"],
    // }),
  }),
});

export const {
  usePopular_zoneQuery,
  useLazyPopular_zoneQuery,
  useNext_stationQuery,
  useNewly_addedQuery,
  useGame_zone_detailsQuery,
  useLazyNewly_addedQuery,
  useAdd_to_favorite_zoneMutation,
} = authSlice;
