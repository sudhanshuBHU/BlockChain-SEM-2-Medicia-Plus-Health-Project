import React, { useRef, useState } from "react";
// import "./PopupModalRating.css";
import './allcss.css';
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import Swal from "sweetalert2";

const PopupModalRating = ({ onClose, docId }) => {

    const [valueTime, setValueTime] = useState(30);
    const [valueFee, setValueFee] = useState(30);
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

                const res = await ContractInstance.methods.setRating(docId,valueFee,valueTime).send({ from: userAccounts[0], gas: 3000000 });
               
                console.log("Rated sccessfully");
                sweetAlertSuccess("Rated Successfully");
            }
        } catch (error) {
            console.log("Error at popupModalRating");
            console.error(error);
            sweetAlertError("Error in rating Doctor");
        }
    }

    //rating submit handler
    const ratingSubmitHandler = async () => {
        // console.log(docId);
        // console.log(valueFee);
        // console.log(valueTime);
        await onConnect();
        onClose(false);
    }
    return (
        <div ref={modalRef} onClick={closeHandler} className="popupDivWraper">
            <div className="popupContainerRating">
                <div className="popupHeader">
                    <span className="form-label1" style={{ marginTop: "0" }}>Rate accordingly</span>
                    <span onClick={() => onClose(false)} style={{ cursor: "pointer" }}>X</span>
                </div>
                <div className="popupForm">
                    <div className="timing">
                        <label>Time: </label>
                        <div className="sliderContainer">
                            <input type="range" min="1" step="1" max="50" value={valueTime} onChange={(e) => setValueTime(e.target.value)} className="slider" />
                            <span id="sliderText">{valueTime / 10} stars</span>
                        </div>
                    </div>
                    <div className="timing">
                        <label id="fees">Fees: </label>
                        <div className="sliderContainer">
                            <input type="range" min="1" step="1" max="50" value={valueFee} onChange={(e) => setValueFee(e.target.value)} className="slider" />
                            <span id="sliderText">{valueFee / 10} stars</span>
                        </div>
                    </div>
                </div>
                <button className="about" id="rating-btn" onClick={ratingSubmitHandler}>Submit</button>
            </div>
        </div>
    );
}
export default PopupModalRating;