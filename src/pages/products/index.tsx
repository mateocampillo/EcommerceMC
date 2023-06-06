import React from 'react';
React.useLayoutEffect = React.useEffect
import HeadComponent from '@/Components/Head';
import Sidebar from '@/Components/Sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Footer from '@/Components/Footer';
import styles from '@/styles/productList.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardsId from '@/Components/CardsId';
import {useRouter} from 'next/router';
import { Source_Sans_Pro } from 'next/font/google'
import Image from 'next/image';

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

const ssp = Source_Sans_Pro({weight: ['400'], style: ['normal'], subsets: ['latin']})

function ProductList({data}: {data:Array<apiData>}) {

  const router = useRouter();
  let queryCategory = router.query.query as string;
  const [category, setCategory] = React.useState('');
  const [bannerImg, setBannerImg] = React.useState('/img/bcg-home.jpg');
  const [h1Title, setH1Title] = React.useState('All the products');

  React.useEffect((): void => {
    setCategory(queryCategory);
  }, [queryCategory])

  const handleChange = (event: SelectChangeEvent) : void => {
    setCategory(event.target.value);
    router.push({
      pathname: '/products',
      query: { query: `${event.target.value}` }
    }, 
    undefined, { shallow: true }
    )
  };

  React.useEffect((): void => {
    switch (category) {
      case "men's clothing":
        setBannerImg('/img/banner_men_products.jpg')
        setH1Title("Men's section")
        break;
      case "women's clothing":
        setBannerImg('/img/banner_women_products.jpg')
        setH1Title("Women's section")
        break;
      case "electronics":
        setBannerImg('/img/banner_electronics.jpg')
        setH1Title("Electronics section")
        break;
      case "jewelery":
        setBannerImg('/img/banner_jewelery.jpg')
        setH1Title("Jewelery section")
        break;
      default:
        setBannerImg('/img/banner_all.jpg')
        setH1Title("All the products")
        break;
    }
  }, [category])

  return (
    <>
      <HeadComponent title='Product List' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <section>
            <div>
              <div className={styles.bannerImageContainer}>
                <Image className={styles.bannerImage} src={`${bannerImg}`} width={'1920'} height={'1080'} alt='banner to introduce product list' />
                <div className={[styles.bannerTextContainer, ssp.className].join(" ")}>
                  <h1>{h1Title}</h1>
                  <h2>Curated for Excellence.</h2>
                </div>
              </div>
              <FormControl className={styles.category}>
                <InputLabel id="select-label">Category</InputLabel>
                <Select labelId="select-category" id="select-category" value={category} onChange={handleChange} autoWidth label="Category">
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"men's clothing"}>Men&#39;s Clothing</MenuItem>
                  <MenuItem value={"women's clothing"}>Women&#39;s Clothing</MenuItem>
                  <MenuItem value={'electronics'}>Electronics</MenuItem>
                  <MenuItem value={'jewelery'}>Jewelery</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={styles.productListContainer}>
              {data.map((product) => {
                if(category === product.category){
                  return (
                    <CardsId key={product.id} id={product.id} title={product.title} image={product.image} rating={product.rating} price={product.price}/>
                  )
                } else if(category === 'all'){
                  return (
                    <CardsId key={product.id} id={product.id} title={product.title} image={product.image} rating={product.rating} price={product.price}/>
                  )
                }
              })}
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

export default ProductList