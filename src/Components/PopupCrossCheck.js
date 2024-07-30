// import './PopupCrossCheck.css';
import './allcss.css';
import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import Swal from "sweetalert2";


const PopupCrossCheck = ({ onClose, crossReport, notificationIndex, pid }) => {

    const modalRef = useRef();
    const [topsisIndexProvider, setTopsisIndexProvider] = useState([]);
    const [finalDoctorList, setFinalDoctorList] = useState([]);
    const [finalRatingList, setFinalRatingList] = useState([]);
    const [doctorSelection, setDoctorSelection] = useState('');
    const [displayList, setDisplayList] = useState(false);
    const [selectedDoctorIndex, setSelectedDoctorIndex] = useState('');

    let allDoctorList = [];
    let allRatingList = [];
         
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

    const topsisHandler = (tempArray) => {
        // finding F and T
        // F = sqrt(sum(fi ^ 2));
        // T = sqrt(sum(ti ^ 2));
        let F = 0;
        let T = 0;
        for (let i = 0; i < tempArray.length; i++) {
            F += (parseFloat(tempArray[i].fee) / 10) * (parseFloat(tempArray[i].fee) / 10);
            T += (parseFloat(tempArray[i].time) / 10) * (parseFloat(tempArray[i].time) / 10);
        }

        F = Math.sqrt(F);
        T = Math.sqrt(T);
        // console.log("f: ", F);
        // console.log("t: ", T);

        //step 2: 2D array to store values
        let array2d = [];
        let idealMaxFee = 0;
        let idealMinFee = 100;
        let idealMaxTime = 0;
        let idealMinTime = 100;
        for (let i = 0; i < tempArray.length; i++) {
            let ele1 = (parseFloat(tempArray[i].fee) / 10) / F;
            let ele2 = (parseFloat(tempArray[i].time) / 10) / T;

            //finding ideal best and worst values
            array2d.push([ele1 * 0.25, ele2 * 0.25]);
            idealMaxFee = Math.max(idealMaxFee, ele1 * 0.25);
            idealMinFee = Math.min(idealMinFee, ele1 * 0.25);
            idealMaxTime = Math.max(idealMaxTime, ele2 * 0.25);
            idealMinTime = Math.min(idealMinTime, ele2 * 0.25);
        }
        // Evaluating Euclidean distance from ideal best
        let finalScore = [];
        for (let i = 0; i < array2d.length; i++) {
            let pdistanceFee = Math.sqrt(Math.pow(array2d[i][0] - idealMaxFee, 2) + Math.pow(array2d[i][1] - idealMaxTime, 2));
            let ndistanceFee = Math.sqrt(Math.pow(array2d[i][0] - idealMinFee, 2) + Math.pow(array2d[i][1] - idealMinTime, 2));
            let topsisScore = ndistanceFee / (ndistanceFee + pdistanceFee);
            if (!topsisScore) topsisScore = 0;
            finalScore.push([topsisScore, i]);
        }
        finalScore.sort((a, b) => b[0] - a[0]);
        setTopsisIndexProvider(finalScore);
        // console.log("scores-> ", finalScore);
    }

    const retrieveAllDoctor = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                // const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                const len = parseInt(await ContractInstance.methods.fetchAllDoctorLength().call());
                // console.log("length: ",len);

                for (let i = 0; i < len; i++) {
                    let doc = await ContractInstance.methods.fetchAllDoctorDetails(i).call();
                    allDoctorList.push(doc);
                }
                // console.log("useEffefct: ",docArray);

                for (let i = 0; i < len; i++) {
                    let rate = await ContractInstance.methods.fetchAllDoctorRating(i).call();
                    allRatingList.push(rate);
                }
                // setDoctorAllRatingFetched(tempRatingArray);
                // setDoctorFetchedDetails(docArray);
                console.log("rating details", allRatingList);
                console.log("details ->", allDoctorList);
            }
        } catch (error) {
            console.log("Error at profile patient");
            console.error(error);
        }
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
                let selection = topsisIndexProvider[selectedDoctorIndex][1];
                // console.log(selection);
                // console.log(pid,crossReport.problem,crossReport.reports,finalDoctorList[selection].licenseId,crossReport.from_name );
                const NP = await ContractInstance.methods.crossCheckHandler(pid, crossReport.problem, crossReport.reports, finalDoctorList[selection].licenseId, crossReport.from_name).send({ from: userAccounts[0], gas: 3000000 });
                sweetAlertSuccess(`crossChecked request sent to ${finalDoctorList[selection].name}`);
                console.log(`crossChecked request sent to ${finalDoctorList[selection].name}`);
            }
        } catch (error) {
            console.log("Error at PopupCrossCheck");
            console.error(error);
            sweetAlertError("Error in Popup crosscheck patient");
        }
    }


    const handleSubmit = async () => {
        // let allDoctorList = []

        await retrieveAllDoctor();
        let tempdataDoc = [];
        let tempArrayForFilterRatings = [];
        console.log(doctorSelection);
        console.log("all doctor: ", allDoctorList);
        // tempdataDoc = allDoctorList.filter(element => element.specialization === doctorSelection);
        tempdataDoc = allDoctorList.filter((element, index) => {
            if (element.specialization === doctorSelection) {
                tempArrayForFilterRatings.push(allRatingList[index]);
            }
            return element.specialization === doctorSelection;
        });
        topsisHandler(tempArrayForFilterRatings);
        setFinalDoctorList(tempdataDoc);
        setFinalRatingList(tempArrayForFilterRatings);

        // console.log("details: ");
        // console.log(tempdataDoc);
        // console.log(tempArrayForFilterRatings);
        // console.log(topsisIndexProvider);
        // console.log(finalDoctorList);
        // console.log(finalRatingList);
        setDisplayList(true);
    }

    const reCheckHandler = () => {
        // console.log("selected doctor with details: ");
        // console.log(selectedDoctorIndex);
        // console.log(finalDoctorList[selectedDoctorIndex]);
        // console.log(crossReport);
        onConnect();
        onClose(false);

    }

    return (
        <div ref={modalRef} onClick={closeHandler} className="popupDivWraper">
            <div className="popupContainerCross" >
                <div className="wrapperPatientCross">
                    <h2 className="formdoc">Enter Details</h2>
                    <div className="lookingFor">
                        <label htmlFor="category" style={{ color: "orange" }}>Select Doctor for Cross Check</label>
                        <select className="category" id="category" onClick={(e) => setDoctorSelection(e.target.value)}>
                            <option value="cardiologist">Cardiologist</option>
                            <option value="physician">Physician</option>
                            <option value="dermatologist">Dermatologist</option>
                            <option value="pulmonologist">Pulmonologist</option>
                            <option value="neurologist">Neurologist</option>
                        </select>
                    </div>
                    <div className="submitResetButton">
                        <button type="submit" className="submitDoc" onClick={handleSubmit}>Search</button>
                    </div>
                </div>

                <div className="wrapperPatientCrossList">
                    {displayList &&
                        <div>
                            <div className="headerDoc">
                                <div className="form-label1">Selected</div>
                                <div className="form-label1">Ratings</div>
                                <div className="form-label1">Name</div>
                                <div className="form-label1">Specialization</div>
                            </div>
                            <div>
                                {
                                    topsisIndexProvider.map((element, index) => {
                                        return (
                                            <div className="headerDoc" key={index}>
                                                <input type="radio" className="radio" name="doctor" value={index} onChange={e => setSelectedDoctorIndex(e.target.value)} />
                                                <div className="finalRating">{parseInt(finalDoctorList[element[1]].finalRating) / 10}</div>
                                                <div className="nameCol">{finalDoctorList[element[1]].name}</div>
                                                <div className="specCol">{finalDoctorList[element[1]].specialization}</div>
                                                <div></div>
                                                <div></div>
                                                <div className="feeCol">Fee Rating: {parseInt(finalRatingList[element[1]].fee) / 10}</div>
                                                <div className="timeCol">Time Rating: {parseInt(finalRatingList[element[1]].time) / 10}</div>

                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className="doctorSubmit">
                                <button className="submitDoc" onClick={reCheckHandler}>Claim for Re-Check</button>
                            </div>
                        </div>
                    }

                </div>

            </div>
        </div>
    );
}
export default PopupCrossCheck;