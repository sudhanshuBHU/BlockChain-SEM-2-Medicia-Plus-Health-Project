// import './CheckResponseDoctor.css';
import './allcss.css';
import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import Swal from "sweetalert2";


const ReportPopupDoctor = ({ onClose, crossCheckInfo }) => {

    // const [patientDescription, setPatientDescription] = useState('');
    const modalRef = useRef();
    const [desc, setdesc] = useState('');

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
    const checkSubmitHandler = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);

                const NP = await ContractInstance.methods.crossCheckResponseSender(crossCheckInfo.from_id, parseInt(crossCheckInfo.indexPatient), desc, crossCheckInfo.to, parseInt(crossCheckInfo.indexDoctor)).send({ from: userAccounts[0], gas: 3000000 });
                sweetAlertSuccess("Report is OK send to " + `${crossCheckInfo.from_id}`);
                console.log("Report is OK send to " + `${crossCheckInfo.from_id}`);
            }
        } catch (error) {
            console.log("Error at Check response");
            console.error(error);
            sweetAlertError("Error in Popup check response Doctor");
        }
        onClose(false);
    }
    const rejectSubmitHandler = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);

                const NP = await ContractInstance.methods.crossCheckRejectSender(crossCheckInfo.from_id, parseInt(crossCheckInfo.indexPatient), desc, crossCheckInfo.to, parseInt(crossCheckInfo.indexDoctor)).send({ from: userAccounts[0], gas: 3000000 });
                sweetAlertSuccess("Report is FALSE send to " + `${crossCheckInfo.from_id}`);
                console.log("Report is FALSE send to " + `${crossCheckInfo.from_id}`);
            }
        } catch (error) {
            console.log("Error at Check response");
            console.error(error);
            sweetAlertError("Error in Popup check response Doctor");
        }
        onClose(false);
    }


    return (
        <div ref={modalRef} onClick={closeHandler} className="popupDivWraper">
            <div className="popupContainerRating" style={{ height: "auto" }}>
                <div className="popupHeader">
                    <span className="form-label1" style={{ marginTop: "0", color: "orange", fontSize: "1.5rem" }}>Send Cross Check Report</span>
                    <span onClick={() => onClose(false)} style={{ cursor: "pointer" }}>X</span>
                </div>
                <div className="popupForm">
                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="desc" className="formDoc1">Description</label>
                            <input
                                type="text"
                                id="desc"
                                className="form-input"
                                placeholder="Write some message here..."
                                value={desc}
                                onChange={(e) => setdesc(e.target.value)}
                            />
                        </div>
                        <div className="submitResetButton">
                            <button type="submit" className="submitDoc" onClick={checkSubmitHandler}>Report is OK</button>
                            <button type="submit" className="submitDoc" onClick={rejectSubmitHandler}>Report is False</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReportPopupDoctor;