export interface ratingObject{
    rate: number;
    count: number;
  }

export interface Product{
    title: string;
    image: string;
    id: number;
    rating: ratingObject;
    price: number;
    category: string;
    description: string;
}

export interface CartItem{
    product: Product;
    qty: number;
}