//MF Services DTO 
export interface Service {
    id: string;
    name: string;
    group: string;
}

export interface ServicesTab{
    id: string;
    label: string;
    code:string;
    color: string;
    services: Service[]
}

// Example map object for category codes to labels
export const categoryMap: { [categoryCode: string]: string } = {
  ONE_TIME: "One Time",
  DEACTIVE: "Deactive",
  CHARGEABLE: "Chargeable",
  FREE: "Free",
  THIRD_PARTY: "Third Party",
  CUSTOM_SERVICES: "Custom Services"
};

//Received Services Backend Response DTO 
export interface BffService {
  label: string;
  value: string;
}

export interface BffServicesResponse {
  "ONE_TIME"?: BffService[];
  "DEACTIVE"?: BffService[];
  "CHARGEABLE"?: BffService[];
  "FREE"?: BffService[];
  "CUSTOM_SERVICES"?: BffService[];
  "THIRD_PARTY"?: BffService[];
}

export interface BffPreviousComplaint {
  id: string;
  category: string;
  impactedService: string;
  type: string;
  status: string;
  creationDate: string;
}

export type BffPreviousComplaintsResponse = BffPreviousComplaint[];