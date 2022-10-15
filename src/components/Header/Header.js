import navigate from 'navigate'
import { useState } from 'react'
import '../Header/Header.css'

const Header = () => {

    const [details, setDetails] = useState({
        username: '',
        password: ''
    })
    
    const handleLogout = () => {
        navigate('/login')
        setDetails({
            username: '',
            password: ''
        })
    }

    return (
        <div className='header'>
            <button 
            className='logout-button'
            onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Header