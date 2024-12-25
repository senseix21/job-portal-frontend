import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const JOB_URL = "/jobs"; // Base URL for job-related operations

export const jobApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // List all jobs with dynamic filters
        listJobs: build.query({
            query: (filters) => {
                // Start with the base URL
                let url = `${JOB_URL}`;

                // Create a URLSearchParams instance to build query parameters
                const params = new URLSearchParams();

                // Add salaryRange filter (e.g., "0-1000000") only if provided
                if (filters?.salaryRange && filters.salaryRange[0] !== undefined && filters.salaryRange[1] !== undefined) {
                    params.append('salaryRange', `${filters.salaryRange[0]}-${filters.salaryRange[1]}`);
                }

                // Add jobType filter only if provided
                if (filters?.jobType) {
                    params.append('jobType', filters.jobType);
                }

                // Add workLocation filter only if provided
                if (filters?.workLocation) {
                    params.append('workLocation', filters.workLocation);
                }

                // Add datePosted filter only if provided
                if (filters?.datePosted) {
                    params.append('datePosted', filters.datePosted);
                }

                // If there are any query parameters, append them to the URL
                if (params.toString()) {
                    url = `${url}?${params.toString()}`;
                }

                return {
                    url,
                    method: "GET",
                };
            },
            providesTags: [tagTypes.JOB], // Cache invalidation tag
        }),

        // Get job details by ID
        jobDetails: build.query({
            query: (id) => ({
                url: `${JOB_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.JOB], // Cache invalidation tag
        }),

        // Create a new job
        createJob: build.mutation({
            query: (data) => ({
                url: `${JOB_URL}`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: [tagTypes.JOB], // Invalidate cache after creation
        }),

        // Update an existing job
        updateJob: build.mutation({
            query: ({ id, data }) => ({
                url: `${JOB_URL}/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: [tagTypes.JOB], // Invalidate cache after update
        }),

        // Delete a job
        deleteJob: build.mutation({
            query: (id) => ({
                url: `${JOB_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.JOB], // Invalidate cache after delete
        }),
    }),
    overrideExisting: true,
});

export const {
    useListJobsQuery,
    useJobDetailsQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobApi;
