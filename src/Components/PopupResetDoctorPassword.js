// import './PopupResetDoctorPassword.css';
import './allcss.css';
import React, { useRef, useState } from "react";
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import Swal from "sweetalert2";

const PopupResetDoctorPassword = ({ onClose, id }) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const modalRef = useRef();
    // id="1";

    const closeHandler = (e) => {
        if (modalRef.current === e.target)
            onClose(false);
    }

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
        } else if (window.web3) {
            provider = window.web3.currentProvider;
        } else {
            console.log("non-ethereum browser");
        }
        return provider;
    }
    const onConnect = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                const OP = await ContractInstance.methods.checkPasswordDoctor(id).call();
                console.log("op->", OP);
                console.log("old->", oldPassword);
                if (OP === oldPassword) {
                    const NP = await ContractInstance.methods.resetDoctorPassword(id, newPassword).send({ from: userAccounts[0], gas: 3000000 });
                    console.log(`Password changed successfully of id: ${id}`);
                    sweetAlertSuccess("Password changed Successfully");
                } else {
                    sweetAlertError("Incorrect Old Password");
                }
            }
        } catch (error) {
            console.log("Error at PopupResetDoctorPassword");
            console.error(error);
            sweetAlertError("Error in Popup Reset Password Doctor");
        }
    }

    //rating submit handler
    const resetHandler = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            sweetAlertError("Please fill all fields");
        }
        else if (newPassword === confirmPassword) {
            await onConnect();
            // console.log(id);
            onClose(false);

        } else {
            sweetAlertError("New password and confirm password do not match");
        }
        // console.log(oldPassword);
        // console.log(newPassword);
        // console.log(confirmPassword);
    }
    return (
        <div ref={modalRef} onClick={closeHandler} className="popupDivWraper">
            <div className="popupContainerRating" style={{ height: "auto" }}>
                <div className="popupHeader">
                    <span className="form-label1" style={{ marginTop: "0" }}>Reset Password</span>
                    <span onClick={() => onClose(false)} style={{ cursor: "pointer" }}>X</span>
                </div>
                <div className="popupForm">
                    <div className="form-group">
                        <label htmlFor="oldPassword" className="form-label2">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            className="form-input"
                            placeholder="Enter your ID"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword" className="form-label1">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-input"
                            placeholder="Enter your password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label1"> Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="form-input"
                            placeholder="Enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className="about" id="rating-btn" onClick={resetHandler}>Change Password</button>
            </div>
        </div>
    );
}
export default PopupResetDoctorPassword;