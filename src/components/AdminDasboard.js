import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch, useRouteMatch } from "react-router-dom";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IncompleteStudies from "./IncompleteStudies";
import AdminIncompleteStudies from './AdminIncompleteStudies';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import CompleteStudies from "./CompleteStudies";
import AdminCompleteStudies from "./AdminCompleteStudies";
import AllStudies from "./AllStudies";
import AllAccounts from "./AllAccounts";
import axios from 'axios';
import Radslogo2 from '../Images/Radslogo2.jpeg';
import "antd/dist/antd.css";
import { Menu, Dropdown } from 'antd';



function AdminDashboard() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const [responseData, setresponseData] = useState('');



  useEffect(async () => {

//    const namevalue = localStorage.getItem("AdminName")
// if(namevalue=='null')
// {
//   history.push('/AdminLogin')
  
// }
// else{
  history.push(`${url}/AdminIncompleteStudies`)
//   localStorage.setItem("AdminName",'null')
// }
   

  }, []);

  const onlogoutClick = () => {
 
      history.push("/ProfileEdit")
    
      localStorage.removeItem("AdminName");
      localStorage.removeItem("AdminPassword");
      localStorage.removeItem("AdminId");
      history.push("/AdminLogin")
    
  };



  return (
    <div className='dashboard-container'>
      <nav>
        <div className="logo">
          <img src={Radslogo2} className="logo-img" />
        </div>
        <ul className="menu-list">
          <li onClick={() => history.push(`${url}/AdminIncompleteStudies`)}>
            <Link to={`${url}/AdminIncompleteStudies`}>Incomplete Studies</Link>
          </li>
          <li onClick={() => history.push(`${url}/AdminCompleteStudies`)}>
            <Link to={`${url}/AdminCompleteStudies`}>Complete Studies</Link>
          </li>
          <li >
          <a href="https://main.dkb6pvcwal13d.amplifyapp.com/" target="_blank">OHIF Viewer</a>
          </li>
        </ul>

      </nav>
      <div className='dashboard-container2'>
        <div className='dashboard-container2-userdata'>
          <text className="text2" >Welcome Admin</text>
          <Link to='/AdminLogin' onClick={()=>onlogoutClick()} className='btn-login' style={{ marginTop: "10px", marginRight: "20px", float: "right" }}>Logout</Link>
        </div>
        <Switch>
          <Route path={`${path}/AdminIncompleteStudies`}><AdminIncompleteStudies /></Route>
          <Route path={`${path}/AdminCompleteStudies`}><AdminCompleteStudies /></Route>
        </Switch>
      </div>
    </div>
   
  );
}

export default AdminDashboard
