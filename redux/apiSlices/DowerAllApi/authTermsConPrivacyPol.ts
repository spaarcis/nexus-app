import { api } from "@/redux/api/baseApi";

export const authTermsConPrivacyPol = api.injectEndpoints({
  endpoints: (builder) => ({
    TermsConPrivacyPol: builder.query<any, any>({
      query: (type) => ({
        url: `/pages?type=${type}`,
        method: "GET",
      }),
      providesTags: ["TermsConPrivacyPol"],
    }),
    favorite_zone: builder.query<any, any>({
      query: ({ page }) => ({
        url: `/favorite-zone?per_page=5&page=${page}`,
        method: "GET",
      }),
      providesTags: ["TermsConPrivacyPol"],
    }),
  }),
});

export const {
  useTermsConPrivacyPolQuery,
  useFavorite_zoneQuery,
  useLazyFavorite_zoneQuery,
} = authTermsConPrivacyPol;
