
import React, { useState } from 'react'
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ResetConfirmPasswordScreen() {
    const history = useHistory();
    const [newpassword, setnewpassword] = useState('');
    const [newpasswordvalidate, setnewpasswordvalidate] = useState('');
    const [newConfirmPassword, setnewConfirmPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [validateConfirmPassword, setvalidateConfirmPassword] = useState('');
    const [newConfirmPasswordvalidate, setnewConfirmPasswordvalidate] = useState('');

    const [responseData, setresponseData] = useState('');
    // const handlebackpress=()=>{
    //     history.goBack();
    // }



    const submitt = async (event) => {

        event.preventDefault()


        if (!ConfirmPassword) {
            setvalidateConfirmPassword('empty');

        }
        else {

            setvalidateConfirmPassword('');
        }
        if (!newConfirmPassword) {
            setnewConfirmPasswordvalidate('empty');

        }
        else {
            setnewConfirmPasswordvalidate('')
        }

        if (ConfirmPassword && newpassword) {
            if (ConfirmPassword === newpassword) {

                const ConfirmPasswordVALUE = JSON.stringify(ConfirmPassword);

                const MRNdata = localStorage.getItem("MRN")
                const emaildata = localStorage.getItem("Email")
                const d = JSON.stringify({ PasswordDATA: ConfirmPasswordVALUE, EMAILDATA: emaildata, MRNDATA: MRNdata });
                await axios.post('/UPDATEPASSWORDDATA', d, { headers: { 'Content-Type': 'application/json' } }).then(history.push('/UserLogin'));




            }
            else {
                toast("Your New Password and Confirm Password did not match")
            }
            // setnewpassword('');
            // setConfirmPassword('');
        }
        else {
            toast("Your passowrd does not match");

        }
    }


    return (
        <div className='sub-container'>
            <div className="container">
                {/* <div onClick={handlebackpress} style={{ cursor: "pointer", marginTop: "12px", fontSize: "18px" }}>
                    <ArrowBackIosIcon className='goback-icon' />
                    <span>Back</span>
                </div> */}
                <div className="container mt-5">
                    <h5>Reset Password</h5>
                    <div style={{ fontSize: "16px" }}>
                        <p className="text-muted">Choose a strong password containing Alphabets, Numerics and Special Characters</p>
                    </div>
                    <form onSubmit={submitt} style={{ paddingTop: "16px", paddingBottom: "30px" }}>
                        <div className="form-group">
                            <ToastContainer/>
                            {/* <label>Email address</label> */}
                            <input placeholder='Enter new password' type="password" className='form-control' value={newpassword} onChange={(e) => setnewpassword(e.target.value)} />
                            {
                                (newpasswordvalidate === 'empty') &&
                                <p style={{ color: 'red' }}>Please fill the field</p>
                            }
                        </div>
                        <div className="form-group">
                            <input placeholder='Confirm Your new Password' type="password" className='form-control' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            {validateConfirmPassword == 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                        </div>
                        <button type="button" className="btn btn-danger" style={{ height: "50px", width: "35%", borderRadius: "0" }} onClick={() => history.push("/UserLogin")}>Cancel</button>
                        <button type="submit" className="btn btn-submit" style={{ width: "35%", borderRadius: "0", float: "right" }} >Confirm</button>
                    </form>
                </div>
            </div>

        </div>
        // <div className='sub-container'>
        //     <form className='Userlogin-container-forgotpassword' >
        //         {/* <div className='goback-container'>
        //     <p className='goback'>Forgot ConfirmPassword</p>
        //     </div>  */}


        //         <label className='form-control-label'>Enter Your New Password</label>
        //         <input placeholder='Enter new password' type="password" className='form-control-input' value={newpassword} onChange={(e) => setnewpassword(e.target.value)} />
        //         {newpasswordvalidate == 'empty' && <p style={{ color: 'red', marginLeft: 11 }}>Please fill the field</p>}
        //         <label className='form-control-label'>Confirm Your New Password</label>
        //         <input placeholder='Confirm Your new Password' type="password" className='form-control-input' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        //         {validateConfirmPassword == 'empty' && <p style={{ color: 'red', marginLeft: 11 }}>Please fill the field</p>}
        //         <div className="btn-fp-container">
        //             <input type='submit' onClick={() => { history.push("/") }} value='CANCEL' className='btn-submit-CANCEL' />
        //             <input type='submit' onClick={submitt} value='CONFIRM' className='btn-submit-NEXT' />
        //         </div>
        //     </form>


        // </div>
    )
}

export default ResetConfirmPasswordScreen
