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
import { PT_Sans } from 'next/font/google';

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

const pt_sans = PT_Sans({weight: ['700'], style: ['italic'], subsets: ['latin']})

function ProductList({data}: {data:Array<apiData>}) {

  const router = useRouter();
  let queryCategory = router.query.query as string;
  const [category, setCategory] = React.useState('');

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

  return (
    <>
      <HeadComponent title='Product List' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <section>
            <div>
              <h2 className={[styles.heading, pt_sans.className].join(" ")}>The best products</h2>
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
            <div>
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