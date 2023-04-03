import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Footer from '@/Components/Footer';


export default function ProductList() {
  return (
    <>
      <HeadComponent title='Product List' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <h2>Product List</h2>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}
