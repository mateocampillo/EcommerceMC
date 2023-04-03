import React from 'react';
import HeadComponent from '@/Components/Head';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/Sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Footer from '@/Components/Footer';

export default function ProductDetail() {

    const router = useRouter();
    const { id } = router.query;

  return (
    <>
      <HeadComponent title='Product Id' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <h1>producto con id: {id}</h1>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}
