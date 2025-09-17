import { api } from "@/redux/api/baseApi";

export const exploreApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    explore_gaming_zone: builder.query<any, any>({
      query: ({ page = 1, search, location, date }) => {
        let url = `/explore-gaming-zone?page=${page}`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }
        if (location) {
          url += `&location=${encodeURIComponent(location)}`;
        }
        if (date) {
          url += `&date=${encodeURIComponent(date)}`;
        }
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["explore"],
    }),
  }),
  overrideExisting: true,
});
export const { useLazyExplore_gaming_zoneQuery, useExplore_gaming_zoneQuery } =
  exploreApiSlice;
