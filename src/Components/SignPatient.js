import React, { useEffect } from "react";
import { useState } from "react";
import Web3 from "web3";
import { Link } from "react-router-dom";
import { ADD, ABI } from "./AddAndAbi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import "./SignPatient.css";
import './allcss.css';


const SignPatient = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pwdMsg, setPwdMsg] = useState('');
    const [rePassword, setRePassword] = useState('');
    const navigate = useNavigate();



    const sweetAlertSuccess = () => {
        Swal.fire({
            title: "Success",
            text: `${username} has been registered`,
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
                const userAccounts = await web3.eth.getAccounts();
                // setAccountName(userAccounts[0]);
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                // console.log(ContractInstance);
                const existingUser = await ContractInstance.methods.checkPasswordPatient(username).call();
                console.log("existing usser->", existingUser);
                if (existingUser === '') {
                    // const response = 
                    await ContractInstance.methods.newRegistrationPatient(username, password).send({ from: userAccounts[0], gas: 300000 });
                    // console.log("response->", response);
                    // if (response === true) {
                    console.log(`${username} has been registered`);
                    sweetAlertSuccess();
                    setUsername('');
                    setPassword('');
                    setRePassword('');
                    navigate('/logPatient');
                    return;
                    // }
                    // return true;
                } else {
                    sweetAlertError(`${username} already exists. Try loging in.`);
                    navigate('/logPatient');
                    return;
                }
            }
        } catch (error) {
            console.log("Error at signPatient");
            console.log(error);
        }
        // return false;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Password:", password);
        if (rePassword === password) {
            // const res = 
            await onConnect(username, password);
            // console.log("after sign up return value->", res);
            // if (res === true) {
            //     setUsername('');
            //     setPassword('');
            //     setRePassword('');
            // } else {
            //     sweetAlertError("Problem in gas transaction, Try again");
            // }
        } else {
            console.log("Password didn't matched");
            sweetAlertError("Password didn't matched");
        }
    }

    const rePasswordHandler = (e) => {
        setRePassword(e.target.value);
        if (e.target.value !== password) { setPwdMsg("Password doesn't match."); }
        else setPwdMsg('');
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (password === "") setPwdMsg('');
    }



    return (
        <>
            <h1 className="legal-siteTitle">
                <Link to="/">
                Medicia <span className="legal-siteSign">+</span>
                </Link>
            </h1>
            <div className="sign-manu1">
                <div className="signinDoc">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2 className="form-title1">Register as a Patient</h2>
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
                            <label htmlFor="password" className="form-label1">Create Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={password}
                                onChange={passwordHandler}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rePassword" className="form-label1">Re-Enter Password</label>
                            <input
                                type="password"
                                id="rePassword"
                                className="form-input"
                                placeholder="Enter your password"
                                value={rePassword}
                                onChange={rePasswordHandler}
                                required
                            />
                        </div>
                        <p className="passwordErrorMsg">{pwdMsg}</p>
                        <button type="submit" className="btn-submit" id="submitloginDoc">Create an Account</button>
                    </form>
                    <div className="logDoc">
                        Already have an account?<Link to="/logPatient" id=""> Log in</Link>
                    </div>
                </div>
            </div>
            <div className="legal-footer">
                <p>© 2024 Medicia+. All rights reserved.</p>
            </div>
        </>
    );
}

export default SignPatient;