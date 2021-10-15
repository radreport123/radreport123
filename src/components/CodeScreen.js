
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import { Link } from 'react-router-dom';
function CodeScreen() {
    const history = useHistory();

    const [Code, setCode] = useState('');
    const [Password, setPassword] = useState('')
    const [validatePassword, setvalidatePassword] = useState('');
    const [Codevalidate, setCodevalidate] = useState('');
    const [Codevalidatematch, setCodevalidatematch] = useState('');
    const [responseData, setresponseData] = useState('');
    const handlebackpress = () => {
        history.push("/ForgotPasswordScreen");
    }


    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const submit = async (event) => {

        event.preventDefault()

        if (!Password) {
            setvalidatePassword('empty');

        }
        else {

            setvalidatePassword('');
        }
        if (!Code) {
            setCodevalidate('empty');

        }
        else {
            setCodevalidate('')
        }

        if (Code) {
            const codedata = localStorage.getItem("VarificationCode")
            if (Code == codedata) {
                history.push("/ResetPasswordScreen")
            }
            else {
                alert("Your verification code did not match")
            }
            // if(responseDATAVALUE!=''){
            // const demodata = responseDATAVALUE
            //     if(demodata==''){
            //     }
            //      else{       
            //         //   localStorage.setItem("Password", JSON.stringify(Password));
            //         //  localStorage.setItem("Code", JSON.stringify(Code));
            //         //  localStorage.setItem("MRN", JSON.stringify(responseDATAVALUE));
            //         //   history.push("/ResetPasswordScreen")

            //         }  
            // }
            // else{
            //      alert("Your Code or Password did not match")
            // }
            setCode('');

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
                    <h5>Verify Yourself</h5>
                    <div style={{ fontSize: "16px" }}>
                        <p className="text-muted">We have sent you a secret code via email. Please enter that code over here</p>
                    </div>
                    <form onSubmit={submit} style={{ paddingTop: "16px", paddingBottom: "30px" }}>
                        <div className="form-group">
                            <input placeholder='Enter Code' className='form-control' value={Code} onChange={(e) => setCode(e.target.value)} />
                            {
                                (Codevalidate === 'empty') ?
                                    <p style={{ color: 'red' }}>Please fill the field</p>
                                    :
                                    (Codevalidatematch === 'not matched') &&
                                    <p style={{ color: 'red' }}>Invalid code entered</p>
                            }
                        </div>
                        <button type="submit" className="btn btn-submit" style={{ width: "35%", borderRadius: "0", float: "right" }} >Next</button>
                    </form>
                </div>
            </div>

        </div>

        // <div className='sub-container'>
        //     <form className='Userlogin-container-forgotpassword'>
        //     {/* <div className='goback-container'>
        //     <p className='goback'>Forgot Password</p>
        //     </div>  */}


        //         <label className='form-control-label'>Enter Your Secret Code</label>
        //         <input  placeholder='Enter Code' className='form-control-input' value={Code} onChange={(e)=> setCode(e.target.value)}/>
        //         {Codevalidate=='empty' && <p style={{color:'red',marginLeft:11}}>Please fill the field</p>}
        //         {Codevalidatematch=='not matched' && <p style={{color:'red',marginLeft:11}}>Please Enter a valid Code</p>}

        //           <div className="btn-fp-container"> 
        //         <input type='submit'  value='CANCEL' onClick={()=>{history.push("/")}} className='btn-submit-CANCEL' />
        //         <input type='submit' value='NEXT' onClick={submit} className='btn-submit-NEXT' />
        //         </div>
        //     </form>


        // </div>
    )
}

export default CodeScreen
