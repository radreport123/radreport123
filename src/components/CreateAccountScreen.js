import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
// import DatePicker from "react-datepicker";
import DatePicker from 'react-date-picker';
import "react-datepicker/dist/react-datepicker.css";
import { Scrollbars } from 'react-custom-scrollbars-2';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateAccountScreen() {
    const history = useHistory();
  
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [password, setpassword] = useState('')
    const [validatepassword, setvalidatepassword] = useState('');
    const [errormesg, seterrormsg] = useState('Selected');
    const [file, setFile] = useState('');
    const [Imagenumber , setImagenumber]= useState(0);
    const [filename, setFilename] = useState('no file chosen');
    const [uploadedFile, setUploadedFile] = useState({});
    const [Switchscreen, setSwitchscreen] = useState('completescreen');
    const [usermrn, setusermrn] = useState('');
    const [useremail, setuseremail] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [email, setEmail] = useState('');
    const [Imgcounter,setImgcounter]= useState([]);
    const [Imgcounterpath,setImgcounterpath]= useState('');
    const [fnamevalidate, setfnamevalidate] = useState('');
    const [lnamevalidate, setlnamevalidate] = useState('');
    const [emailvalidate, setemailvalidate] = useState('');
    const [emailvalidatematch, setemailvalidatematch] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [startDatevalidate, setStartDatevalidate] = useState(new Date());
    const [Description, setDescription] = useState('');
    const [Descriptionvalidation, setDescriptionvalidation] = useState('');
    const [male, setmale] = useState('');
    const [female, setfemale] = useState('');
    const [malevalidation, setmalevalidation] = useState('');

    const [DOB, setDOB] = useState(new Date());
    const [DOBvalidate, setDOBvalidate] = useState(new Date());

    const [modality, setmodality] = useState('');
    const [modalityvalidation, setmodalityvalidation] = useState('');
    const handlebackpress = () => {
        history.goBack();
    }
    const fileSelected = event => {
        const file = event.target.files[0]
        setFile(file)
    }

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    
    
      };
    
      const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
    
    
        try {
          const resultt = await axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
    
          );
          var ddd = JSON.stringify(resultt.data)
        //   console.log(ddd)
            setImgcounter([...Imgcounter,{
            id:Imgcounter.length,
            value:filename
            }
            ])
            var variablrr=Imgcounter.length
            variablrr = variablrr+1
            if(variablrr>=0){
                setImagenumber(variablrr)
                var pathdata = ddd;
  
                    setImgcounterpath(
                        Imgcounterpath+","+pathdata
                    )
             
            }
            else{
                setImagenumber(0)
            }
     

 
        //   if (filename == 'no file chosen') {
    
        //     seterrormsg('notselected')
     
    
        //   }
        //   else {
        //     const d = JSON.stringify({ PasswordDATA: ddd, EMAILDATA: useremail, MRNDATA: usermrn });
        //     await axios.post('/UPDATEREPORTDATA', d, { headers: { 'Content-Type': 'application/json' } }).then(
        //       setSwitchscreen('completescreen'),
        //       seterrormsg('Selected'),
        //       setFilename('no file chosen'),
        //       toast("The report has been uploaded")
        //     );
        //   }
    
    
         }
         catch (err) {
    
        }
      }
    


    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    const submit = async event => {
        // event.preventDefault()


        if (!first_name) {
            setfnamevalidate('empty');
        }
        else {
            setfnamevalidate('');
        }
        if (!last_name) {
            setlnamevalidate('empty');
        }
        else {
            setlnamevalidate('');
        }
        if (!password) {
            setvalidatepassword('empty');

        }
        else {
            setvalidatepassword('');
        }
        if (!email) {
            setemailvalidate('empty');
        }
        else {
            setemailvalidate('')
        }

        if (!startDate) {
            setStartDatevalidate('not selected')
        }
        if (!DOB) {
            setDOBvalidate('not selected')
        }
        else {
 
            setDOBvalidate('');
        }
        if (!Description) {
            setDescriptionvalidation('empty');
        }
        else {
            setDescriptionvalidation('');
        }
        if (!modality) {
            setmodalityvalidation('empty');
        }
        else {
            setmodalityvalidation('');
        }
        if (!male && !female) {
            setmalevalidation('not matched');


        }
        else {
            setmalevalidation('');
        }

        if (!pattern.test(email)) {
            setemailvalidatematch('not matched');

        }
        else {

            setemailvalidatematch('')
        }

        if (first_name && last_name && email && modality && Description && password && male || female && pattern.test(email)) {
            var imgpathsvar=Imgcounterpath.substr(1,Imgcounterpath.length)
         
            if (male) {
                history.push({
                    pathname: '/UploadStudies',
                    state: { first_name, last_name, email, modality, male, DOB, Description, startDate, password,Imagenumber,imgpathsvar },
                }
                );
            }
            else {
                history.push({
                    pathname: '/UploadStudies',
                    state: { first_name, last_name, email, modality, female, DOB, Description, startDate, password,Imagenumber,imgpathsvar },
                }
                );


            }
            setFirstName('');
            setLastName('');
            setDOB('');
            setDescription('');
            setmodality('');
            setEmail('');
            setfemale('');
            setmale('');
            setpassword('');

        }


    }
    return (

        <div className='dropbox-container' style={{ height: "532px" }}>


            <div className="container">
                <div onClick={handlebackpress} style={{ cursor: "pointer", marginTop: "12px", fontSize: "18px" }}>
                    <ArrowBackIosIcon className='goback-icon' />
                    <span>Back</span>
                </div>
                <div className="container mt-4 pb-4">
                    {/* <h5>Register now<br /><small>Fill up this form and get a free RADS account</small></h5> */}
                    <h5>Create a Free RADS Account<br /><small className="text-muted" style={{ fontSize: "70%" }}>Already a member? <Link to="/UserLogin" style={{ color: "#7d07ab" }}>Login</Link> here</small></h5>
                    <div className="col-12 row mt-4">

                        <div className="col-6">
                            <Scrollbars style={{ height: "320px" }}>
                                <div style={{ width: "90%" }}>
                                    <div className="form-group">
                                        <label>Enter First Name</label>
                                        <input type='text' placeholder='Enter First Name' className='form-control' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                                        {fnamevalidate === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Enter Last Name</label>
                                        <input type='text' placeholder='Enter Last Name' className='form-control' value={last_name} onChange={(e) => setLastName(e.target.value)} />
                                        {fnamevalidate === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Enter Email</label>
                                        <input placeholder='Enter Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        {
                                            (emailvalidate === 'empty') ?
                                                <p style={{ color: 'red' }}>Please fill the field</p>
                                                :
                                                (emailvalidatematch === 'not matched') &&
                                                <p style={{ color: 'red' }}>Please Enter a valid email</p>
                                        }
                                    </div>

                                    <div className="form-group">
                                        <label>Enter Password</label>
                                        <input placeholder='Enter Pasword' type='password' className='form-control' value={password} onChange={(e) => setpassword(e.target.value)} />
                                        {validatepassword === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Date of birth</label>
                                        <DatePicker className='Datepicker' format="dd/MM/yyyy" value={DOB} onChange={(DOB) => setDOB(DOB)} />
                                        {DOBvalidate === 'not selected' && <p style={{ color: 'red' }}>Please Select your date of birth</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Gender</label>
                                        <br />
                                        <span className="text-muted">
                                            <input type="radio" id="html" name="gender" value="Male" onChange={(e) => setmale(e.target.value)} />
                                            <label htmlFor="html">Male</label>
                                            <input type="radio" id="css" name="gender" className="ml-2" value="Female" onChange={(e) => setfemale(e.target.value)} />
                                            <label htmlFor="css">Female</label>
                                        </span>
                                        <br />
                                        {malevalidation == 'not matched' && <p style={{ color: 'red' }}>Please Select gender</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Enter Modality</label>
                                        <input type='text' placeholder='Enter Modality' className='form-control' value={modality} onChange={(e) => setmodality(e.target.value)} />
                                        {modalityvalidation === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Study Date</label>
                                        <DatePicker className='Datepicker' format="dd/MM/yyyy" value={startDate} onChange={(startDate) => setStartDate(startDate)} />
                                        {startDatevalidate == 'not selected' && <p style={{ color: 'red' }}>Please Select a date</p>}
                                    </div>

                                    <div className="form-group">
                                        <label>Enter Study Description</label>
                                        <textarea className='Description form-control' rows="5" placeholder='Please Enter Study Descripton' name="description" value={Description} onChange={(e) => setDescription(e.target.value)} />
                                        {Descriptionvalidation === 'empty' && <p style={{ color: 'red' }}>Please fill this field</p>}
                                    </div>

                                    <button className="btn btn-submit" onClick={() => submit()}>Submit</button>
                                </div>
                            </Scrollbars>
                        </div>

                        <div className="col-6">
                        <form onSubmit={onSubmit} style={{ paddingTop: "12px", paddingBottom: "30px" }}>
              <div className="form-group" style={{marginTop:"-60px"}}>
              <h6>Selected Images</h6>
                  <div style={{height:"200px",width:"390px",border:"1px solid", overflowY: "scroll"}}>
                  
                  <ul>
                          {
                            Imgcounter.map(
                                Imgcounter=> ( <li key={Imgcounter.id}>{Imgcounter.value}</li> )

                            )
                          }

                  </ul>
                  </div>
                {/* <label>Upload Patient Report</label> */}
                <input type="file" className="form-control"  onChange={onChange} />
                {
                  (errormesg != 'Selected') &&
                  <p style={{ color: 'red' }}>Please Select a report to upload</p>
                }
              </div>

              <button type="submit" className="btn btn-submit">Upload</button>
            </form>
            </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateAccountScreen
