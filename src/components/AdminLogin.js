
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function AdminLogin() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('')
    const [validatePassword, setvalidatePassword] = useState('');
    const [emailvalidate, setemailvalidate] = useState('');
    const [emailvalidatematch, setemailvalidatematch] = useState('');
    const [responseData, setresponseData] = useState('');
    const handlebackpress = () => {
        history.push('/');
    }



    const submit = async (event) => {

        event.preventDefault()

        if (!Password) {
            setvalidatePassword('empty');

        }
        else {

            setvalidatePassword('');
        }
        if (!email) {
            setemailvalidate('empty');

        }
        else {
            setemailvalidate('')
        }

        if (email && Password) {
            var responseDATAVALUE;
            const PasswordVALUE = JSON.stringify(Password);
            const EMAILVALUE = JSON.stringify(email);
            await axios.get('/GETADMINLOGINDATA/' + PasswordVALUE + '/' + EMAILVALUE
            ).then((response) => { responseDATAVALUE = response.data.Items[0] != null ? response.data.Items[0].Id : '' })
 
            if (responseDATAVALUE != '') {
                const demodata = responseDATAVALUE
                if (demodata == '') {
                }
                else {
                    localStorage.setItem("AdminPassword", JSON.stringify(Password));
                    localStorage.setItem("AdminName", JSON.stringify(email));
                    localStorage.setItem("AdminId", JSON.stringify(responseDATAVALUE));
                    history.push('/AdminDashboard')

                }
            }
            else {
                toast("Your EMAIL or Password did not match")
            }
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div className='sub-container'>
            <div className="container">
                <div className="container mt-5">
                    <h5>Welcome Admin!<br /><small className="text-muted">Please login to proceeed</small></h5>
                    <form onSubmit={submit} style={{ paddingTop: "12px", paddingBottom: "30px" }}>
                        <div className="form-group">
                            <label>Username</label>
                            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                           <ToastContainer/>
                            {
                                (emailvalidate === 'empty') ?
                                    <p style={{ color: 'red' }}>Please fill the field</p>
                                    :
                                    (emailvalidatematch === 'not matched') &&
                                    <p style={{ color: 'red' }}>Please Enter a valid email</p>
                            }
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                            {validatePassword == 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                        </div>

                        <button type="submit" className="btn btn-submit">Submit</button>
                    </form>
                </div>
             
            </div>
        </div>
      
    )
}

export default AdminLogin
