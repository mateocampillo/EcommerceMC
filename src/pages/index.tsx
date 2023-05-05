import React from 'react';
React.useLayoutEffect = React.useEffect
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import Footer from '@/Components/Footer';
import { ProSidebarProvider } from 'react-pro-sidebar';
import styles from '@/styles/mainIndex.module.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CardComponent from '@/Components/MainCard';
import Divider from '@mui/material/Divider';
import Banner from '@/Components/Banner';

interface apiData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
}

function Home({data}: {data:Array<apiData>}) {

  return (
    <>
      <HeadComponent title='StoreHub' />
      <ProSidebarProvider>
        <Sidebar />
        <Banner />
        <main>
          <section>
            <Card className={styles.card}>
              <CardMedia className={styles.cardMedia} image={data[14].image} title={data[14].title}/>
              <CardContent className={styles.cardContent}>
                <h2>Product Highlight</h2>
                <Typography gutterBottom variant="h5" component="div">
                  {data[14].title}
                </Typography>
              </CardContent>
            </Card>
            <div className={styles.infoContainer}>
                <Link href={`/products/${data[14].id}`}>Learn more</Link>
              </div>
          </section>
          <Divider variant='middle'/>
          <section className={styles.shopCategories}>
            <h2>Shop Our Top Categories</h2>
            <div>
              <CardComponent title={data[1].category} image={data[1].image} category={data[1].category}/>
              <CardComponent title={data[11].category} image={data[11].image} category={data[11].category}/>
              <CardComponent title={data[4].category} image={data[4].image} category={data[4].category}/>
              <CardComponent title={data[14].category} image={data[15].image} category={data[15].category}/>
            </div>
          </section>
        </main>
        <Footer />
      </ProSidebarProvider>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://fakestoreapi.com/products')
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default Home