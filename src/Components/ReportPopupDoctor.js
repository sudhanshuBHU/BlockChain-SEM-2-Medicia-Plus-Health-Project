import React, { useRef, useState } from "react";
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import Swal from "sweetalert2";
// import './ReportPopupDoctor.css'
import './allcss.css';

const ReportPopupDoctor = ({ onClose, pid, did, indexPatient, indexDoctor,problem }) => {

    // const [patientDescription, setPatientDescription] = useState('');
    const modalRef = useRef();
    const [desc,setdesc] = useState('');

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
    const reportHandler = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                console.log("details called params: ", did, indexDoctor, pid, indexPatient, desc);
                // const OP = await ContractInstance.methods.checkPasswordPatient(id).call();

                const NP = await ContractInstance.methods.reportSendHandlerPopupDoctor(did, pid,problem, desc,indexPatient,indexDoctor).send({ from: userAccounts[0], gas: 3000000 });
                sweetAlertSuccess("Report send to patient with ID: " + `${pid}`);
                console.log("Report send to patient with ID: " + `${pid}`);
            }
        } catch (error) {
            console.log("Error at ReportPopupDoctor");
            console.error(error);
            sweetAlertError("Error in Popup Approve Doctor");
        }
        onClose(false);
    }
    return (
        <div ref={modalRef} onClick={closeHandler} className="popupDivWraper">
            <div className="popupContainerRating" style={{ height: "auto" }}>
                <div className="popupHeader">
                    <span className="form-label1" style={{ marginTop: "0",color:"orange", fontSize: "1.5rem" }}>Send Reports</span>
                    <span onClick={() => onClose(false)} style={{ cursor: "pointer" }}>X</span>
                </div>
                <div className="popupForm">
                    <div className="form-group">
                        <h2 className="formdoc">Enter Patient Details</h2>
                        <div className="form-group">
                            <label htmlFor="patientId" className="formDoc1">Patient ID</label>
                            <input
                                type="text"
                                id="patientId"
                                className="form-input"
                                placeholder={pid}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="problem" className="formDoc1">Enter Problem</label>
                            <input
                                type="text"
                                id="problem"
                                className="form-input"
                                placeholder={problem}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="desc" className="formDoc1">Description</label>
                            <input
                                type="text"
                                id="desc"
                                className="form-input"
                                placeholder="Write Prescription here"
                                value={desc}
                                onChange={(e) => setdesc(e.target.value)}
                                required
                            />
                        </div>
                        <div className="submitResetButton">
                            <button type="submit" className="submitDoc" onClick={reportHandler}>Send Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReportPopupDoctor;