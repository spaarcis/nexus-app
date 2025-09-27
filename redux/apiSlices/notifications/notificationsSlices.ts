import { api } from "@/redux/api/baseApi";

export const notificationsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    notifications: builder.query<any, any>({
      query: (params = {}) => ({
        url: `/notifications?page=${params.page || 1}`,
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    single_mark: builder.mutation<any, any>({
      query: (id) => ({
        url: `/mark-notification/${id}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["notification"],
    }),
    mark_all_notification: builder.mutation<any, void>({
      query: () => ({
        url: `/mark-all-notification`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useNotificationsQuery,
  useLazyNotificationsQuery,
  useSingle_markMutation,
  useMark_all_notificationMutation,
} = notificationsSlices;
