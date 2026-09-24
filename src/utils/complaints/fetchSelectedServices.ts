import axios from 'axios';
import { proxyURL } from '../lib/proxyAPI.ts';
import { BffService, BffServicesResponse, categoryMap, Service, ServicesTab } from './dto.tsx';
import { mockAvailableServices, mockThirdPartyServices } from './mocks.tsx';

export async function fetchMainServices(accountID: string) {
    try {
        const response = await axios.get<BffServicesResponse>(`${proxyURL}/custom/availableServices?accountId=${accountID}`);
        const servicesTabsObjects: ServicesTab[] = mapServicesBackendRespToFEDto(response.data);
        servicesTabsObjects.push({
            id: "THIRD_PARTY",
            code: "THIRD_PARTY",
            label: categoryMap["THIRD_PARTY"] || "Third Party",
            color: 'bg-green-500 hover:bg-green-600',
            services: []
        });
        return servicesTabsObjects;
    } catch {
        console.error('Error fetching services:', `${proxyURL}/custom/availableServices?accountId=${accountID}`);
        // const fallbackTabs = mapServicesBackendRespToFEDto(mockAvailableServices);
        // fallbackTabs.push({
        //     id: "THIRD_PARTY",
        //     code: "THIRD_PARTY",
        //     label: categoryMap["THIRD_PARTY"] || "Third Party",
        //     color: 'bg-green-500 hover:bg-green-600',
        //     services: []
        // });
        // return fallbackTabs;
    }
    return [];
}

const mapServicesBackendRespToFEDto = (servicesData: BffServicesResponse): ServicesTab[] => {
    return Object.entries(servicesData)?.map(([tabName, bffServices]) => ({
        id: tabName,
        code: tabName,
        label: categoryMap[tabName] || tabName,
        color: 'bg-green-500 hover:bg-green-600',
        services: Array.isArray(bffServices)
            ? bffServices?.map((service: BffService) => ({
                id: service.value,
                name: service.label,
                group: tabName
            }))
            : [],
    }));
};

export async function fetchThirdPartyServices(accountNumber: string): Promise<Service[]> {
    const startDate = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')?.split('/').join('-');
    const endDate = new Date().toLocaleDateString('en-GB')?.split('/').reverse().join('-');
    try {
        const response = await axios.get<BffServicesResponse>(`${proxyURL}/custom/getThirdPartyServices?accountnumber=${accountNumber}&startDate=${startDate}&endDate=${endDate}`);               
        const mappedCategories = mapThirdPartyServicesBackendRespToFeDto(response.data); // Map the response to Microfrontend mapping
        return mappedCategories;
    } catch {
        console.error('Error fetching services:', `${proxyURL}/custom/getThirdPartyServices?accountnumber=${accountNumber}&startDate=${startDate}&endDate=${endDate}`);
       // return mapThirdPartyServicesBackendRespToFeDto(mockThirdPartyServices);
    }
     return [];
}

const mapThirdPartyServicesBackendRespToFeDto = (servicesData: BffServicesResponse): Service[] => {
    const thirdPartyKey = "THIRD_PARTY";
    const bffServices = servicesData[thirdPartyKey];
    if (!bffServices || !Array.isArray(bffServices)) {
        return [];
    }
    return bffServices?.map((service: BffService) => ({
        id: service.label,
        name: service.value,
        group: thirdPartyKey
    }));
};
