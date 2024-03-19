import axios from "axios";

export const Base_url = 'http://192.168.29.152:6003';
// export const Base_url = 'https://marketjourney.in';

interface ApiCallResponse {
    status?: number;
    data?: any;
    message?: string;
}

export const ApiCall = async (method: string, endPoint: string, data?: any, params?: any, content_type: string = 'application/json'): Promise<ApiCallResponse | Error> => {
    try {
        let token: any = sessionStorage.getItem('User');
        const res = await axios({
            method: method,
            url: `${Base_url}${endPoint}`,
            data: data,
            params: params,
            headers: {
                'Content-Type': content_type ?? 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
        });
        return {
            status: res?.status,
            data: res.data,
            message: res.data?.message || '',
        };
    } catch (error: any) {
        console.error(error.response ? error.response.data.message : 'Internal Server Error');
        throw error;
    }
};
