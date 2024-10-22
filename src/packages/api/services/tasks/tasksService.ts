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