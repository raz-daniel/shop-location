import { ChangeEvent, useEffect, useState } from 'react'
import './List.css'
import Category from '../../../models/category/Category'
import Product from '../../../models/product/Product'
import categoriesServices from '../../../services/categories'
import Card from '../card/Card'
import productServices from '../../../services/products'

export default function List(): JSX.Element {

    const [categories, setCategories] = useState<Category[]>([])
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoriesServices.getCategories()
                setCategories(categories)
            } catch (error) {
                alert(error)
            }

        })()
    }, [])

    async function categoryChanged(event: ChangeEvent<HTMLSelectElement>) {
        try {
            const selectedCategoryId = event.currentTarget.value
            const products = await productServices.getProductPerCategory(selectedCategoryId)
            setProducts(products)
        } catch (error) {
            alert(error)
        }

    }

    function removeProduct(id: string) {
        setProducts(products.filter(p => p.id !== id))
    }

    return (
        <div className='List'>
            <select onChange={categoryChanged}>
                <option value="" disabled selected>Please select category...</option>
                {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
            <div className='CardContainer'>
                {products.map(product => <Card key={product.id} product={product} removeProduct={removeProduct}/>)}
            </div>
        </div>
    )
}