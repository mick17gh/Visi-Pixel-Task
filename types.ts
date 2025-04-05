export type Product = {
  id:string;
  name: string;
  description: string;
  price: number;
  url: string;
  slug:string;
}

export type ProductInput = Omit<Product, "id" | "slug">;
