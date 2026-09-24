import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export async function fetchPreferredLanguages() {
    const response = await axios.get(`${proxyURL}/settings`);
    // The API returns a string like "Arabic,English" for the key
    const langs = response.data['activitysystem.prefered.languages'];
    if (!langs) return [];
    return langs?.split(',')?.map((l: string) => l.trim());
}
