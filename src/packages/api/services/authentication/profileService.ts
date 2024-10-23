

import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '../../configs';

const getProfileService = async () => {
    const response = await baseInstance.get('/user/profile');
    return response.data;
};

export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfileService,
    });
};

export const useGetProfileRole = () => {
    const { data } = useGetProfile();

    const role = data?.user?.role;
    const isSuperAdmin = role === import.meta.env.VITE_SUPER_ADMIN_ROLE;
    const isAdmin = role === import.meta.env.VITE_ADMIN_ROLE

    if (isSuperAdmin) return {
        isSuperAdmin,
        profile: data,
        id: 1,
        role,
        title: "مدیریت کل",
    }

    if (isAdmin) return {
        isAdmin,
        profile: data,
        id: 2,
        role,
        title: "مدیریت",
    }
}

