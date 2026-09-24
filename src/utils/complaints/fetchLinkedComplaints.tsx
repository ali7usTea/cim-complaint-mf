import axios from "axios";
import { BffPreviousComplaintsResponse } from "./dto";
import { proxyURL } from "../lib/proxyAPI";
import { ComplaintCategory, ComplaintCategoryDto } from "../../app/components/Complaints";

export async function fetchPreviousComplaints(accountID: string, captureMode: string, currentActivityId: string): Promise<BffPreviousComplaintsResponse> {
    try {
        const response = await axios.get<BffPreviousComplaintsResponse>(`${proxyURL}/custom/getPreviousComplaints?accountId=${accountID}&captureMode=${captureMode}${currentActivityId ? `&currentActivityId=${currentActivityId}` : ''}`);
        return response.data;
    } catch {
        console.error('Error fetching services:', `${proxyURL}/custom/getPreviousComplaints?accountId=${accountID}&captureMode=${captureMode}${currentActivityId ? `&currentActivityId=${currentActivityId}` : ''}`);
    }
    return [];
}

export async function fetchLinkedComplaintsClassificationTree(crmChannel: string, customerSegment: string, productCode: string): Promise<ComplaintCategory[]> {
    try {
        const response = await axios.get<ComplaintCategoryDto>(`${proxyURL}/custom/buildLinkedComplaintsClassificationTree?crmChannel=${crmChannel}&CustomerSegment=${customerSegment}&productCode=${productCode}`);
        return response.data.categories;
    } catch {
        console.error('Error fetching services:', `${proxyURL}/custom/buildLinkedComplaintsClassificationTree?crmChannel=${crmChannel}&CustomerSegment=${customerSegment}&productCode=${productCode}`);
    }
    return [];
}