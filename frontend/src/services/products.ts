import axios from "axios"
import Product from "../models/product/Product"
import Draft from "../models/product/Draft"

class Products {

    async getProductPerCategory(categoryId: string): Promise<Product[]> {
        const response = await axios.get<Product[]>(`${import.meta.env.VITE_REST_SERVER_URL}/products/${categoryId}`)
        return response.data
    }

    async add(draft: Draft): Promise<Product> {
        const response = await axios.post<Product>(`${import.meta.env.VITE_REST_SERVER_URL}/products/`, draft)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await axios.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/products/${id}`)
        return response.data
    }
}

const productServices = new Products()
export default productServices