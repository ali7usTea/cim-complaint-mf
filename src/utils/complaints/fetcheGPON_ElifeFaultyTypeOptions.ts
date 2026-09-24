import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetcheGPON_ElifeFaultyTypeOptions(prodCode: string) {
    try {
        const response = await axios.get(`${proxyURL}/custom/getElifeFaultyType?productCode=${prodCode}`);
        return response.data?.data?.elifeFaultyType || [];
    } catch (error) {
        console.error('Failed to fetch GPON Elife Faulty Type options:', error);
        return [];
    }
}
