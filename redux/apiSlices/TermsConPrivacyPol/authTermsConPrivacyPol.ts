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
  }),
});

export const { useTermsConPrivacyPolQuery } = authTermsConPrivacyPol;
