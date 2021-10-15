
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
function ForgotPasswordScreen() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('')
    const [validatePassword, setvalidatePassword] = useState('');
    const [emailvalidate, setemailvalidate] = useState('');
    const [emailvalidatematch, setemailvalidatematch] = useState('');
    const [responseData, setresponseData] = useState('');
    const handlebackpress = () => {
        history.push("/UserLogin");
    }


    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const submitemail = async (event) => {

        event.preventDefault()


        if (!email) {
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
        if (email) {
            var responseDATAVALUE;

            const EMAILVALUE = JSON.stringify(email);
            await axios.get('/GEEMAILDATA/' + EMAILVALUE
            ).then((response) => { responseDATAVALUE = response.data.Items[0] != null ? response.data.Items[0].MRN : '0' })


            if (responseDATAVALUE !== '0') {

                console.log(JSON.stringify(email))
                localStorage.setItem("Password", JSON.stringify(Password));
                localStorage.setItem("Email", JSON.stringify(email));
                localStorage.setItem("MRN", JSON.stringify(responseDATAVALUE));
                const rndnumberr = Math.floor(Math.random() * (900000 - 100000 + 1)) + 100000;
                localStorage.setItem("VarificationCode", JSON.stringify(rndnumberr));

                const d = JSON.stringify({ CODE: rndnumberr.toString(), EMAILDATA: email });
                await axios.post('/SENDCODEDATA', d, { headers: { 'Content-Type': 'application/json' } });




                history.push("/CodeScreen")


            }
            else {
                toast("No ACCOUNT found against this EMAIL")
            }
            // setEmail('');
            // setPassword('');
        }
    }

    return (
        <div className='sub-container'>

            <div className="container">
                <div onClick={handlebackpress} style={{ cursor: "pointer", marginTop: "12px", fontSize: "18px" }}>
                    <ArrowBackIosIcon className='goback-icon' />
                    <span>Back</span>
                </div>
                <div className="container mt-5">
                    <h5>Forgot Password?</h5>
                    <div style={{ fontSize: "16px" }}>
                        <p className="text-muted">Don't worry. Please enter your email address and get a reset password code via email</p>
                    </div>
                    <form onSubmit={submitemail} style={{ paddingTop: "16px", paddingBottom: "30px" }}>
                        <div className="form-group">
                            <ToastContainer/>
                            {/* <label>Email address</label> */}
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                            {
                                (emailvalidate === 'empty') ?
                                    <p style={{ color: 'red' }}>Please fill the field</p>
                                    :
                                    (emailvalidatematch === 'not matched') &&
                                    <p style={{ color: 'red' }}>Please Enter a valid email</p>
                            }
                        </div>
                     
                        <button type="submit" className="btn btn-submit" style={{ width: "35%", borderRadius: "0", float: "right" }} >Next</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default ForgotPasswordScreen
