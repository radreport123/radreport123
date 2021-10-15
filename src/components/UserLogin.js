
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UserLogin() {
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


    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const submit = async (event) => {

        event.preventDefault()

        if (Password === "") {
            setvalidatePassword('empty');

        }
        else {

            setvalidatePassword('');
        }
        if (email === "") {
            setemailvalidate('empty');

        }
        else {
            setemailvalidate('')
        }
        if (!pattern.test(email)) {

            setemailvalidatematch('not matched');
        }
        else {
            setemailvalidatematch('');
        }
        if (email && Password) {
            var responseDATAVALUE;
            const PasswordVALUE = JSON.stringify(Password);
            const EMAILVALUE = JSON.stringify(email);
            await axios.get('/GETLOGINDATA/' + PasswordVALUE + '/' + EMAILVALUE
            ).then((response) => { responseDATAVALUE = response.data.Items[0] != null ? response.data.Items[0].MRN : '' })
            //!= null ? response.data.Items[0].MRN : '')})
            //  let sdfff=responseData.First_Name;
            // sdfff=sdfff.First_Name
            //.getString("First_Name")

            //  const resdata= JSON.stringify(responseData)
            // console.log(JSON.stringify(responseData));

            if (responseDATAVALUE != '') {
                const demodata = responseDATAVALUE
                if (demodata == '') {
                }
                else {
                    localStorage.setItem("Password", JSON.stringify(Password));
                    localStorage.setItem("Email", JSON.stringify(email));
                    localStorage.setItem("MRN", JSON.stringify(responseDATAVALUE));
                    history.push('/Dashboard')

                }
            }
            else {
                toast("Your EMAIL or Password did not match")
            }
            // setEmail('');
            // setPassword('');
        }
    }

    function funcSetEmail(value) {
        setEmail(value)
        setemailvalidate('')
        setemailvalidatematch('')
    }

    function funcSetPassword(value) {
        setPassword(value)
        setvalidatePassword('')
    }

    return (
        <div className='sub-container'>
            <div className="container">
                <div onClick={handlebackpress} style={{ cursor: "pointer", marginTop: "12px", fontSize: "18px" }}>
                    <ArrowBackIosIcon className='goback-icon' />
                    <span>Back</span>
                </div>
                <div className="container mt-4">
                    {/* <h5>Welcome! Please Login<br /><small className="text-muted">Please login to proceeed</small></h5> */}
                    <h5>Welcome! Please Login<br /><small className="text-muted" style={{fontSize: "70%"}}>New Member? <Link to="/CreateAccountScreen" style={{color: "#7d07ab"}}>Register</Link> here</small></h5>
                    <form onSubmit={submit} style={{ paddingTop: "12px", paddingBottom: "30px" }}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => funcSetEmail(e.target.value)} placeholder="Enter email" />
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
                            <input type="password" className="form-control" value={Password} onChange={(e) => funcSetPassword(e.target.value)} placeholder="Enter Password" />
                            {validatePassword == 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                        </div>
                        <div class="form-group">
                            <Link to="/ForgotPasswordScreen" style={{color: "#7d07ab"}}>Forgot Password?</Link>
                        </div>

                        <button type="submit" className="btn btn-submit">Submit</button>
                    </form>
                </div>
                {/* </div> */}
                {/* <form onSubmit={submit}>
                    <div className="container" style={{ paddingTop: "30px" }}>
                        <div className="form-group">
                            <label className="form-control-label">Email</label>
                            <input placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        {emailvalidate == 'empty' && <p style={{ color: 'red', marginLeft: 11 }}>Please fill the field</p>}
                        {emailvalidatematch == 'not matched' && <p style={{ color: 'red', marginLeft: 11 }}>Please Enter a valid email</p>}
                        <label className='form-control-label'>Enter Password</label>
                        <input placeholder='Enter Password' type="password" className='form-control' value={Password} onChange={(e) => setPassword(e.target.value)} />
                        {validatePassword == 'empty' && <p style={{ color: 'red', marginLeft: 11 }}>Please fill the field</p>}
                        <Link className='form-control-label-link-fp' to="/ForgotPasswordScreen">Forgot Password?</Link>

                        <input type='submit' value='Submit' className='btn-submit' />
                    </div>

                </form> */}
            </div>
        </div>
    )
}

export default UserLogin
