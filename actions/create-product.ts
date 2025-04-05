import { ProductInput } from "@/types";
import axios from "axios";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const createProduct = async (product: ProductInput) => {
    try {
        const res = await axios.post(baseUrl, product, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
