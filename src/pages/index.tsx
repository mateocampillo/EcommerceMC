import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar'
import { ProSidebarProvider } from 'react-pro-sidebar'

export default function Home() {
  return (
    <>
      <HeadComponent title='StoreHub' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <h2>Main Home</h2>
        </main>
      </ProSidebarProvider>
    </>
  )
}
