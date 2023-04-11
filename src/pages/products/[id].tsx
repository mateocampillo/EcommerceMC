import React from 'react';
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Footer from '@/Components/Footer';
import ProductDetailComponent from '@/Components/ProductDetail';

interface ratingObject{
  rate: number;
  count: number;
}
interface apiData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ratingObject;
}

function ProductDetail({data}: {data:apiData}) {

  return (
    <>
      <HeadComponent title='ProductDetail' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <ProductDetailComponent id={data.id} title={data.title} description={data.description} image={data.image} price={data.price} category={data.category} rating={data.rating}/>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`https://fakestoreapi.com/products`)
  const data = await res.json()
  const paths = data.map((product: apiData) => {
    return {
      params: {
        id: `${product.id}`
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context: { params: apiData; }) {
  const {params} = context
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default ProductDetail