import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetchSuspectedOutages() {
    const response = await axios.get(`${proxyURL}/custom/suspectedOutage`);
    // The API returns an array of outage objects
    return response.data?.data?.suspectedOutage || [];
}
