import React from "react";
import ControlledCarousel from "./ControlledCarousel";
import Counter from "./Counter";
import SignContainer from "./SignContainer";
// import "./Main.css";
import './allcss.css';
import SignIn from "./SignIn";
import Test from "./Test";
import CheckWallet from "./CheckWallet";
import ProfileDoctor from "./ProfileDoctor";
import ProfilePatient from './ProfilePatient';


const Main = () => {
    return (
        <div className="main-container">
            {/* <div className="carouselAndSide"> */}
            {/* <ControlledCarousel /> */}
            <SignContainer />
            {/* </div> */}
            {/* <ProfileDoctor/> */}
            {/* <Test/> */}
            {/* <SignIn/> */}
            {/* <Counter /> */}
            <CheckWallet/>
            {/* <ProfilePatient/> */}
        </div>
    );
}

export default Main;