import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';

function ButtonConainer() {
    const history = useHistory()

    return (

        <div className='btn-container'>

            <Link to="/DropboxScreen" className='btn-dropbox'>Quick Dropbox</Link>

            <Link to="/CreateAccountScreen" className='btn-dropbox' style={{marginLeft: "14px"}}>Create Account</Link>

        </div>

    )
}

export default ButtonConainer
