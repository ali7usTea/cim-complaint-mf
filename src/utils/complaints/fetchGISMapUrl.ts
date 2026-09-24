import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

interface FetchGISMapUrlParams {
    productServiceCode?: string;
    customerCategoryCode?: string;
    valueSegment?: string;
    customerSegment?: string;
    complaintId?: string;
    regionCode?: string;
}

interface GISMapResponse {
    data: {
        gisId: string;
        gisMapURL: string;
    };
    responseCode: string;
    responseMessage: string;
}

export async function fetchGISMapUrl(params: FetchGISMapUrlParams): Promise<string> {
    try {
        // Filter out undefined parameters
        const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, string>);

        const response = await axios.get<GISMapResponse>(`${proxyURL}/custom/getGISMapUrlAndId`, {
            params: filteredParams
        });

        if (response.data.data?.gisMapURL) {
            return response.data.data.gisMapURL;
        }

        console.warn('GIS Map URL not found in response');
        return '';
    } catch (error) {
        console.error('Failed to fetch GIS Map URL:', error);
        return '';
    }
}
