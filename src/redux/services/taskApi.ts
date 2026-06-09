import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5050/api/tasks"
    }),
    tagTypes: ["Tasks"],

    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "/get",
            providesTags: ["Tasks"],
        }),

        getSingleTask: builder.query({
            query: (id) => ({
                url: `/get_single/${id}`,
                method: "GET",
            }),
            providesTags: ["Tasks"],
        }),
      
        createTask: builder.mutation({
            query: (body) => ({
                url: "/post",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Tasks"],
        }),
      
        updateTask: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/update_single/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Tasks"],
        }),
      
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `/delete_single/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),
    })
})

export const {
    useGetTasksQuery,
    useGetSingleTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = taskApi