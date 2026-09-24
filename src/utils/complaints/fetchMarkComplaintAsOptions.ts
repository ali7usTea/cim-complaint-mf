import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetchMarkComplaintAsOptions() {
    const response = await axios.get(`${proxyURL}/custom/markComplaintAs`);
    return response.data?.data?.markComplaintAs || [];
}
