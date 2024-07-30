import React from "react";
// import "./SignContainer.css";
import './allcss.css';
import { Link } from "react-router-dom";

const SignContainer=()=>{
    return (
        <div className="signContainer-wrapper">
            <p className="signContainerPara">Welcome To Health-Care</p>
            <Link to="/loginList" className="about" id="sign-btn" >Log In</Link>
            <Link to="/signupList" className="about" id="sign-btn" >Sign Up</Link>
        </div>
    );
}

export default SignContainer;