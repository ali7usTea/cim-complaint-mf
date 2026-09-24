import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI';

export interface ClosureOption {
    closureCode: string;
    closureId: number;
    closureDescription: string;
}

export interface ComplaintCategoryOption {
    complaintCategory: string;
}

export async function fetchMainClosureList(): Promise<ClosureOption[]> {
    try {
        const response = await axios.get(`${proxyURL}/custom/getMainClosureList`);
        return response.data?.data?.rows || [];
    } catch (error) {
        console.error('Error fetching main closure list:', error);
        return [];
    }
}

export async function fetchClosureList(closureParentId?: number): Promise<ClosureOption[]> {
    try {
        const response = await axios.get(`${proxyURL}/custom/getClosureList`, {
            params: closureParentId ? { closureParentId } : {}
        });
        return response.data?.data?.rows || [];
    } catch (error) {
        console.error('Error fetching closure list:', error);
        return [];
    }
}

export async function fetchAuxClosureList(closureParentId?: number): Promise<ClosureOption[]> {
    try {
        const response = await axios.get(`${proxyURL}/custom/getAuxClosureList`, {
            params: closureParentId ? { closureParentId } : {}
        });
        return response.data?.data?.rows || [];
    } catch (error) {
        console.error('Error fetching auxiliary closure list:', error);
        return [];
    }
}

export async function fetchComplaintCategories(): Promise<ComplaintCategoryOption[]> {
    try {
        const response = await axios.get(`${proxyURL}/custom/getComplaintCategories`);
        return response.data?.data?.rows || [];
    } catch (error) {
        console.error('Error fetching complaint categories:', error);
        return [];
    }
}
