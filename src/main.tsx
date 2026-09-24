import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import 'primeicons/primeicons.css'; //this one
import { BreadCrumb } from 'primereact/breadcrumb';
import 'cim-ui-components/dist/cim-ui-components.css';
import ClientProviders from './app/ClientProviders.tsx';
import './styles/global.css'; // Haider
import ActionReportLayout from './app/debugReport/layout.tsx';
import ActionReportPage from './app/debugReport/page.tsx';

const items = [
    { label: 'Home', url: '/' },
    { label: 'Complaint', url: '/complaint' }
];

// const home = { label: 'Home', url: '/' };

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="p-2! pb-2! hidden">
            <BreadCrumb className="bg-transparent! text-xs! p-0! border-0!" model={items} separatorIcon={<span>/</span>}></BreadCrumb>
        </div>
        <BrowserRouter>
            <Routes>
                <Route path="/complaint" element={<App />}></Route>
                <Route
                    path="/complaint/debugReport"
                    element={
                        <ClientProviders>
                            <ActionReportLayout>
                                <ActionReportPage />
                            </ActionReportLayout>
                        </ClientProviders>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
