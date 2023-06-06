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
import Banner from '@/Components/Banner';
import Image from 'next/image';
import { Source_Sans_Pro } from 'next/font/google'
import Logo from '@/Components/Logo';

interface apiData{
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: object;
}

const ssp = Source_Sans_Pro({weight: ['400'], style: ['normal'], subsets: ['latin']})

function Home({data}: {data:Array<apiData>}) {

  return (
    <>
      <HeadComponent title='StoreHub' />
      <ProSidebarProvider>
        <Sidebar />
        <Banner />
        <main>
          {/* BANNER SECTION */}
          <section>
            <div className={styles.bannerImageContainer}>
              <Image alt='banner main' src={'/img/bcg-home.jpg'} className={styles.bannerImage} width={'1920'} height={'1080'}/>
              <div className={[styles.bannerTextContainer, ssp.className].join(" ")}>
                <h1>StoreHub</h1>
                <p>Rooted in style</p>
                <p>Inspiring wardrobe elegance</p>
              </div>
            </div>
            <div className={styles.bannerInfoContainer}>
              <div className={[styles.bannerLogo, ssp.className].join(" ")}>
                <Logo color='white'/>
                <h2>Your online clothing store!</h2>
              </div>
              <div className={styles.bannerText}>
                <p>StoreHub is your ultimate destination for fashion-forward trends and cutting-edge electronics. Join our vibrant community of fashion enthusiasts and tech-savvy individuals.</p>
                <Link href={'/products?query=all'} className={ssp.className}>Shop all products</Link>
              </div>
            </div>
          </section>

          {/* NEWEST RELEASE */}
          <h2 className={[styles.h2SecondCar, ssp.className].join(" ")}>New releases</h2>
          <section className={styles.newReleasesContainer}>
            <Card className={[styles.secondCard, ssp.className].join(" ")}>
              <Link href={'/products/20'}>
                <CardMedia className={styles.cardMedia} image={data[19].image} title={data[19].title}/>
                <CardContent className={styles.cardContent}>
                  <Typography gutterBottom variant="h5" component="div">
                    {data[19].title}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
            <Card className={[styles.card, ssp.className].join(" ")}>
              <CardMedia className={styles.cardMedia} image={data[16].image} title={data[16].title}/>
              <CardContent className={styles.cardContent}>
                <h2>Newest release</h2>
                <Typography gutterBottom variant="h5" component="div">
                  {data[16].title}
                </Typography>
              </CardContent>
              <div className={styles.infoContainer}>
                <Link href={`/products/${data[16].id}`}>Learn more</Link>
              </div>
            </Card>
          </section>
          {/* TOP CATEGORIES */}
          <div className={styles.categoriesImageContainer}>
            <Image className={styles.bannerImage} src={'/img/bcg-top-categories-home.jpg'} width={'1920'} height={'1080'} alt='transition banner'/>
            <div className={[styles.categoriesTextContainer, ssp.className].join(" ")}>
                <h2>Our top Categories</h2>
              </div>
          </div>
          <section className={styles.sectionCategories}>
            <div className={styles.listContainer}>
              <CardComponent title={data[14].category} image={data[15].image} category={data[15].category}/>
              <CardComponent title={data[1].category} image={data[1].image} category={data[1].category}/>
              <CardComponent title={data[4].category} image={data[4].image} category={data[4].category}/>
              <CardComponent title={data[11].category} image={data[11].image} category={data[11].category}/>
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