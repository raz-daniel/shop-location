import axios from "axios"
import Store from "../models/store/Store"
import Draft from "../models/store/Draft"

class Stores {

    async getAllStores(): Promise<Store[]> {
        const response = await axios.get<Store[]>(`${import.meta.env.VITE_REST_SERVER_URL}/stores`)
        return response.data
    }

    async getStoresPerCategory(categoryId: string): Promise<Store[]> {
        const response = await axios.get<Store[]>(`${import.meta.env.VITE_REST_SERVER_URL}/stores/${categoryId}`)
        return response.data
    }

    async add(draft: Draft): Promise<Store> {
        const response = await axios.post<Store>(`${import.meta.env.VITE_REST_SERVER_URL}/stores/`, draft)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await axios.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/stores/${id}`)
        return response.data
    }
}

const storesServices = new Stores()
export default storesServices