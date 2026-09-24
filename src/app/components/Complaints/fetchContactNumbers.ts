import axios from 'axios';
import { proxyURL } from '../../../utils/lib/proxyAPI';

// Fetch contact numbers for a given accountId and productCode
export async function fetchContactNumbers(accountId: string, productCode: string) {
    const url = `${proxyURL}/custom/contactNumbers?accountId=${accountId}&productCode=${productCode}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contact numbers');
    }
}
