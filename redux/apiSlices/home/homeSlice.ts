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
    game_zone_details: builder.query({
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
      invalidatesTags: ["home", "favorite"],
    }),
    edit_profile: builder.mutation<any, any>({
      query: (data) => ({
        url: `/edit-profile`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUser_profileQuery,
  usePopular_zoneQuery,
  useNext_stationQuery,
  useNewly_addedQuery,
  useGame_zone_detailsQuery,
  useAdd_to_favorite_zoneMutation,
  useEdit_profileMutation,
} = authSlice;
