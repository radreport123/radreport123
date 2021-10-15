import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch, useRouteMatch } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminCompleteStudies() {
  const [responseDatacomp, setresponseDatacomp] = useState({
    loaded: false,
    data: []
  });
  const [errormesg, seterrormsg] = useState('Selected');
  const [file, setFile] = useState('');
  const [responseimgData, setresponseimgData] = useState({
    loaded: false,
    data: []
  });
  const [filename, setFilename] = useState('no file chosen');
  const [uploadedFile, setUploadedFile] = useState({});
  const [Switchscreen, setSwitchscreen] = useState('completescreen');
  const [usermrn, setusermrn] = useState('');
  const [useremail, setuseremail] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [rData, setrData] = useState('');
  const [checkData, setcheckData] = useState('nodata');
  const [imgswitch,setimgswitch] = useState('default')
  const [rimgData, setrimgData] = useState('');
  const [checkimgData, setcheckimgData] = useState('nodata');

  const onitemClick = (imgspaths) => {

    var imgp=imgspaths;
    
    let substrings = imgp.split(',');
    
     setresponseimgData({
      loaded: true,
      data: substrings
    })
    setSwitchscreen('')
    
      };


  const history = useHistory();

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

      if (filename == 'no file chosen') {

        seterrormsg('notselected')


      }
      else {
        const d = JSON.stringify({ PasswordDATA: ddd, EMAILDATA: useremail, MRNDATA: usermrn });
        await axios.post('/UPDATEREPORTDATA', d, { headers: { 'Content-Type': 'application/json' } }).then(
          setSwitchscreen('completescreen'),
          seterrormsg('Selected'),
          setFilename('no file chosen'),
          toast("The report has been uploaded")
        );
      }


    } catch (err) {

    }
  };
  const ReportClickHandler = async (REPORT) => {
    const asd = REPORT.replace(/\"/g, '')
    if (REPORT == 'num') {
      toast("Report not uploaded yet")
      setcheckData('data')
    }
    else {
      
      setrData(asd)
    }


  }

  const ImageClickHandler = async (imag) => {
    const asDd = imag.replace(/\"/g, '')
 
    if (imag == '') {
      // toast("Report not uploaded yet")

    }
    else {
      //  setcheckimgData('data');
       setrimgData(asDd);
 
    }


  }

  const onClickHandler = async (MRN, EMAIL) => {

    setusermrn(MRN);
    setuseremail(EMAIL);

    setSwitchscreen('FileUploadscreen')
    //history.push({pathname:'/FileUpload',state:{MRN,EMAIL}});
  }


  useEffect(async () => {

    var tempp;
    const statusval = 'Complete';
    await axios.get('/GETCOMPLETESTUDYDATA/' + statusval
    ).then((response) => { tempp = response.data.Items })
    setresponseDatacomp({
      loaded: true,
      data: tempp
    })
    setSwitchscreen('completescreen')
    //   setmrnvall(responseData[0].MRN)
    //   setemailvall(responseData[0].Email)

    //     console.log(mrnvall)
  }, []);




  return (
    Switchscreen == 'completescreen'
      ?
      <div className="p-4">
        <div className="pt-3 pb-3">
          <h4 className="text-muted">Completed Studies</h4>
        </div>
        <div className='table-responsive' >
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th>#</th>
                <th>Patient Name</th>
                <th>Patient MRN</th>
                <th>Patient Email</th>
                <th>Modality</th>
                <th>Study Date</th>
                <th>Total No. of Images</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>

              {
                (responseDatacomp.loaded) ?
                  (responseDatacomp.data.length === 0) ?
                    <tr>
                      <td colSpan="7" className="text-center">There is no record available</td>
                    </tr>
                    :
                    responseDatacomp.data.map((Data, index) =>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{Data.First_Name + ' ' + Data.Last_Name}</td>
                        <td>{Data.MRN}</td>
                        <td>{Data.Email}</td>
                        <td>{Data.Modality}</td>
                        <td>{Data.Start_Date}</td>
                        <td>{Data.Total_Images}</td>
                        <td style={{ textAlign: "center" }}>
                          <ToastContainer />
                          <button className='btn btn-sm btn-outline-success mr-1' onClick={() => onClickHandler(Data.MRN, Data.Email)}>Upload Report</button>
                          <button className='btn-table-image' onClick={()=>{onitemClick(Data.Images_Paths)}}>Images</button>
                        </td>
                      </tr>
                    )
                  :
                  <tr>
                    <td colSpan="7" className="text-center">Loading... please wait</td>
                  </tr>
              }
            </tbody>
          </table>

        </div>
      </div>
      :  Switchscreen == 'FileUploadscreen'
      ?
      <div className='sub-container'>
        <div className="container">
          <div onClick={() => setSwitchscreen("completescreen")} style={{ cursor: "pointer", marginTop: "12px", fontSize: "18px" }}>
            <ArrowBackIosIcon className='goback-icon' />
            <span>Back</span>
          </div>
          <div className="container mt-4">
            {/* <h5>Welcome! Please Login<br /><small className="text-muted">Please login to proceeed</small></h5> */}
            <h5>Upload Patient Report</h5>
            <p className="text-muted">Please upload MS Word document against this particular study</p>
            <form onSubmit={onSubmit} style={{ paddingTop: "12px", paddingBottom: "30px" }}>
              <div className="form-group">
                {/* <label>Upload Patient Report</label> */}
                <input type="file" className="form-control" accept=".docx" onChange={onChange} />
                {
                  (errormesg != 'Selected') &&
                  <p style={{ color: 'red' }}>Please Select a report to upload {errormesg}</p>
                }
              </div>

              <button type="submit" className="btn btn-submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
      :
      <div className="p-4">
   
      <div className="pt-3 pb-3">
      <div className="container">
            <div onClick={() =>  setSwitchscreen('completescreen')} style={{ cursor: "pointer", marginLeft: "-80px",marginTop:"-35px", fontSize: "18px" }}>
              <ArrowBackIosIcon className='goback-icon' />
              <span>Back</span>
            </div>
            </div>
        <h4 className="text-muted">Patient Image Details</h4>
      </div>
      <div className='table-responsive' >
        {/* <table className='data-table'> */}
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
             
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
  
        
  
              {
                (responseimgData.loaded) ?
                  (responseimgData.data.length === 0) ?
                    <tr>
                      <td colSpan="6" className="text-center">There is no record available</td>
                    </tr>
                    :
                    responseimgData.data.map((Data, index) =>
                      <tr>
                           <td>{index + 1}</td>
                        <td>{Data}</td>
                        <td>
                          
                         
                          {checkimgData == 'nodata' ?
                          <a href={rimgData} onClick={() => { ImageClickHandler(Data) }} download><button  className='btn-table-report'>Download Image</button></a>
                         :   
                            <a onClick={() => { ImageClickHandler(Data) }} download > <button className='btn-table-report'>Download Image</button></a>
                          }
                          
                          
                          </td>
                  
                        {/* <td style={{ textAlign: "center" }}><button className='btn-table-image'>Image</button></td> */}
                        <td style={{ textAlign: "center" }}>
                          {/* <a href="https://main.dkb6pvcwal13d.amplifyapp.com/" target="_blank" className='btn btn-sm btn-outline-dark'>Image</a> {Data.Total_Images}</td>
                */}
                   {/* <button className='btn-table-image' onClick={()=>history.push(setimgswitch('Imagelist'))}>Imagels</button> */}
                  
                      </td> 
                      </tr>
                    )
                  :
                  
              <tr>
                <td colSpan="6" className="text-center">Loading... please wait</td>
              </tr>
          }
        </tbody>
      </table>
  
    </div>
  </div>
   
   

  )
}




export default AdminCompleteStudies
