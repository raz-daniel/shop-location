import { ChangeEvent, useEffect, useState } from 'react'
import './List.css'
import Category from '../../../models/category/Category'
import categoriesServices from '../../../services/categories'
import Card from '../card/Card'
import Store from '../../../models/store/Store'
import storesServices from '../../../services/stores'
import { useLocation, useSearchParams } from 'react-router-dom'

export default function List(): JSX.Element {

    const [categories, setCategories] = useState<Category[]>([])
    const [stores, setStores] = useState<Store[]>([])
    const location = useLocation()
    const newStoreId = location.state?.newStoreId
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    useEffect(() => {
        (async () => {
            try {
                const categories = await categoriesServices.getCategories()
                setCategories(categories)

                const allStores = await storesServices.getAllStores();

                if (searchTerm) {
                    const filteredStores = allStores.filter(s =>
                        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.address.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    setStores(filteredStores)
                } else {
                    setStores(allStores);
                }
            } catch (error) {
                alert(error)
            }

        })()
    }, [searchTerm])

    async function categoryChanged(event: ChangeEvent<HTMLSelectElement>) {
        try {
            const selectedCategoryId = event.currentTarget.value


            const stores = await storesServices.getStoresPerCategory(selectedCategoryId)
            setStores(stores)

        } catch (error) {
            alert(error)
        }

    }

    function removeStore(id: string) {
        setStores(stores.filter(s => s.id !== id))
    }

    function categoryName(categoryId: string): string {
        const foundName = categories.find(c => c.id === categoryId)
        return !foundName ? 'unknown' : foundName.name
    }

    return (
        <div className='List'>

            <select onChange={categoryChanged} defaultValue="">
                <option value="" selected>All Stores</option>
                {categories.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>

            <div className='CardContainer'>
                {stores.map(store =>
                    <Card
                        key={store.id}
                        categoryName={categoryName(store.categoryId)}
                        store={store}
                        removeStore={removeStore}
                        isNew={store.id === newStoreId}
                    />
                )}
            </div>
        </div>
    )
}