import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { BrowserRouter, Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { Menu, Dropdown } from 'antd';

function IncompleteStudies() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [responseData, setresponseData] = useState({
    loaded: false,
    data: []
  });

  const [responseimgData, setresponseimgData] = useState({
    loaded: false,
    data: []
  });

  const [rData, setrData] = useState('');
  const [imgData, setimgData] = useState([]);
  const [imgswitch,setimgswitch] = useState('default')
  const [checkData, setcheckData] = useState('nodata');
  const onitemClick = (imgspaths) => {

var imgp=imgspaths;

let substrings = imgp.split(',');

 setresponseimgData({
  loaded: true,
  data: substrings
})
setimgswitch('Imagelist')

  };
  const ReportClickHandler = async (REPORT) => {
    const asd = REPORT.replace(/\"/g, '')
    if (REPORT == 'num') {
      // toast("Report not uploaded yet")
        setcheckData('data')
    }
    else {

      setrData(asd)
    }


  }
  useEffect(async () => {

    const EMAILVALUE = localStorage.getItem("Email");

    var tempp;
    const statusval = 'Incomplete'
    await axios.get('/GETSTUDYDATA/' + statusval + '/' + EMAILVALUE
    ).then((response) => { tempp = response.data.Items })
    setresponseData({
      loaded: true,
      data: tempp
    })


  }, [imgData]);



  // const onSubmit = async e => {
  //   e.preventDefault();
 
  // }
  return (
    // <div className='IncompleteStudy-container' >
   imgswitch=='default'
   ?
   
   
   <div className="p-4">
      <div className="pt-3 pb-3">
        <h4 className="text-muted">Incomplete Studies</h4>
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
              (responseData.loaded) ?
                (responseData.data.length === 0) ?
                  <tr>
                    <td colSpan="6" className="text-center">There is no record available</td>
                  </tr>
                  :
                  responseData.data.map((Data, index) =>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{Data.First_Name + ' ' + Data.Last_Name}</td>
                      <td>{Data.Email}</td>
                      <td>{Data.Modality}</td>
                      <td>{Data.Start_Date}</td>
                      <td>{Data.Total_Images}</td>
                      {/* <td style={{ textAlign: "center" }}><button className='btn-table-image'>Image</button></td> */}
                      <td style={{ textAlign: "center" }}>
                        {/* <a href="https://main.dkb6pvcwal13d.amplifyapp.com/" target="_blank" className='btn-table-image'>OHIF Viewer</a> */}
             
                 <button className='btn-table-image' onClick={()=>{onitemClick(Data.Images_Paths)}}>Images</button>
                 <ToastContainer />
                
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
                        
                       
                        {checkData == 'nodata' ?
                        <a href={rData} onClick={() => { ReportClickHandler(Data) }} download><button  className='btn-table-report'>Download Image</button></a>
                       :   
                          <a onClick={() => { ReportClickHandler(Data) }} download > <button className='btn-table-report'>Download Image</button></a>
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

export default IncompleteStudies
