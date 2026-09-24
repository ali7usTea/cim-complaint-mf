import React, { Suspense } from 'react';


interface ActionReportLayoutProps {
    children: React.ReactNode;
}

export default function ActionReportLayout({ children }: ActionReportLayoutProps) {
    
    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </div>
    );
}
