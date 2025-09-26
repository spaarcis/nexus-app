import { api } from "@/redux/api/baseApi";

export const notificationsSlices = api.injectEndpoints({
  endpoints: (builder) => ({
    notifications: builder.query<any, any>({
      query: () => ({
        url: `/notifications`,
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
        // body: { id },
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useNotificationsQuery, useSingle_markMutation } =
  notificationsSlices;
