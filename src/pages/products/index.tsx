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
import MainCard from '@/Components/MainCard';

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

function ProductList({data}: {data:Array<apiData>}) {
  const [category, setCategory] = React.useState("all");

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <HeadComponent title='Product List' />
      <ProSidebarProvider>
        <Sidebar />
        <main>
          <section>
            <div>
              <h2>Product List</h2>
              <div>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
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
            </div>
            <div>
              <ul>
                {data.map((product) => {
                  if(category === product.category){
                    return (
                      <MainCard key={product.id} id={product.id} title={product.title} image={product.image}/>
                    )
                  } else if(category === 'all'){
                    return (
                      <MainCard key={product.id} id={product.id} title={product.title} image={product.image}/>
                    )
                  }
                })}
              </ul>
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