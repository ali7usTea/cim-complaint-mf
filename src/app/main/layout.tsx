'use client'

import Layout from '../../layout/layout';
import { Suspense } from 'react';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const { jwtToken } = useSelector((state: RootState) => state.auth)
  return (
    <Layout token={jwtToken as string}><Suspense fallback={<div>Loading...</div>}>{children}</Suspense></Layout>
  );
}
