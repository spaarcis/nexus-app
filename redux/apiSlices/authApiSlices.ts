import { api } from "../api/baseApi";

// authApiSlices.ts
export const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    user_profile: builder.query({
      query: () => ({
        url: `/profile`,
      }),
      providesTags: ["user"],
    }),
    registerUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["user"],
    }),
    verifyOtp: builder.mutation<any, { email: string; otp: string }>({
      query: (data) => ({
        url: `/auth/otp-verification`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    tokenChecker: builder.query<any, any>({
      query: () => ({
        url: `/auth/check-token`,
      }),
    }),
    loginUser: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    resetPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    change_password: builder.mutation<any, any>({
      query: (data) => ({
        url: `/change-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    socialLogin: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/social-login`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    edit_profile_picture: builder.mutation<any, any>({
      query: (data) => ({
        url: `/edit-profile-picture`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["profile", "user"],
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: `/logout`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["user"],
    }),
    delete_profile: builder.mutation<any, FormData>({
      query: (data) => ({
        url: `/delete-profile`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    edit_profile: builder.mutation<any, any>({
      query: (data) => ({
        url: `/edit-profile`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useUser_profileQuery,
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChange_passwordMutation,
  useSocialLoginMutation,
  useEdit_profile_pictureMutation,
  useLogoutMutation,
  useDelete_profileMutation,
  useTokenCheckerQuery,
  useLazyTokenCheckerQuery,
  useEdit_profileMutation,
} = authSlice;
