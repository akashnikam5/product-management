export interface Product {
  status: string;
  product_id: number;
  product_name: string;
  image: string;
  price: number;
  description: string;
  del_status: number;
}

export interface ApiResponse {
  status: string;
  products: Product[];
}

export interface Prod {
  status: string;
  products: Product;
}

