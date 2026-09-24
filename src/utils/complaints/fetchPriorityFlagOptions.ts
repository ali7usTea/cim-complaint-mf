import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetchPriorityFlagOptions() {
    try {
        const response = await axios.get(`${proxyURL}/custom/priorityFlag`);
        return response.data?.data?.priorityFlags || [];
    } catch (error) {
        console.error('Failed to fetch priority flag options:', error);
        return [];
    }
}
