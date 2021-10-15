
import React from 'react'
import { Link } from 'react-router-dom'
import Radslogo2 from '../Images/Radslogo2.jpeg'
const Header = () => {
    return (
        <div className='header'>
            <div className='rectangle'><Link to="/"><img src={Radslogo2} className="logoimage-Header" /></Link></div>
            <div style={{ width: "100%", textAlign: "right" }}>
                <Link to='/UserLogin' className='btn-login' style={{ margin: "30px" }}>Login</Link>
            </div>
        </div>
    )
}

export default Header
