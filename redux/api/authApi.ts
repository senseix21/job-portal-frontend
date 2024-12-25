import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi"
const AUTH_URL = "/auth";


export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userRegister: build.mutation({
            query: (loginData) => ({
                url: `/register`,
                method: "POST",
                data: loginData
            }),
            invalidatesTags: [tagTypes.USER]
        }),
        userLogin: build.mutation({
            query: (data) => ({
                url: `/login`,
                method: "POST",
                data: data,
            }),
        }),
        userVerifyEmail: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/verify_email`,
                method: "PATCH",
                data: data,
            })
        }),
        userDelete: build.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/delete`,
                method: "DELETE",
                data: data,
            })
        })

    }),
    overrideExisting: true,

})

export const {
    useUserLoginMutation,
    useUserRegisterMutation,
    useUserDeleteMutation,
    useUserVerifyEmailMutation
} = authApi