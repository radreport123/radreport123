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
function Imagelist() {




    const submittt = async (event) => {
        event.preventDefault()


    }
 

    useEffect(async () => {



    }, []);

    return (
 
            <div className='Update-container-main'>
                <form className='dropbox-sub-container-update' onSubmit={submittt}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Your Image List</FormLabel>
                   

                    </FormControl>
                    <Scrollbars >
                        <div style={{ paddingLeft: "20px", paddingRight: "40px" }}>
                          
                        </div>
                    </Scrollbars>
                    <div className="container">
                        <button type='submit' style={{ width: "15%", float: "right" }} className='btn btn-submit'>Update</button>
                    </div>
                </form>


            </div>

         

         

    )
}

export default Imagelist
