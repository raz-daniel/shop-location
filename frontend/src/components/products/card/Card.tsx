import Product from '../../../models/product/Product'
import productServices from '../../../services/products'
import './Card.css'

interface CardProps {
    product: Product
    removeProduct(id: string): void
}

export default function Card(props: CardProps): JSX.Element {

    const {
        id, name, price, expirationTime
    } = props.product

async function deleteMe() {
    try {
        await productServices.remove(id)
        props.removeProduct(id)
    } catch (error) {
        alert(error)
    }
}

    return (
        <div className='Card'>
            <h4>{name}</h4>
            <p>price: {price}</p>
            <p>expirationTime: {expirationTime}</p>
            <div>
                <button onClick={deleteMe}>delete</button>
            </div>
        </div>
        
    )
}