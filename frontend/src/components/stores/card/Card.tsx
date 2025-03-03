import { useEffect, useState } from 'react'
import Store from '../../../models/store/Store'
import storesServices from '../../../services/stores'
import './Card.css'

interface CardProps {
    store: Store
    categoryName: string
    removeStore(id: string): void
    isNew?: boolean
}

export default function Card(props: CardProps): JSX.Element {

    const { id, name, address } = props.store
    const { categoryName, isNew } = props
    const [highlight, setHighlight] = useState(isNew || false)

    useEffect(() => {
        if (isNew) {
            setHighlight(true)
            const timer = setTimeout(() => {
                setHighlight(false)
            },2000)
            return () => clearTimeout(timer)
        }
    }, [isNew])

    async function deleteMe() {
        try {
            await storesServices.remove(id)
            props.removeStore(id)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className={`Card ${highlight ? 'highlight' : ''}`}>
            <h4>{name}</h4>
            <p>{address}</p>
            <p>{categoryName}</p>
            <div>
                <button onClick={deleteMe}>delete</button>
            </div>
        </div>

    )
}