import axios from 'axios';
import { proxyURL } from '../../../utils/lib/proxyAPI';

export async function fetchPreferredTimes() {
    try {
        const response = await axios.get(`${proxyURL}/custom/preferredTime`);
        return (
            response.data?.data?.preferredTime?.map((item: any) => ({
                label: item.productCode,
                value: item.productCode
            })) || []
        );
    } catch (error) {
        console.error('Failed to fetch preferred times:', error);
        return [];
    }
}
