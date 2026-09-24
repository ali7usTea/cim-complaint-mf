import axios from 'axios';
import { proxyURL } from './lib/proxyAPI';

export async function fetchSubOrders(params: any, isDebugMode?: boolean | string) {
    const response = await axios.get(`${proxyURL}/GetSubRequestsForComplaint`, {
        params: {
            ...(params || {}),
            ...(isDebugMode ? { isDebugMode } : {})
        }
    });
    return response.data;
}
