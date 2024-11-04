import { useMutation, useQuery } from '@tanstack/react-query';
import { baseInstance } from '../../configs';


// Service function to fetch technicians
const getTechniciansService = async (): Promise<any> => {
    const response = await baseInstance.get('/user/technicians');
    return response.data;
};

// React Query hook to get technicians
export const useGetTechnicians = () => {
    return useQuery({
        queryKey: ['technicians'],
        queryFn: getTechniciansService,
    });
};



const createMissionService = async (missionData: any) => {
    const response = await baseInstance.post('/mission/create', missionData);
    return response.data;
};


export const useCreateMission = () => {
    return useMutation({
        mutationFn: createMissionService,
    });
};
