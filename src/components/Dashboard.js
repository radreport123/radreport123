import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, Switch, useRouteMatch } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IncompleteStudies from "./IncompleteStudies";
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import CompleteStudies from "./CompleteStudies";
import AllStudies from "./AllStudies";
import AllAccounts from "./AllAccounts";
import ProfileEdit from './ProfileEdit';
import axios from 'axios';
import Radslogo2 from '../Images/Radslogo2.jpeg';
import Imagelist from './Imagelist';
import "antd/dist/antd.css";
import { Menu, Dropdown } from 'antd';
function Dashboard() {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [responseData, setresponseData] = useState('');
  const onitemClick = ({ key }) => {
    if (key == '0') {
      history.push(`${url}/ProfileEdit`)
    }
    else {
      localStorage.removeItem("MRN");
      localStorage.removeItem("Email");
      localStorage.removeItem("VerificationCode");
      history.push("/")
    }
  };


  useEffect(async () => {


    const MRNVALUE = localStorage.getItem("MRN");
    const EMAILVALUE = localStorage.getItem("Email");
    var TEMPPPPP;
    await axios.get('/GETDATA/' + MRNVALUE + '/' + EMAILVALUE
    ).then((response) => {
      TEMPPPPP = response.data.Item != null ? response.data.Item : 'no data'
    });

    if (TEMPPPPP == 'no data') {
      await axios.get('/GETDATA/' + MRNVALUE + '/' + EMAILVALUE
      ).then((response) => { setresponseData(response.data.Item) });
      history.push(`${url}/IncompleteStudies`)
    }
    else {

      setresponseData(TEMPPPPP)
      history.push(`${url}/IncompleteStudies`)

    }

  }, []);

  return (


    <div className='dashboard-container'>
      <nav>
        <div className="logo">
          <img src={Radslogo2} className="logo-img" />
        </div>
        <ul className="menu-list">
          <li onClick={() => history.push(`${url}/IncompleteStudies`)}>
            <Link to={`${url}/IncompleteStudies`}>Incomplete Studies</Link>
          </li>
          <li onClick={() => history.push(`${url}/CompleteStudies`)}>
            <Link to={`${url}/CompleteStudies`}>Completed Studies</Link>
          </li>
          <li >
          <a href="https://main.dkb6pvcwal13d.amplifyapp.com/" target="_blank">OHIF Viewer</a>
          </li>
        </ul>

      </nav>
      <div className='dashboard-container2'>
        <div className='dashboard-container2-userdata'>
          <div className="col-12 row">
            <div className="col-3">
              <text className="text1" >MRN : {responseData.MRN}</text>
            </div>
            <div className="col-3">
              <text className="text1" style={{ marginLeft: 10 }}>First Name :  {responseData.First_Name}</text>
            </div>
            <div className="col-3">
              <text className="text1" style={{ marginLeft: 10 }}>Last Name : {responseData.Last_Name}</text>
            </div>
            <div className="col-3">

            </div>
          </div>
          <div className="col-12 row">
            <div className="col-3">
              <text className="text1" >Accession : </text>
            </div>
            <div className="col-3">
              <text className="text1" style={{ marginLeft: 10 }}>Modality :  {responseData.Modality}</text>
            </div>
            <div className="col-3">
              <text className="text1" style={{ marginLeft: 10 }}>Date of birth : {responseData.Date_of_birth}</text>
            </div>
            <div className="col-3">
              <Dropdown
                overlay={(
                  <Menu onClick={onitemClick}>
                    <Menu.Item key="0">
                      Edit Profile
                    </Menu.Item>
                    <Menu.Item key="1">
                      Logout
                    </Menu.Item>

                  </Menu>
                )}
                trigger={['click']}>
                <a className="dashboard-Data-1-dropdown"
                  onClick={e => e.preventDefault()}>
                  <> < DehazeIcon /></>
                </a>
              </Dropdown>
            </div>
          </div>


        </div>
        {/* <div className='dashboard-container2-screens'> */}
        <Switch>
          <Route path={`${path}/IncompleteStudies`}><IncompleteStudies /></Route>
          <Route path={`${path}/CompleteStudies`}><CompleteStudies /></Route>
          <Route path={`${path}/ProfileEdit`}><ProfileEdit /></Route>
          <Route path={`${path}/Imagelist`}><Imagelist /></Route>
        </Switch>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Dashboard
