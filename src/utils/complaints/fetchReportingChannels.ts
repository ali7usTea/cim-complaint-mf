import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetchReportingChannels({ sourceChannelId, categoryCode }: { sourceChannelId?: string | number; categoryCode?: string }) {
    try {
        const response = await axios.get(`${proxyURL}/custom/reportingChannel`, { params: {categoryCode,sourceChannelId} });
        return response.data?.data?.reportingChannel || [];
    } catch (error) {
        console.error('Failed to fetch reporting channels:', error);
        return [];
    }
}
