import React, { useRef, useState } from "react";
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import Swal from "sweetalert2";
// import './PopupApproveDoctor.css'
import './allcss.css';

const PopupApproveDoctor = ({ onClose, pid, did, indexPatient, indexDoctor }) => {

    const [patientDescription, setPatientDescription] = useState('');
    const modalRef = useRef();

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
                console.log("details called params: ", did, indexDoctor, pid, indexPatient, patientDescription);
                // const OP = await ContractInstance.methods.checkPasswordPatient(id).call();

                const NP = await ContractInstance.methods.approveHandlerPopupDoctor(did, indexDoctor, pid, indexPatient, patientDescription).send({ from: userAccounts[0], gas: 3000000 });
                sweetAlertSuccess("Approved patient with ID: " + `${pid}`);
                console.log("Approved patient with ID: " + `${pid}`);
            }
        } catch (error) {
            console.log("Error at PopupApproveDoctor");
            console.error(error);
            sweetAlertError("Error in Popup Approve Doctor");
        }
    }

    //rating submit handler
    const approveHandlerPop = async () => {

        onConnect();
        onClose(false);
        // console.log(patientDescription);

    }

    const rejectHandler = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                console.log("details called params: ", did, indexDoctor, pid, indexPatient, patientDescription);
                // const OP = await ContractInstance.methods.checkPasswordPatient(id).call();

                const NP = await ContractInstance.methods.rejectHandlerPopupDoctor(did, indexDoctor, pid, indexPatient, patientDescription).send({ from: userAccounts[0], gas: 3000000 });
                sweetAlertSuccess("Reject patient with ID: " + `${pid}`);
                console.log("Reject patient with ID: " + `${pid}`);
            }
        } catch (error) {
            console.log("Error at PopupApproveDoctor");
            console.error(error);
            sweetAlertError("Error in Popup Approve Doctor");
        }
        onClose(false);
    }
    return (
        <div ref={modalRef} onClick={closeHandler} className="popupDivWraper">
            <div className="popupContainerRating" style={{ height: "auto" }}>
                <div className="popupHeader">
                    <span className="form-label1" style={{ marginTop: "0", fontSize: "1.5rem" }}>Approving Form</span>
                    <span onClick={() => onClose(false)} style={{ cursor: "pointer" }}>X</span>
                </div>
                <div className="popupForm">
                    <div className="form-group">
                        <label htmlFor="approval" className="form-label2">Add Description for Patient</label>
                        <textarea
                            id="approval"
                            className="textareaApprove"
                            placeholder="Add description here"
                            value={patientDescription}
                            onChange={(e) => setPatientDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <button className="about" id="rating-btn" onClick={approveHandlerPop}>Approve</button>
                    <button className="about" id="rating-btn" onClick={rejectHandler} style={{marginLeft:"3rem"}}>Reject</button>
                </div>
            </div>
        </div>
    );
}
export default PopupApproveDoctor;