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
function DropboxScreen() {
    const history = useHistory();
    const [MRNNUMBER, setMRNNUMBER] = useState('');
    const [last_name, setLastName] = useState('');

    const [fnamevalidate, setfnamevalidate] = useState('');
    const [uservalidate, setuservalidate] = useState('notvalid');
    const [lnamevalidate, setlnamevalidate] = useState('');
 
    
    const [errormesg, seterrormsg] = useState('Selected');
    const [file, setFile] = useState('');
    const [Imagenumber , setImagenumber]= useState(0);
    const [filename, setFilename] = useState('no file chosen');
   
    const [email, setEmail] = useState('');
    const [Imgcounter,setImgcounter]= useState([]);
    const [Imgcounterpath,setImgcounterpath]= useState('');
  
    const [emailvalidate, setemailvalidate] = useState('');
    const [emailvalidatematch, setemailvalidatematch] = useState('');

    const handlebackpress = () => {
        history.goBack();
    }



    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    
    
      };
    
      const Submit = async e => {
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
            variablrr=variablrr+Imagenumber
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
        
        }
        catch (err) {
   
       }
     }
    
    




    var fname = '';
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    const  onSubmit = async e => {

          e.preventDefault()

        if (!MRNNUMBER) {
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
        if (MRNNUMBER && email) {
            var TEMPPPPP;
            var imgnum;
            await axios.get('/GETDATADROPBOX/' + MRNNUMBER + '/' + email
            ).then((response) => {
              TEMPPPPP = response.data.Item != null ? response.data.Item : 'no data'
            });
            await axios.get('/GETDATADROPBOX/' + MRNNUMBER + '/' + email
            ).then((response) => {
                imgnum = response.data.Item != null ? response.data.Item : 'no data'
            });
     

            if (TEMPPPPP == 'no data') {
            //  let fff="Patient data not found ";
            //  let dddd="Please create new account";
            //  let msgg = fff+"\n"+dddd
                toast(`Patient data not found
                
                Please create new account
                `)
               
            
            }
            else {
                var asddd=JSON.stringify(imgnum.Total_Images)
                asddd=parseInt(asddd);  
                 console.log(asddd)
          
               setImagenumber(asddd)
               setImgcounterpath(TEMPPPPP.Images_Paths);
             setuservalidate('valid');
            }

            // setMRNNUMBER('');
            // setLastName('');
            // setEmail('');


        }
        else {
            history.push('/DropboxScreen')
        }

    }



    const Updatedropboxdata =async()=>{
console.log(email)
        const d = JSON.stringify({ ImageDATA: Imgcounterpath, EMAILDATA: email, MRNDATA: MRNNUMBER,Imagenumber:Imagenumber });
                await axios.post('/UPDATEIMAGESPATHDATA', d, { headers: { 'Content-Type': 'application/json' } })
                .then(
                history.push('/Dashboard'),
                localStorage.setItem("MRN", JSON.stringify(MRNNUMBER)),
                localStorage.setItem("Email", JSON.stringify(email)),
                );
               
            setMRNNUMBER('');
           // setLastName('');
            setEmail('');

    } 

    return (
        uservalidate=='notvalid'
            ?
        <div className='dropbox-container'>
   
            <div className="container">
            <ToastContainer />
                <div onClick={handlebackpress} style={{ cursor: "pointer", marginTop: "12px", fontSize: "18px" }}>
                    <ArrowBackIosIcon className='goback-icon' />
                    <span>Back</span>
                </div>
                <div className="container mt-4" style={{ paddingBottom: "60px" }}>
                    <h5>You can upload report Images  directly using this form</h5>
                    <div className="col-12 row mt-4">
                        <div className="col-10">
                            <form onSubmit={onSubmit} style={{ paddingTop: "22px",paddingLeft:"80px", paddingBottom: "30px" }}>
                            <div className="form-group">
                                <label>Enter MRN number</label>
                                <input type='text' placeholder='Enter mrn number' className='form-control' value={MRNNUMBER} onChange={(e) => setMRNNUMBER(e.target.value)} />
                                {fnamevalidate === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>
                     
                            <div className="form-group">
                                <label>Enter Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                {
                                    (emailvalidate === 'empty') ?
                                        <p style={{ color: 'red' }}>Please fill the field</p>
                                        :
                                        (emailvalidatematch === 'not matched') &&
                                        <p style={{ color: 'red' }}>Please Enter a valid email</p>
                                }
                            </div>
                            <button type="submit" className="btn btn-submit">Submit</button>
                            </form>
                        </div>
                    </div>
                    </div>
                    </div>
                       
                        {/* <div className="col-6">
                        <form onSubmit={Submit} style={{ paddingTop: "12px", paddingBottom: "30px" }}>
              <div className="form-group">
                  <ul>
                          {
                            Imgcounter.map(
                                Imgcounter=> ( <li key={Imgcounter.id}>{Imgcounter.value}</li> )

                            )
                          }

                  </ul>
        
                <input type="file" className="form-control"  onChange={onChange} />
                {
                  (errormesg != 'Selected') &&
                  <p style={{ color: 'red' }}>Please Select a report to upload {errormesg}</p>
                }
              </div>

              <button type="submit" className="btn btn-submit">Upload Image</button>
            </form>
            </div>
                        </div>
                    </div>

                 
                    <div className="col-18 row">
                      
                        <div className="col-6"><button className="btn btn-submit" onClick={() => Updatedropboxdata()}>Upload</button></div>
   
                    </div>
                </div> */}

        </div>
        :
        <div className='dropbox-container'>
   
            <div className="container">
                <div onClick={handlebackpress} style={{ cursor: "pointer", marginTop: "12px", fontSize: "18px" }}>
                    <ArrowBackIosIcon className='goback-icon' />
                    <span>Back</span>
                </div>
                <div className="container mt-4" style={{ paddingBottom: "60px" }}>
                    <h5>You can upload report Images  directly using this form</h5>
                    {/* <div className="col-12 row mt-4">
                        <div className="col-6">
                            <form onSubmit={onSubmit} style={{ paddingTop: "22px", paddingBottom: "30px" }}>
                            <div className="form-group">
                                <label>Enter MRN number</label>
                                <input type='text' placeholder='Enter MRN NUMBER' className='form-control' value={MRNNUMBER} onChange={(e) => setMRNNUMBER(e.target.value)} />
                                {fnamevalidate === 'empty' && <p style={{ color: 'red' }}>Please fill the field</p>}
                            </div>
                     
                            <div className="form-group">
                                <label>Enter Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                {
                                    (emailvalidate === 'empty') ?
                                        <p style={{ color: 'red' }}>Please fill the field</p>
                                        :
                                        (emailvalidatematch === 'not matched') &&
                                        <p style={{ color: 'red' }}>Please Enter a valid email</p>
                                }
                            </div>
                            <button type="submit" className="btn btn-submit">Submit</button>
                            </form>*/}
                     
                       
                        <div className="col-10">
                        <form onSubmit={Submit} style={{ paddingTop: "12px",paddingLeft:"80px", paddingBottom: "30px" }}>
              <div className="form-group">
                  <h6>Selected Images</h6>
                  <div style={{height:"200px",width:"590px",border:"1px solid", overflowY: "scroll"}}>
                  
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
                  <p style={{ color: 'red' }}>Please Select a report to upload {errormesg}</p>
                }
              </div>

              <button type="submit" className="btn btn-submit">Upload Image</button>
            </form>
            </div>
            <div className="col-9"><button className="btn btn-submit-dropbox" onClick={() => Updatedropboxdata()}>Upload</button></div>
   
                        </div>
                    </div>

                  
                    
                </div>

       
    )
                }

export default DropboxScreen
