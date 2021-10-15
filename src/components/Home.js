import Header from './Header'
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import axios from 'axios';
import ButtonConainer from './ButtonConainer';

import DropboxScreen from './DropboxScreen';
import CreateAccountScreen from './CreateAccountScreen';

function Home() {
  const history = useHistory();
  const [responseDataShow, setresponseDataShow] = useState('');

  useEffect(async () => {

    var responseDATAVALUE;
    const MRNVALUE = localStorage.getItem("MRN");
    const EMAILVALUE = localStorage.getItem("Email");
    if (!MRNVALUE && !EMAILVALUE) { }
    else {
      // console.log(MRNVALUE)
      await axios.get('/GETDATA/' + MRNVALUE + '/' + EMAILVALUE
      ).then((response) => { responseDATAVALUE = response.data.Item != null ? response.data.Item.MRN : 'null' })

      if (responseDATAVALUE != 'null') {

        history.push("/Dashboard")
      }
      else {
        setresponseDataShow(responseDATAVALUE)

      }
    }
  }, [responseDataShow]);

  return (
    responseDataShow == ''
      ?
    responseDataShow == '' &&

    <div className="container">
      <div className="sub-container">
        <ButtonConainer />
      </div>
    </div>
    :
    <div></div>
  );
}

export default Home;
