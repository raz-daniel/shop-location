import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header(): JSX.Element {


    return (
        <div className='Header'>
            
            <div>
                <nav>
                    <NavLink to="products/list">list</NavLink>
                    <NavLink to="products/add">product</NavLink>
                </nav>
            </div>

        </div>
    )
}