import { NavLink, useNavigate } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'

export default function Header(): JSX.Element {

    const [searchTerm, setSearchTerm] = useState<string>('')
    const navigate = useNavigate()

    function handleSearch() {
        if (searchTerm.trim()) {
            navigate(`/stores/list?search=${searchTerm}`)
        }
    }

    return (
        <div className='Header'>

            <div>
                <nav>
                    <NavLink to="stores/list">Our Stores</NavLink>
                    <NavLink to="stores/add">Add Store</NavLink>
                    <NavLink to="stores/home">Home</NavLink>
                </nav>
            </div>
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }}>
                    <input
                        placeholder='search...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type='submit'>Search</button>
                </form>
            </div>

        </div>
    )
}