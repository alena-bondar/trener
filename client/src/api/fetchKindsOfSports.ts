import {api} from '../services/api';

export const fetchKindsOfSports = async () => {
    const response = await api
            .get(`/kinds-of-sports`)
            .then((res: any) => ({
                error: null,
                data: res.data,
            }))
            .catch((error: any) => ({
                error: error.message,
                data: null,
            }))

    return response;
}

