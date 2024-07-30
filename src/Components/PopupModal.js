import React, { useRef, useState } from "react";
// import "./PopupModal.css";
import './allcss.css';
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import Swal from "sweetalert2";

const PopupModal = ({ onClose, id, selectedDoc, selectedSpec, selectedDocId }) => {
    const modalRef = useRef();
    const [popupFormDetail, setPopupFormDetail] = useState({ to: selectedDocId, from: id, problem: '', description: '' })

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

    const formChangeHandler = (e) => {
        setPopupFormDetail({ ...popupFormDetail, [e.target.name]: e.target.value });
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
    const onConnect = async (details) => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                // console.log("details->", details);
                // console.log(userAccounts[0]);
                const res = await ContractInstance.methods.setNotificationPatient(details.to, details.from, details.problem, details.description).send({ from: userAccounts[0], gas: 3000000 });
                // const res = await ContractInstance.methods.setNotificationPatient("D1", "1", "fever", "custom writing").send({ from: userAccounts[0], gas: 3000000 });
                // const res = await ContractInstance.methods.setReportPatient("1", "D1", "fever", "askjdh").send({ from: userAccounts[0], gas: 300000 });
                // console.log(res);
                // console.log("done");
                console.log("notification added sccessfully");
                sweetAlertSuccess("Request sent to Doctor");
            }
        } catch (error) {
            console.log("Error at popupModal");
            console.log(error);
            sweetAlertError("Error in sending request to doctor");
        }
    }

    const closeHandler = (e) => {
        if (modalRef.current === e.target)
            onClose(false);
        // console.log("close handler called");
    }
    const bookAppointmentHandler = async () => {
        console.log("done");
        console.log(popupFormDetail);
        await onConnect(popupFormDetail);
        onClose(false);
    }

    return (
        <div ref={modalRef} onClick={closeHandler} className="popupDivWraper">
            <div className="popupContainer">
                <div className="popupHeader">
                    <span className="form-label1" style={{ marginTop: "0" }}>Fill the form</span>
                    <span onClick={() => onClose(false)} style={{ cursor: "pointer" }}>X</span>
                </div>
                <div className="form-label1">
                    {selectedDoc} - {selectedSpec}
                </div>
                <div className="popupForm">
                    <label htmlFor="problem">Enter your problem</label>
                    <input type="text" name="problem" placeholder="Type here" onChange={formChangeHandler} />
                    <label htmlFor="description">Enter Description</label>
                    <textarea name="description" placeholder="Type here" onChange={formChangeHandler} style={{ width: "25rem", marginBottom: "1.5rem", padding: "1rem" }}></textarea>
                    <button className="submitDoc" onClick={bookAppointmentHandler}>Book Appointment</button>
                </div>
            </div>
        </div>
    );
}


export default PopupModal;