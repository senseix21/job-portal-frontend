import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { instance } from './axiosInstance';

export const axiosBaseQuery = (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
    {
        url: string;
        method: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
        params?: AxiosRequestConfig['params'];
        headers?: AxiosRequestConfig['headers'];
        meta?: any;
        contentType?: string;
    },
    unknown,
    unknown
> => async ({ url, method, data, params, contentType }) => {
    console.log(baseUrl + url)
    try {
        const result = await instance({
            url: baseUrl + url,
            method,
            data,
            params,
            headers: {
                'Content-Type': contentType || 'application/json',
            },
            withCredentials: true,
        });
        return { data: result.data }; // Make sure the structure is correct
    } catch (axiosError) {
        let err = axiosError as AxiosError;
        return {
            error: {
                success: false,
                message: err?.response?.data,
                errorMessage: 'An unexpected error occurred', // Provide a default error message
            },
        };
    }
};
