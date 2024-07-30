import React, { useEffect } from "react";
import { useState } from "react";
// import "./LoginDoctor.css";
import './allcss.css';
import Web3 from "web3";
import { Link } from "react-router-dom";
import { ADD, ABI } from "./AddAndAbi";
import ProfileDoctor from "./ProfileDoctor";
import Swal from "sweetalert2";


const LoginDoctor = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);
    const [dashboardDetails, setDashboardDetails] = useState({ fid: '1', name: 'Anshu', special: 'lungs', contri: '100' });


    const sweetAlertSuccess = (res = "successfully sent") => {
        Swal.fire({
            title: "Success",
            text: res,
            icon: "success"
        })
    }

    const sweetAlertError = (res = "Oops Error Occured. Please Try Again.") => {
        Swal.fire({
            title: "Error",
            text: res,
            icon: "error"
        })
    }

    const detectProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
            // console.log("window.ethereum");
        } else if (window.web3) {
            provider = window.web3.currentProvider;
            // console.log("window.web3");
        } else {
            console.log("non-ethereum browser");
        }
        return provider;
    }

    const onConnect = async (username, password) => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                // const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                const res = await ContractInstance.methods.checkPasswordDoctor(username).call();
                // console.log(res);
                if (res === password) {
                    const logD = await ContractInstance.methods.getDoctorDetails(username).call();
                    setDashboardDetails({ fid: logD[1], name: logD[0], special: logD[2], contri: logD[3] });
                    console.log("log in successful");
                    sweetAlertSuccess(`Loged in: Welcome ${username}`);
                    setLoginStatus(true);
                }
                else {
                    console.log("user not found");
                    sweetAlertError("User Not Found");
                }
            }
        } catch (error) {
            console.log("Error at LoginDoctor");
            console.log(error);
            sweetAlertError("Error in Contract Connection");
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
        onConnect(username, password);

    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    return (
        <>
            <h1 className="legal-siteTitle">
                <Link to="/">
                Medicia <span className="legal-siteSign">+</span>
                </Link>
            </h1>
            <div >
                {
                    !loginStatus &&
                    <div className="sign-manu1">
                        <div className="signin1">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h2 className="form-title1">Login as Doctor</h2>
                                <div className="form-group">
                                    <label htmlFor="username" className="form-label2">ID</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-input"
                                        placeholder="Enter your ID"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label1">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-input"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-submit" id="submitloginDoc">Login</button>
                            </form>
                            <div className="newDoctor">
                                <Link to="">Forget Password</Link>
                            </div>
                            <div className="newDoctor">
                                Create new account as Doctor <Link to="/signDoctor" id="newDoc" >Sign Up</Link>
                            </div>
                        </div>
                    </div>
                }
                {
                    loginStatus && <ProfileDoctor detail={dashboardDetails} setLoginStatus={setLoginStatus} />
                }
            </div>
            <div className="legal-footer">
                <p>© 2024 Medicia+. All rights reserved.</p>
            </div>
        </>
    );
}

export default LoginDoctor;