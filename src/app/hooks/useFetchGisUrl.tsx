import { useEffect, useState } from 'react';
import { ComplaintCaptureMode } from '../../interfaces/complaintEnums';
import { fetchGISMapUrl } from '../../utils/complaints/fetchGISMapUrl';
import { ComplaintType } from '../components/Complaints';

interface UseFetchGisUrlParams {
    selectedType: ComplaintType | null;
    selectedProductService: string | null;
    selectedRegion: string | null;
    customerCategory?: string;
    valueSegment?: string;
    customerSegment?: string;
    regionCode?: string;
    complaintCaptureType?: string;
    complaintId?: string;
}

export const useFetchGisUrl = ({ selectedType, selectedProductService, selectedRegion, customerCategory, valueSegment, customerSegment, regionCode, complaintCaptureType, complaintId }: UseFetchGisUrlParams) => {
    const [gisURL, setGisURL] = useState('');
    useEffect(() => {
        // Only fetch if it's a coverage complaint
        if (selectedType?.activityGroupCode !== 'COVERAGE') {
            setGisURL('');
            return;
        }

        // Build parameters object
        const params: any = {
            customerCategoryCode: customerCategory,
            valueSegment: valueSegment,
            customerSegment: customerSegment,
            regionCode: selectedRegion || regionCode
        };

        // Only add productServiceCode if Priority Flag is selected
        if (selectedProductService) {
            params.productServiceCode = selectedProductService;
        }

        // Only add complaintId if in UPDATE mode
        if (complaintCaptureType === ComplaintCaptureMode.UPDATE && complaintId) {
            params.complaintId = complaintId;
        }

        fetchGISMapUrl(params)
            .then((url) => {
                setGisURL(url);
            })
            .catch((err) => {
                setGisURL('');
                console.error('Error fetching GIS URL:', err);
            });
    }, [selectedType, selectedProductService, selectedRegion, customerCategory, valueSegment, customerSegment, regionCode, complaintCaptureType, complaintId]);

    return { gisURL };
};
