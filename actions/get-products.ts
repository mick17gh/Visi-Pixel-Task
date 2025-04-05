import { Product } from "@/types";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(baseUrl, { cache: 'no-store' });
    return res.json();
}

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
    const res = await fetch(`${baseUrl}/detail/${slug}`, { cache: 'no-store' });
    if (!res.ok) {
        return null;
    }
    return res.json();
}