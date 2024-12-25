import { Reducer, UnknownAction } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import { CombinedState } from "@reduxjs/toolkit/query";
import { tagTypes } from "../tagTypes";

export const reducer: {
    api: Reducer<CombinedState<{}, tagTypes, "api">, UnknownAction>;
} = {
    [baseApi.reducerPath]: baseApi.reducer,
}
