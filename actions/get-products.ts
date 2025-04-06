import { Product } from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;


export const getProducts = async (): Promise<Product[]> => {
    try {
        const res = await fetch(baseUrl, { cache: 'no-store' });

        if (!res.ok) {
            console.error(`Failed to fetch products: ${res.status}`);
            return [];
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error('Invalid product list response');
            return [];
        }

        return data as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};



export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    try {
        const res = await fetch(`${baseUrl}/detail/${slug}`, { cache: 'no-store' });

        if (!res.ok) {
            console.error(`Failed to fetch product: ${res.status}`);
            return null;
        }

        const data = await res.json();

        return data as Product;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};