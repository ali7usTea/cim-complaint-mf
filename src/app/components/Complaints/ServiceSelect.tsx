import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Service, ServicesTab } from '../../../utils/complaints/dto';
import { fetchThirdPartyServices } from '../../../utils/complaints/fetchSelectedServices';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

interface ServiceSelectorProps {
  servicesCategories: ServicesTab[];
  selectedServices: Service[];
  onSelectedServicesChange: (services: Service[]) => void; 
}

export default function ServiceSelect({
  servicesCategories,
  selectedServices,
  onSelectedServicesChange,
}: ServiceSelectorProps) {

   const { Customers } = useSelector((state: RootState) => state.customerslice);
  const [activeTab, setActiveTab] = useState<ServicesTab | null>(null); // Active tab initialized to null
  const [searchTerm, setSearchTerm] = useState('');
  const [filterServices, setFilterServices] = useState<Service[]>([]);
  const {accountNumber } = Customers[Object.keys(Customers)?.[0]] || {};
  const [thirdPartyLoaded, setThirdPartyLoaded] = useState(false);


  useEffect(() => {
    if (!activeTab && servicesCategories.length > 0) {
      setActiveTab(servicesCategories[0]); // Set the first category as the active tab
    }
  }, [servicesCategories]);

  useEffect(() => {
     if (activeTab?.id === "THIRD_PARTY" && activeTab.services.length === 0 && !thirdPartyLoaded) {
      fetchThirdPartyServices(accountNumber).then((services) => {
        activeTab.services = services;
        setThirdPartyLoaded(true);
      });
    }
  }, [activeTab]);

  // Filter services based on activeTab
 useEffect(() => {
    if (activeTab) {
      const filtered = activeTab.services.filter(
        (service) => !selectedServices.some((selectedService) => selectedService.id === service.id) // Remove selected services
      );
      setFilterServices(filtered);
    }
  }, [activeTab, selectedServices]);

  // Filter services based on searchTerm
 useEffect(() => {
    if (activeTab) {
      const filtered = activeTab.services
        .filter((service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
          (service) =>
            !selectedServices.some((selectedService) => selectedService.id === service.id) // Remove selected services
        );
      setFilterServices(filtered);
    }
  }, [activeTab, searchTerm, selectedServices]);

  // Check if a service is selected
  const isServiceSelected = (serviceId: string): boolean => {
    return selectedServices.some((service) => service.id === serviceId);
  };

  // Toggle service selection
  const toggleService = (service: Service): void => {
    const updatedServices = isServiceSelected(service.id)?
    selectedServices.filter((s) => s.id !== service.id)
    : [...selectedServices, service];
    setFilterServices((prev) => prev.filter((s) => s.id !== service.id));
    onSelectedServicesChange(updatedServices);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow border border-gray-200">
      {/* Search Input */}
      <div className='mb-3!'>
        <div className="relative!">
          <Search className="absolute! left-4! top-1/2! -translate-y-1/2! w-5! h-5! text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full! pl-12! pr-4! py-3! text-sm! border-2! border-gray-300! rounded-lg! bg-white! text-gray-900! placeholder:text-gray-500! focus:ring-2! focus:ring-blue-500! focus:border-blue-500! outline-none! transition-all!"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {servicesCategories?.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category)}
              type="button"
              className={`
                px-4! py-2.5! text-sm! font-medium! whitespace-nowrap! rounded-lg! transition-all!
                ${activeTab?.id === category.id
                  ? 'bg-blue-600! text-white! shadow-sm!'
                  : 'bg-gray-100! text-gray-700! hover:bg-gray-200!'
                }
                focus:outline-none! focus:ring-2! focus:ring-blue-500! focus:ring-offset-2!
              `}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Service List */}
      <div className="max-h-[450px] overflow-y-auto">
        {filterServices.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filterServices?.map((service) => (
              <label
                key={service.id}
                className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors group"
              >
                <input
                  type="checkbox"
                  checked={isServiceSelected(service.id)}
                  onChange={() => toggleService(service)}
                  className="mt-0.5 h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer transition-all"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 leading-relaxed">
                    {service.name}
                  </div>
                </div>
              </label>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 mb-4">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <div className="text-base font-medium text-gray-900 mb-2">{searchTerm
                ? `No services match your search "${searchTerm}"`
                : `No ${activeTab?.label || 'selected'} services are available`}</div>
           
          </div>
        )}
      </div>
    </div>
  );
}