import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetchRegions() {
    const response = await axios.get(`${proxyURL}/custom/regionsByStatus`);
    // The API returns an array of region objects
   return response.data?.data?.regions || []
}
