import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import "./topbar.css"
import {useContext} from "react";

//  activities, register,         home, profile, logout
// style={{textDecoration: "none"}}

export default function TopBar() {

  const handleLogout = async (e) => {
    localStorage.removeItem('user');
    window.location.replace("/");
  }

  const user = localStorage.getItem('user');

  if(user) {
    return <div className='top box-shadow'>
        <Link className="topLeft" to="/"><div>HOME</div></Link>
        <Link className="topLeft" to="/event"><div>YOUR ACTIVITIES</div></Link>
        <Link className="topRight" to="/register"><div>REGISTER</div></Link>
        <Link className="topRight" to="/profile"><div>PROFILE</div></Link>
      <div onClick={handleLogout} className="topRight">LOGOUT</div>
    </div>
  }

  return (
    <div className='top box-shadow'>
      <Link className="topLeft" to="/"><div>HOME</div></Link>
      <Link className="topRight" to="/signup"><div>SIGN UP</div></Link>
      <Link className="topRight" to="/login"><div>LOGIN</div></Link>
    </div>
      
  )
}


