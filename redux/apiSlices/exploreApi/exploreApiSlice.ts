import { api } from "@/redux/api/baseApi";

// authApiSlices.ts
export const exploreApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    explore_gaming_zone: builder.query({
      query: ({ page }) => ({
        url: `/explore-gaming-zone?page=${page}`,
        method: "GET",
      }),
      providesTags: ["explore"],
    }),
  }),
  overrideExisting: true,
});

export const { useLazyExplore_gaming_zoneQuery, useExplore_gaming_zoneQuery } =
  exploreApiSlice;
