import { Suspense } from 'react';
import ClientProviders from './app/ClientProviders';
import Layout from './layout/layout';

export default function App() {
    return (
        <>
            <ClientProviders>
                <Layout>
                    <Suspense fallback={<div>Loading...</div>}></Suspense>
                </Layout>
            </ClientProviders>
        </>
    );
}
