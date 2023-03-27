import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';


export default function ProductList() {
  return (
    <>
      <HeadComponent title='Product List' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <h2>Product List</h2>
        </main>
      </ProSidebarProvider>
    </>
  )
}
