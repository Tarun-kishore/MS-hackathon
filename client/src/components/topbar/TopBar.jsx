import * as React from 'react';
import { Link } from "react-router-dom";
import "./topbar.css"

//  activities, register, home, profile, logout
// style={{textDecoration: "none"}}

const admin_mobile = "0000000000";

export default function TopBar() {

  const user = JSON.parse(localStorage.getItem('user'));
  var mobile;
  if(user) {
    mobile = user.data.user.mobile;
  }

  // const user = JSON.parse(localStorage.getItem('user')).data.user.mobile;
  // if(user) { console.log(mobile); }

  var admin = false;
  if(mobile == admin_mobile) {
    admin = true;
  }

  const handleLogout = async (e) => {
    localStorage.removeItem('user');
    window.location.replace("/");
  }

  if(!admin && user) {
    return <div className='top box-shadow'>
        <Link className="topLeft" to="/"><div>HOME</div></Link>
        <Link className="topLeft" to="/event"><div>YOUR ACTIVITIES</div></Link>
        <Link className="topRight" to="/profile"><div>PROFILE</div></Link>
        <Link className="topRight" to="/register"><div>REGISTER</div></Link>
        <Link className="topRight" to="/calendar"><div>CALENDAR</div></Link>
      <div onClick={handleLogout} className="topRight">LOGOUT</div>
    </div>
  } else if(admin) {
      return <div className='top box-shadow'>
        <Link className="topLeft" to="/"><div>HOME</div></Link>
        <Link className='topLeft' to="/createEvent">CREATE EVENT</Link>
        <Link className='topRight' to="/activities">ALL ACTIVITIES</Link>
        <Link className='topRight' to="/request">VOLUNTEER REQUEST</Link>
        <Link className="topLeft" to="/calendar"><div>CALENDAR</div></Link>
        <div onClick={handleLogout} className="topRight">LOGOUT</div>
        </div>
  } else {
  return (
    <div className='top box-shadow'>
      <Link className="topLeft" to="/"><div>HOME</div></Link>
      <Link className="topRight" to="/signup"><div>SIGN UP</div></Link>
      <Link className="topRight" to="/login"><div>LOGIN</div></Link>
    </div>
    )
  }
}


