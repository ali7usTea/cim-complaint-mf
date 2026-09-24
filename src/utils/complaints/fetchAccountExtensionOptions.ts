import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetchAccountExtensionOptions(accountId: string) {
    try {
        const response = await axios.get(`${proxyURL}/custom/accountExtension?accountId=${accountId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch AccountExtensions options:', error);
        return [];
    }
}
