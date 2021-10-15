import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
// import DatePicker from "react-datepicker";
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



function UploadStudies() {
    // const [first_name1,setfirst_name1]=useState('')
    const history = useHistory();
    const location = useLocation();
    const [gender, setgender] = useState('');
    const [imgkey, setimgkey] = useState('');
 
    const [imgpaths,setimgpaths] = useState([]);
    const [imgnumber, setimgnumber] = useState(location.state.Imagenumber);
    const [randomnumber, setrandomnumber] = useState('');
    const [first_name2, setFirstName2] = useState(location.state.first_name);
    const [last_name2, setLastName2] = useState(location.state.last_name);
    const [email2, setEmail2] = useState(location.state.email);
    const [fnamevalidate2, setfnamevalidate2] = useState('');
    const [password2, setpassword2] = useState(location.state.password);
    const [lnamevalidate, setlnamevalidate2] = useState('');
    const [emailvalidate2, setemailvalidate2] = useState('');
    const [emailvalidatematch2, setemailvalidatematch2] = useState('');
    const [startDate2, setStartDate2] = useState(location.state.startDate);
    const [startDatevalidate, setStartDatevalidate2] = useState('');
    const [Description2, setDescription2] = useState(location.state.Description);
    const [Descriptionvalidation2, setDescriptionvalidation2] = useState('');
    const [male2, setmale2] = useState(location.state.male);
    const [female2, setfemale2] = useState(location.state.female);
    const [malevalidation2, setmalevalidation2] = useState('');

    const [DOB2, setDOB2] = useState(location.state.DOB);
    const [DOBvalidate2, setDOBvalidate2] = useState(new Date());

    const [modality2, setmodality2] = useState(location.state.modality);
    const [modalityvalidation2, setmodalityvalidation2] = useState('');
    const handlebackpress = () => {
        history.goBack();
    }

    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    const submit = async (event) => {
        // event.preventDefault()


        if (!first_name2) {
            setfnamevalidate2('empty');
        }
        else {
            setfnamevalidate2('');
        }
        if (!last_name2) {
            setlnamevalidate2('empty');
        }
        else {
            setlnamevalidate2('');
        }
        if (!email2) {
            setemailvalidate2('empty');
        }
        else {
            setemailvalidate2('')
        }

        if (!startDate2) {
            setStartDatevalidate2('not selected')
        }
        if (!DOB2) {
            setDOBvalidate2('not selected')
        }
        else {

            setDOBvalidate2('');

        }
        if (!Description2) {
            setDescriptionvalidation2('empty');
        }
        else {
            setDescriptionvalidation2('');
        }
        if (!modality2) {
            setmodalityvalidation2('empty');
        }
        else {
            setmodalityvalidation2('');
        }
        if (!male2 && !female2) {
            setmalevalidation2('not matched');


        }
        else {
            setmalevalidation2('');
        }

        if (!pattern.test(email2)) {
            setemailvalidatematch2('not matched');

        }
        else {

            setemailvalidatematch2('')
        }

        if (first_name2 && last_name2 && email2 && modality2 && Description2 && male2 || female2 && pattern.test(email2)) {



            var today = new Date(),

                time = today.getHours() + '' + today.getMinutes() + '' + today.getSeconds()
            const mrnvalue = time + first_name2.toString()
            localStorage.setItem("MRN", JSON.stringify(mrnvalue));
            localStorage.setItem("Email", JSON.stringify(email2));
            var ARRR = location.state.imgpathsvar;
            const statusvalue = "Incomplete";
            console.log(ARRR)
            var reportt = 'num';
            var d = { 
                rndnumber: time + first_name2.toString(),
                 status: statusvalue, 
                 descriptionnn: Description2,
                  email: email2, 
                  modality: modality2,
                   password: password2, 
                   DOB: DOB2,
                    startdate: startDate2,
                     gender: gender,
                      first_name: first_name2,
                       last_name: last_name2,
                        report: reportt,
                        TotalImages:imgnumber,
                        Imagespaths:ARRR};
                       // {Imagespaths:ARRR }
            await axios.post('/POSTDATA', d, { headers: { 'Content-Type': 'application/json' } })
            .then(history.push({
               pathname: '/Dashboard',

           }
            )
           );

            setFirstName2('');
            setLastName2('');
            setDOB2('');
            setDescription2('');
            setmodality2('');
            setEmail2('');
            setfemale2('');
            setmale2('');

        }

    }




    useEffect(async () => {

        if (location.state.male == 'Male') {
            setgender('Male');
        
        }
        else {
            setgender('Female')
            
           
        }



    }, [location]);


    function Remove(str, startIndex, count) {
        return str.substr(0, startIndex) + str.substr(startIndex + count);
    }


    return (
        <div className='Update-container-main'>
            <div className="container">
                <div className="container mt-4">
                    <h5>Confirmation Form<br /><small>Please validate the given information and click submit button to get registered</small></h5>
                    <Scrollbars style={{ height: "410px", marginTop: "32px" }}>
                        <div style={{ paddingLeft: "20px", paddingRight: "50px" }}>
                            <div className="form-group">
                                <label>Confirm First Name</label>
                                <input type='text' className='form-control' value={first_name2} onChange={(e) => setFirstName2(e.target.value)} />
                                {fnamevalidate2 === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>

                            <div className="form-group">
                                <label>Confirm Last Name</label>
                                <input type='text' className='form-control' value={last_name2} onChange={(e) => setLastName2(e.target.value)} />
                                {lnamevalidate === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>

                            <div className="form-group">
                                <label>Confirm Email Address</label>
                                <input className='form-control' value={email2} onChange={(e) => setEmail2(e.target.value)} />
                                {
                                    (emailvalidate2 === 'empty') ?
                                        <p style={{ color: 'red' }}>Please fill the field</p>
                                        :
                                        (emailvalidatematch2 === 'not matched') &&
                                        <p style={{ color: 'red' }}>Please Enter a valid email</p>
                                }
                            </div>

                            <div className="form-group">
                                <label>Confirm Date of birth</label>
                                <DatePicker className='Datepicker2' format="dd/MM/yyyy" value={DOB2} onChange={(DOB2) => setDOB2(DOB2)} />
                                {DOBvalidate2 === 'not selected' && <p style={{ color: 'red' }}>Please Confirm your date of birth</p>}
                            </div>

                            <div className="form-group">
                                <label>Confirm your Gender</label>
                                <br />
                                {
                                    gender === 'Male' ?
                                        <>
                                            <input type="radio" id="html" name="gender" value="male"
                                                checked={gender === 'Male'}
                                                onChange={(e) => setmale2(e.target.value)} />
                                            <label htmlFor="html">male</label><br />
                                        </>

                                        :
                                        <>
                                            <input type="radio" id="css" name="gender" value="female"
                                                checked={gender === 'Female'}
                                                onChange={(e) => setfemale2(e.target.value)} />
                                            <label htmlFor="css">female</label><br />
                                            {malevalidation2 == 'not matched' && <p style={{ color: 'red' }}>Please Conform your Gender</p>}
                                        </>
                                }
                            </div>

                            <div className="form-group">
                                <label>Confirm Modality</label>
                                <input type='text' className='form-control' value={modality2} onChange={(e) => setmodality2(e.target.value)} />
                                {modalityvalidation2 === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>

                            <div className="form-group">
                                <label>Confirm Study Date</label>
                                <DatePicker className='Datepicker2' format="dd/MM/yyyy" value={startDate2} onChange={(startDate2) => setStartDate2(startDate2)} />
                                {startDatevalidate == 'not selected' && <p style={{ color: 'red' }}>Please Confirm Study Date</p>}
                            </div>

                            <div className="form-group">
                                <label>Confirm Study Description</label>
                                <textarea className='form-control' rows="5" name="description2" value={Description2} onChange={(e) => setDescription2(e.target.value)} />
                                {Descriptionvalidation2 === 'empty' && <p style={{ color: 'red' }}>Please fill this field</p>}
                            </div>
                        </div>
                    </Scrollbars>

                    <button className="btn btn-submit" style={{ width: "15%", float: "right" }} onClick={() => submit()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default UploadStudies
