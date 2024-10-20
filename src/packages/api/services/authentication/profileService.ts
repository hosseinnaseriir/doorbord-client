

import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '../../configs';

const getProfileService = async () => {
    const response = await baseInstance.get('/user/profile');
    return response.data;
};

export const useGetProfile = () => {
    return useQuery({
        queryKey:['profile'],
        queryFn: getProfileService,
    });
};

