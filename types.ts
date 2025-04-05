export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Products = Product[];
