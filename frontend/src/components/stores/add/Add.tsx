import { useEffect, useState } from 'react'
import Category from '../../../models/category/Category'
import './Add.css'
import categoriesServices from '../../../services/categories'
import { useForm } from 'react-hook-form'
import Draft from '../../../models/store/Draft'
import { useNavigate } from 'react-router-dom'
import storesServices from '../../../services/stores'

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
            const newStore = await storesServices.add(draft)
            alert('Added Store')
            navigate('/stores/list', { state: { newStoreId: newStore.id } })
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className='Add'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='store name' {...register('name', {
                    required: {
                        value: true,
                        message: 'must enter name'
                    }
                })}/>
                <span className='error'>{formState.errors.name?.message}</span>
                

                <input placeholder='address' {...register('address', {
                    required: {
                        value: true,
                        message: 'must enter address'
                    }
                })}/>
                <span className='error'>{formState.errors.address?.message}</span>

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

                <button>Add Store</button>

            </form>
        </div>
    )
}