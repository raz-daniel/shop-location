import { useEffect, useState } from 'react'
import Category from '../../../models/category/Category'
import './Add.css'
import categoriesServices from '../../../services/categories'
import { useForm } from 'react-hook-form'
import Draft from '../../../models/product/Draft'
import productServices from '../../../services/products'
import { useNavigate } from 'react-router-dom'

export default function Add(): JSX.Element {
    const [categories, setCategories] = useState<Category[]>([])
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

    const { register, handleSubmit, formState } = useForm<Draft>()

    const navigate = useNavigate()

    async function submit(draft: Draft) {
        try {
            await productServices.add(draft)
            alert('Added Product')
            navigate('/products/list')
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='Add'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='product name' {...register('name', {
                    required: {
                        value: true,
                        message: 'must enter name'
                    }
                })}/>
                <span className='error'>{formState.errors.name?.message}</span>
                

                <input type="number" placeholder='price' {...register('price', {
                    required: {
                        value: true,
                        message: 'must enter price'
                    }
                })}/>
                <span className='error'>{formState.errors.price?.message}</span>

                <select defaultValue={''}{...register('categoryId', {
                    required: {
                        value: true,
                        message: 'must enter categoryId'
                    }
                })}>
                    <option value="" disabled selected>Please select category...</option>
                    {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
                <span className='error'>{formState.errors.categoryId?.message}</span>

                <label>Production Date:</label>
                <input type="datetime-local" {...register('productionTime', {
                    required: {
                        value: true,
                        message: 'must enter productionTime'
                    }
                })}/>
                <span className='error'>{formState.errors.productionTime?.message}</span>

                <label>Expiration Date:</label>
                <input type="datetime-local" {...register('expirationTime', {
                    required: {
                        value: true,
                        message: 'must enter expirationTime'
                    }
                })}/>
                <span className='error'>{formState.errors.expirationTime?.message}</span>

                <button>Add Product</button>

            </form>
        </div>
    )
}