import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '../../configs';



const getAllTasksService = async () => {
    const response = await baseInstance.get('/tasks/all');
    return response.data;
};

export const useGetAllTasks = () => {
    return useQuery({
        queryKey:['all-tasks'],
        queryFn: getAllTasksService,
    });
};

