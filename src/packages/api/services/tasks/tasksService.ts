import { useMutation, useQuery } from '@tanstack/react-query';
import { baseInstance } from '../../configs';
import { toast } from 'react-toastify';
import { ErrorResponse } from '../../types';
import { AxiosError } from 'axios';


const getAllTasksService = async () => {
    const response = await baseInstance.get('/tasks/all');
    return response.data;
};

export const useGetAllTasks = () => {
    return useQuery({
        queryKey: ['all-tasks'],
        queryFn: getAllTasksService,
    });
};


export type CreateTaskPayload = {
    title: string;
    key: string;
    category: string[];
    permissionIds: string[];
    fieldIds: string[];
}


const createTaskService = async (taskData: CreateTaskPayload) => {
    const response = await baseInstance.post('/tasks/create', taskData);
    return response.data;
};

export const useCreateTask = () => {

    return useMutation({
        mutationFn: createTaskService,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message)
        },
        onSuccess(res) {
            return res
        }
    });
};

export type UpdateTaskPayload = {
    taskId: number | string;
    taskData: CreateTaskPayload;
};
const updateTaskService = async ({ taskId, taskData }: UpdateTaskPayload) => {
    const response = await baseInstance.put(`/tasks/update/${taskId}`, taskData);
    return response.data;
};

export const useUpdateTask = () => {
    return useMutation({
        mutationFn: updateTaskService,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message);
        },
        onSuccess(res) {
            toast.success('ماموریت به روزرسانی شد!');
            return res;
        },
    });
};

const destroyTaskService = async (id: string) => {
    const response = await baseInstance.delete(`/tasks/destroy/${id}`);
    return response.data;
};

export const useDestroyTask = () => {
    return useMutation({
        mutationFn: destroyTaskService,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message || 'مشکلی پیش آمد');
        },
        onSuccess() {
            toast.info('تسک با موفقیت پاک شد!');
        }
    });
};


// Task Fields
const getAllTaskFieldsService = async () => {
    const response = await baseInstance.get('/tasks/fields');
    return response.data;
};

export const useGetAllTaskFields = () => {
    return useQuery({
        queryKey: ['all-task-fields'],
        queryFn: getAllTaskFieldsService,
    });
};


const getTaskFieldByTaskIdService = async (taskId: string | number) => {
    const response = await baseInstance.get(`/tasks/fields/${taskId}`);
    return response.data;
};

export const useGetTaskFieldByTaskId = (taskId: string | number) => {
    return useQuery({
        queryKey: ['all-task-fields', taskId],
        queryFn: () => getTaskFieldByTaskIdService(taskId),
    });
};


// Define the payload type for creating a task field
export type CreateTaskFieldPayload = {
    key: string;
    title: string;
    type: {
        id: number; 
    };
    required: boolean;
    options?: {
        id?: number;
        title: string;
        value: string;
    }[];
};

const createTaskFieldService = async (taskFieldData: CreateTaskFieldPayload) => {
    const response = await baseInstance.post('/tasks/fields', taskFieldData);
    return response.data;
};

export const useCreateTaskField = () => {
    return useMutation({
        mutationFn: createTaskFieldService,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message || 'مشکلی پیش آمد');
        },
        onSuccess() {
            toast.success('فیلد با موفقیت ایجاد شد!');
        }
    });
};

// Service to update a task field
const updateTaskFieldService = async ({ fieldId, taskFieldData }: { fieldId: number | string; taskFieldData: CreateTaskFieldPayload }) => {
    const response = await baseInstance.put(`/tasks/fields/${fieldId}`, taskFieldData);
    return response.data;
};

// Hook to update a task field
export const useUpdateTaskField = () => {
    return useMutation({
        mutationFn: updateTaskFieldService,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message || 'مشکلی پیش آمد');
        },
        onSuccess() {
            toast.success('فیلد تسک به روزرسانی شد!');
        }
    });
};

// Service to delete a task field
const deleteTaskFieldService = async (id: string) => {
    const response = await baseInstance.delete(`/tasks/fields/${id}`);
    return response.data;
};

// Hook to delete a task field
export const useDeleteTaskField = () => {
    return useMutation({
        mutationFn: deleteTaskFieldService,
        onError(ex: AxiosError<ErrorResponse>) {
            toast.error(ex?.response?.data?.message || 'مشکلی پیش آمد');
        },
        onSuccess() {
            toast.info('فیلد تسک با موفقیت پاک شد!');
        }
    });
};
