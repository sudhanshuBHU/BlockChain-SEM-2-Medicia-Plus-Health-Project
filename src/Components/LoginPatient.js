import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProfilePatient from './ProfilePatient';
import { ADD, ABI } from "./AddAndAbi";
import Web3 from "web3";
import Swal from "sweetalert2";
// import "./LoginDoctor.css"
import './allcss.css';

const LoginPatient = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(false);

    // const [showNotification,setShowNotification] = useState([]);

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

    // const onConnectfetchNotification = async (fetchId) => {
    //     try {
    //         const currProvider = detectProvider();
    //         if (currProvider) {
    //             await currProvider.request({ method: 'eth_requestAccounts' });
    //             const web3 = new Web3(currProvider);
    //             // const userAccounts = await web3.eth.getAccounts();
    //             const ContractInstance = new web3.eth.Contract(ABI, ADD);
    //             // let notificationTrail = [];
    //             // setShowNotification(notificationTrail);
    //             let notificationTrail = await ContractInstance.methods.getNotificationPatient(fetchId).call();
    //             // console.log(notificationTrail);
    //             if (!notificationTrail) {
    //                 notificationTrail = [];
    //                 console.log("nothing is found in notification section in Contract");
    //             }
    //             notificationTrail.reverse();
    //             // console.log("notification->", notificationTrail);
    //             setShowNotification(notificationTrail);
    //             // console.log("here");
    //             // console.log("using state-> ", showNotification);

    //         }
    //     } catch (error) {
    //         console.log("Error at profile patient at login patient");
    //         console.error(error);
    //     }
    // }
    const detectProvider = () => {
        let provider;
        if (window.ethereum) {
            provider = window.ethereum;
        } else if (window.web3) {
            provider = window.web3.currentProvider;
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

                const res = await ContractInstance.methods.checkPasswordPatient(username).call();
                // console.log(res);
                if (res === password) {
                    console.log("log in successful");
                    // onConnectfetchNotification(username);
                    sweetAlertSuccess(`loged in as ${username}`);
                    setLoginStatus(true);
                }
                else if (res !== '' && res !== password) {
                    console.log("Incorrect Password");
                    sweetAlertError("Incorrect Password");
                } else {
                    console.log("User not found");
                    sweetAlertError("User not found");
                }
            }
        } catch (error) {
            console.log("Error at LoginDoctor");
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Username:", username);
        // console.log(typeof(username));
        console.log("Password:", password);
        await onConnect(username, password);
        setPassword('');
    }
    return (
        <>
            <h1 className="legal-siteTitle">
                <Link to="/">
                Medicia <span className="legal-siteSign">+</span>
                </Link>
            </h1>
            <div className="loginPatientDiv">
                {!loginStatus &&
                    <div className="sign-manu1">
                        <div className="signin1">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h2 className="form-title1">Login as Patient</h2>
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
                                Create new account as Patient <Link to="/signPatient" id="newDoc" >Sign Up</Link>
                            </div>
                        </div>
                    </div>
                }
                {
                    loginStatus && <ProfilePatient id={username} setLoginStatus={setLoginStatus} />
                }
            </div>
            <div className="legal-footer">
                <p>© 2024 Medicia+. All rights reserved.</p>
            </div>
        </>
    );
}

export default LoginPatient;