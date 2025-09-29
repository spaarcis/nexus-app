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
    // In your API slice file (exploreApiSlice.ts)
    check_availability: builder.query<any, any>({
      query: ({ room_id, date, starting_time, duration }) => ({
        url: `/check-availability?room_id=${room_id}&date=${date}&starting_time=${starting_time}&duration=${duration}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});
export const {
  useLazyExplore_gaming_zoneQuery,
  useExplore_gaming_zoneQuery,
  useCheck_availabilityQuery,
  useLazyCheck_availabilityQuery,
} = exploreApiSlice;
