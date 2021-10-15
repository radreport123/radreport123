import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
// import DatePicker from "react-datepicker";
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
import { Scrollbars } from 'react-custom-scrollbars-2';
import axios from 'axios';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import { Link } from 'react-router-dom';
function ProfileEdit() {




    const [state, setState] = useState({
        gilad: true,
        jason: false,
        antoine: false,
    });




    const history = useHistory();
    const location = useLocation();
    const [Editable, setEditable] = useState('');
    // const [newpassword , setnewpassword] = useState('');
    // const [newpasswordvalidate , setnewpasswordvalidate] = useState('');
    // const [newConfirmPassword , setnewConfirmPassword] = useState('');
    // const [ConfirmPassword,setConfirmPassword] = useState('')
    // const [validateConfirmPassword,setvalidateConfirmPassword]=useState('');
    // const [newConfirmPasswordvalidate , setnewConfirmPasswordvalidate] = useState('');
    const [gender, setgender] = useState('');
    const [reportData, setreportData] = useState('');
    const [editclicked, seteditclicked] = useState(true);

    const [imgkey, setimgkey] = useState('');
    const [randomnumber, setrandomnumber] = useState('');
    const [first_name2, setFirstName2] = useState('');
    const [last_name2, setLastName2] = useState('');
    const [email2, setEmail2] = useState('');
    const [fnamevalidate2, setfnamevalidate2] = useState('');
    const [password2, setpassword2] = useState('');
    const [lnamevalidate, setlnamevalidate2] = useState('');
    const [emailvalidate2, setemailvalidate2] = useState('');
    const [emailvalidatematch2, setemailvalidatematch2] = useState('');
    const [startDate2, setStartDate2] = useState('');
    const [startDatevalidate, setStartDatevalidate2] = useState('');
    const [Description2, setDescription2] = useState('');
    const [Descriptionvalidation2, setDescriptionvalidation2] = useState('');
    const [male2, setmale2] = useState('');
    const [female2, setfemale2] = useState('');
    const [checker2, setchecker2] = useState('');
    const [malevalidation2, setmalevalidation2] = useState('');
    const [STUDYSTATUS, setSTUDYSTATUS] = useState('');
    const [Studyimages, setStudyimages] = useState('');
    const [Studyimagespaths, setStudyimagespaths] = useState('');
    const [DOB2, setDOB2] = useState('');

    const [DOBvalidate2, setDOBvalidate2] = useState(new Date());

    const [modality2, setmodality2] = useState();
    const [modalityvalidation2, setmodalityvalidation2] = useState('');
    const [responseData, setresponseData] = useState('');
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const submittt = async (event) => {
        event.preventDefault()


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

        if (first_name2 && last_name2 && email2 && modality2 && Description2) {

            const MRNdata = localStorage.getItem("MRN");


            const d = JSON.stringify({ MRNDATA: MRNdata.toString(), descriptionnn: Description2, studystatuss: STUDYSTATUS, email: email2, modality: modality2, password: password2, DOB: DOB2, startdate: startDate2,
                 gender: gender, first_name: first_name2, last_name: last_name2, reportt: reportData,
                 TotalImages:Studyimages,Totalimagespaths:Studyimagespaths });
            await axios.post('/UPDATEPROFILE', d, { headers: { 'Content-Type': 'application/json' } }).then(history.push('/Dashboard'),window.location.reload(false));

            //         setFirstName2('');
            //     setLastName2('');
            //     setDOB2('');
            //     setDescription2('');
            //     setmodality2('');
            //     setEmail2('');
            //    setfemale2('');
            //     setmale2('');


        }

    }
    const handleClickedChange = (event) => {

        if (editclicked == true) {
            seteditclicked(false)

        }
        else {
            seteditclicked(true)

        }
    };

    useEffect(async () => {


        const MRNVALUE = localStorage.getItem("MRN");
        const EMAILVALUE = localStorage.getItem("Email");
        console.log(MRNVALUE)
        //  // await axios.post('/GETDATA', d, { headers: {'Content-Type': 'application/json'}});
        await axios.get('/GETDATA/' + MRNVALUE + '/' + EMAILVALUE
        ).then((response) => { setresponseData(response.data.Item) }).then(
            seteditclicked(false)
        )
        setFirstName2(responseData.First_Name);
        setEmail2(responseData.Email);
        setgender(responseData.Gender);
        setLastName2(responseData.Last_Name);
        setDOB2(responseData.Date_of_birth);
        setDescription2(responseData.Description);
        setStartDate2(responseData.Start_Date);
        setmodality2(responseData.Modality);
        setSTUDYSTATUS(responseData.Study_Status);
        setreportData(responseData.Report);
        setStudyimages(responseData.Total_Images);
        setStudyimagespaths(responseData.Images_Paths);
        
        setchecker2('unchecked')


    }, [checker2]);

    return (
        editclicked == true
            ?

            <div className='Update-container-main'>
                <form className='dropbox-sub-container-update' onSubmit={submittt}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Your Profile Data</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={editclicked} onChange={handleClickedChange} name="edit" />}
                                label="Click to edit"
                            />

                        </FormGroup>

                    </FormControl>
                    <Scrollbars >
                        <div style={{ paddingLeft: "20px", paddingRight: "40px" }}>
                            <div className="form-group">
                                <label>Confirm First Name</label>
                                <input type='text' className='form-control' value={first_name2} onChange={(e) => setFirstName2(e.target.value)} />
                                {fnamevalidate2 == 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>
                            <div className="form-group">
                                <label>Confirm Last Name</label>
                                <input type='text' placeholder='Enter Last Name' className='form-control' value={last_name2} onChange={(e) => setLastName2(e.target.value)} />
                                {lnamevalidate == 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>
                            <div className="form-group">
                                <label>Select Date of Birth</label>
                                <DatePicker className='Datepicker' format="dd/MM/yyyy" value={DOB2} onChange={(DOB2) => setDOB2(DOB2)} />
                                {DOBvalidate2 == 'not selected' && <p style={{ color: 'red' }}>Please confirm your date-of-birth</p>}
                            </div>
                            <div className="form-group">
                                <label>Confirm modality</label>
                                <input type='text' placeholder='Enter modality' className='form-control' value={modality2} onChange={(e) => setmodality2(e.target.value)} />
                                {modalityvalidation2 == 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>
                            <div className="form-group">
                                <label>Select Study Date</label>
                                <DatePicker className='Datepicker' value={startDate2} onChange={(startDate2) => setStartDate2(startDate2)} />
                                {startDatevalidate == 'not selected' && <p style={{ color: 'red' }}>Please confirm start-date</p>}
                            </div>

                            <div className="form-group">
                                <label>Confirm Study Description</label>
                                <textarea className='form-control' rows="5" cols="60" placeholder='Please Enter Study Descripton' name="Description2" value={Description2} onChange={(e) => setDescription2(e.target.value)} />
                                {Descriptionvalidation2 == 'empty' && <p style={{ color: 'red' }}>Please fill this field</p>}
                            </div>
                        </div>
                    </Scrollbars>
                    <div className="container">
                        <button type='submit' style={{ width: "15%", float: "right" }} className='btn btn-submit'>Update</button>
                    </div>
                </form>


            </div>

            :

            //////////////////////////////////////////////non editableform/////////////////
            <div className='Update-container-main'>
                <form className='dropbox-sub-container-update' onSubmit={submittt}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Your Profile Data</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={editclicked} onChange={handleClickedChange} name="edit" />}
                                label="Click to edit"
                            />

                        </FormGroup>

                    </FormControl>
                    <Scrollbars>
                        <div style={{ paddingLeft: "20px", paddingRight: "40px" }}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type='text' className='form-control' readonly="true" disabled value={first_name2} onChange={(e) => setFirstName2(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type='text' placeholder='Enter Last Name' readonly="true" disabled className='form-control' value={last_name2} onChange={(e) => setLastName2(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <DatePicker className='Datepicker' format="dd/MM/yyyy" readonly="true" disabled value={DOB2} onChange={(DOB2) => setDOB2(DOB2)} />
                            </div>
                            <div className="form-group">
                                <label>Modality</label>
                                <input type='text' placeholder='Enter modality' readonly="true" disabled className='form-control' value={modality2} onChange={(e) => setmodality2(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label>Study Date</label>
                                <DatePicker className='Datepicker' value={startDate2} readonly="true" disabled onChange={(startDate2) => setStartDate2(startDate2)} />
                            </div>
                            <div className="form-group">
                                <label>Study Description</label>
                                <textarea className='form-control' readonly="true" disabled rows="5" cols="60" placeholder='Please Enter Study Descripton' name="Description2" value={Description2} onChange={(e) => setDescription2(e.target.value)} />
                            </div>

                        </div>
                    </Scrollbars>
                </form>


            </div>

    )
}

export default ProfileEdit
