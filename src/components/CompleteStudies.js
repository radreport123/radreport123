
import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
import { BrowserRouter, Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
function CompleteStudies() {
  const [responseDatacomp, setresponseDatacomp] = useState({
    loaded: false,
    data: []
  });

  
  const [responseimgData, setresponseimgData] = useState({
    loaded: false,
    data: []
  });
  const { path, url } = useRouteMatch();
  const history = useHistory();
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
    setimgswitch('Imagelist')
    
      };



   


  useEffect(async () => {

    const EMAILVALUE = localStorage.getItem("Email");

    var tempp;
    const statusval = 'Complete'
    await axios.get('/GETSTUDYDATA/' + statusval + '/' + EMAILVALUE
    ).then((response) => { tempp = response.data.Items != null ? response.data.Items : [] })

    setresponseDatacomp({
      loaded: true,
      data: tempp
    })
    var tdata=tempp[0].Report
console.log(tdata)
    if(tdata=='num')
    {
     
      setcheckData("nodata")
    }
    else{
      setcheckData("data")
    }
  }, []);

  const ReportClickHandler = async (REPORT) => {
    const asd = REPORT.replace(/\"/g, '')
    if (REPORT == 'num') {
      toast("Report not uploaded yet")
     // setcheckData('data')
    }
    else {
      
      setrData(asd)
     // console.log(asd)
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


  return (
    imgswitch=='default'
    ?
    
    
    <div className="p-4">
      <div className="pt-3 pb-3">
        <h4 className="text-muted">Completed Studies</h4>
      </div>
      <div className='table-responsive' >
        {/* <table className='data-table'> */}
        <table className='table table-striped table-hover'>
          <thead>
            <tr>

              <th>#</th>
              <th>Patient Name</th>
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
                    <td colSpan="6" className="text-center">There is no record available</td>
                  </tr>
                  :
                  responseDatacomp.data.map((Data, index) =>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{Data.First_Name + ' ' + Data.Last_Name}</td>
                      <td>{Data.Email}</td>
                      <td>{Data.Modality}</td>
                      <td>{Data.Start_Date}</td>
                      <td>{Data.Total_Images}</td>
                      <td style={{ textAlign: "center" }}>

                        {checkData == 'data' ?
                          <a onClick={() => { ReportClickHandler(Data.Report) }} href={rData} download > <button className='btn-table-report'>Download Report</button></a>
                          :
                          <a onClick={() => { ReportClickHandler(Data.Report) }}  download > <button className='btn-table-report'>Download Report</button></a>
                        }
                     <button className='btn-table-image' onClick={()=>{onitemClick(Data.Images_Paths)}}>Images</button>
                        {/* <a href="https://main.dkb6pvcwal13d.amplifyapp.com/" target="_blank" className='btn btn-sm btn-outline-dark'>Image</a>{Data.Total_Images}
                     */}
                      </td>
                      <ToastContainer />
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
    :
    <div className="p-4">
   
    <div className="pt-3 pb-3">
    <div className="container">
          <div onClick={() => setimgswitch('default')} style={{ cursor: "pointer", marginLeft: "-80px",marginTop:"-35px", fontSize: "18px" }}>
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




export default CompleteStudies
