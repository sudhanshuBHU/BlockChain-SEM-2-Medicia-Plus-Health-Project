import React, { useEffect, useState } from "react";
// import './ProfilePatient.css';
import './allcss.css';
import PopupModal from "./PopupModal";
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import PopupModalRating from "./PopupModalRating";
import PopupResetPassword from "./PopupResetPassword";
import PopupCrossCheck from "./PopupCrossCheck";


const ProfileDoctor = (prop) => {
    const id = prop.id;
    // const id = "1";

    let docArray = [];
    var notificationTrail = [];
    var reportsTrail = [];

    const [contributionStatus, setContributionStatus] = useState(false);
    const [addMore, setAddMoreStatus] = useState(false);
    const [clearButton, setClearButton] = useState(false);
    const [noti, setNoti] = useState(true);
    // const [fieldDetails, setFieldDetails] = useState([{ patientId: "loading...", problem: "loading...", desc: "loading...lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll" }]);

    // const [patientId, setpatientId] = useState('');
    // const [problem, setProblem] = useState('');
    // const [desc, setdesc] = useState('');

    const [activeD, setActiveD] = useState('noti');
    // const [showNotification, setShowNotification] = useState([{ id: 'loading...', problem: 'Loading...', desc: 'Loading...' }]);
    const [showNotification, setShowNotification] = useState([]);

    const [showReports, setShowReports] = useState([]);

    // selected doctor id for rating
    const [raingDocId, setRaingDocId] = useState(0);
    const [doctorSelection, setDoctorSelection] = useState('');
    // const [doctorList, setDoctorList] = useState([
    //     { rating: "4.5", name: "Dr Berlin Pandey", spec: "cardiologist" },
    //     { rating: "4.3", name: "Dr Ayesha Khan", spec: "cardiologist" },
    //     { rating: "4.7", name: "Dr Rajesh Kapoor", spec: "cardiologist" },
    //     { rating: "4.6", name: "Dr Pooja Desai", spec: "cardiologist" },
    //     { rating: "4.4", name: "Dr Vikas Singh", spec: "cardiologist" },

    //     { rating: "4.0", name: "Dr Suresh Gupta", spec: "pulmonologist" },
    //     { rating: "4.1", name: "Dr Anil Mehta", spec: "pulmonologist" },
    //     { rating: "3.9", name: "Dr Sunita Sharma", spec: "pulmonologist" },
    //     { rating: "4.3", name: "Dr Vishal Rai", spec: "pulmonologist" },
    //     { rating: "4.2", name: "Dr Reena Joshi", spec: "pulmonologist" },

    //     { rating: "4.7", name: "Dr Anjali Mehta", spec: "neurologist" },
    //     { rating: "4.5", name: "Dr Rohan Nair", spec: "neurologist" },
    //     { rating: "4.6", name: "Dr Neha Kulkarni", spec: "neurologist" },
    //     { rating: "4.4", name: "Dr Arvind Patel", spec: "neurologist" },
    //     { rating: "4.3", name: "Dr Kiran Rao", spec: "neurologist" },

    //     { rating: "4.8", name: "Dr Preeti Sharma", spec: "dermatologist" },
    //     { rating: "4.6", name: "Dr Sanjay Verma", spec: "dermatologist" },
    //     { rating: "4.5", name: "Dr Anisha Roy", spec: "dermatologist" },
    //     { rating: "4.7", name: "Dr Shweta Aggarwal", spec: "dermatologist" },
    //     { rating: "4.4", name: "Dr Manish Gupta", spec: "dermatologist" },

    //     { rating: "4.2", name: "Dr Anil Menon", spec: "physician" },
    //     { rating: "4.3", name: "Dr Kavita Rao", spec: "physician" },
    //     { rating: "4.1", name: "Dr Vikram Singh", spec: "physician" },
    //     { rating: "4.5", name: "Dr Sneha Iyer", spec: "physician" },
    //     { rating: "4.0", name: "Dr Amit Sinha", spec: "physician" }
    // ]);

    // const [doctorList, setDoctorList] = useState([]);
    // setDoctorList(prop.docDetails);

    const [displayList, setDisplayList] = useState(false);
    const [selectedDoctorIndex, setSelectedDoctor] = useState('');

    const [popup, setpopup] = useState(false);
    const [selectedDoctorName, setSelectedDoctrName] = useState('');
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [selectedSpec, setSelectedSpec] = useState('');

    const [doctorFetchedDetails, setDoctorFetchedDetails] = useState([]);
    const [doctorAllRatingFetched, setDoctorAllRatingFetched] = useState([]);
    const [ratePopupStatus, setRatePopupStatus] = useState(false);

    const [finalDoctorMapping, setFinalDoctorMapping] = useState([]);
    const [finalRatingMapping, setFinalRatingMapping] = useState([]);
    const [topsisIndexProvider, setTopsisIndexProvider] = useState([]);

    const [resetPopupStatus, setResetPopupStatus] = useState(false);
    const [crossCheckStatus, setCrossCheckStatus] = useState(false);

    const [crossReport, setCrossReport] = useState();
    const [notificationIndex, setNotificationIndex] = useState(0);

    const clickhandler = () => {
        prop.setLoginStatus(false);
    }

    const addPatient = () => {
        onConnect(); // retrieving all doctor details
        setAddMoreStatus(true);
        setContributionStatus(false);
        setClearButton(true);
        setNoti(false);
        setActiveD('add');
    }

    const viewContri = async () => {
        setAddMoreStatus(false);
        setContributionStatus(true);
        setClearButton(true);
        setNoti(false);
        setActiveD('uploads');
        setDisplayList(false);
        reportHandler();
    }

    const reportHandler = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);

                setShowReports(reportsTrail);
                reportsTrail = await ContractInstance.methods.getReportPatient(id).call();
                if (!reportsTrail) {
                    reportsTrail = [];
                    console.log("nothing is found in reports section in Contract");
                }
                // console.log("after fwtching->", reportsTrail);
                setShowReports(reportsTrail);

            }
        } catch (error) {
            console.log("Error at blockchain Helper at patient profile");
            console.error(error);
        }
    }

    const topsisHandler = (tempArray) => {
        // finding F and T
        // F = sqrt(sum(fi ^ 2));
        // T = sqrt(sum(ti ^ 2));
        let F = 0;
        let T = 0;
        // console.log(tempArray[0].fee);
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
    const onConnect = async () => {
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
                    docArray.push(doc);
                }
                // console.log("useEffefct: ",docArray);
                let tempRatingArray = [];
                for (let i = 0; i < len; i++) {
                    let rate = await ContractInstance.methods.fetchAllDoctorRating(i).call();
                    tempRatingArray.push(rate);
                }
                setDoctorAllRatingFetched(tempRatingArray);
                setDoctorFetchedDetails(docArray);
                // console.log("rating details",tempRatingArray);
                // console.log("details ->",docArray);
            }
        } catch (error) {
            console.log("Error at profile patient");
            console.error(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(doctorSelection);
      
        let tempdataDoc = [];
        let tempArrayForFilterRatings = [];
        // console.log("docArray ", docArray);
        // console.log("doctor fetched", doctorFetchedDetails);
        // tempdataDoc = doctorFetchedDetails.filter(element => element.specialization === doctorSelection);
        tempdataDoc = doctorFetchedDetails.filter((element, index) => {
            if (element.specialization === doctorSelection) {
                tempArrayForFilterRatings.push(doctorAllRatingFetched[index]);
            }
            return element.specialization === doctorSelection;
        });
        // console.log("rating     ",tempArrayForFilterRatings);
        // console.log("tesing->",tempdataDoc);
        // setDoctorFetchedDetails(tempdataDoc);
        // console.log("all doctor list: ",doctorFetchedDetails);
        topsisHandler(tempArrayForFilterRatings);
        setFinalRatingMapping(tempArrayForFilterRatings);
        setFinalDoctorMapping(tempdataDoc);
        // console.log("finalDoctor mapping-> ",finalDoctorMapping);

        setDisplayList(true);
    }

    const clearScreen = () => {
        setAddMoreStatus(false);
        setContributionStatus(false);
        setNoti(false);
        setClearButton(false);
        setDisplayList(false);
        // console.log(prop.docDetails);
    }
    
    const resetHandler = () => {
        setResetPopupStatus(true);
    }

    const notify = () => {
        setNoti(true);
        setAddMoreStatus(false);
        setContributionStatus(false);
        setClearButton(true);
        setActiveD('noti');
        setDisplayList(false);
        onConnectfetchNotification(id);
    }

    const ratingButtonHandler = (index) => {
        setRatePopupStatus(true);
        setRaingDocId(showReports[index].from_id);
        // console.log(showReports[index].from_id);
        // console.log(raingDocId);

    }

    const selectdoctorHandler = (e) => {
        setSelectedDoctor(e.target.value);
    }

    const bookAppointmentButton = () => {
        setpopup(true);
        console.log("index: " + selectedDoctorIndex);
        const tempDoctorList = doctorFetchedDetails.filter(element => element.specialization === doctorSelection);

        console.log(topsisIndexProvider[selectedDoctorIndex]);
        let finalIndex = topsisIndexProvider[selectedDoctorIndex][1];
        console.log("doctor details: " + tempDoctorList[finalIndex].finalRating, tempDoctorList[finalIndex].name, tempDoctorList[finalIndex].specialization);

        setSelectedDoctrName(tempDoctorList[finalIndex].name);
        setSelectedSpec(tempDoctorList[finalIndex].specialization);
        setSelectedDoctorId(tempDoctorList[finalIndex].licenseId);
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

    const onConnectfetchNotification = async (fetchId) => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                // const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                notificationTrail = [];
                setShowNotification(notificationTrail);
                notificationTrail = await ContractInstance.methods.getNotificationPatient(fetchId).call();
                if (!notificationTrail) {
                    notificationTrail = [];
                    console.log("nothing is found in notification section in Contract");
                }
                notificationTrail.reverse();
                // console.log("notification->", notificationTrail);
                setShowNotification(notificationTrail);
                // console.log("using state-> ", showNotification);

            }
        } catch (error) {
            console.log("Error at profile patient");
            console.error(error);
        }
    }

    const crossCheck = (index,input) => {
        setCrossReport(input);
        // console.log(crossReport);
        // console.log(input);
        // console.log("details->", doctorFetchedDetails);
        setCrossCheckStatus(true);
        setNotificationIndex(index);
    }

    // container for fetching ans storing all doctor details from blockchain
    useEffect(() => {
        // console.log("useEffect");
        // const detectProvider = () => {
        //     let provider;
        //     if (window.ethereum) {
        //         provider = window.ethereum;
        //     } else if (window.web3) {
        //         provider = window.web3.currentProvider;
        //     } else {
        //         console.log("non-ethereum browser");
        //     }
        //     return provider;
        // }
        // const onConnect = async () => {
        //     try {
        //         const currProvider = detectProvider();
        //         if (currProvider) {
        //             await currProvider.request({ method: 'eth_requestAccounts' });
        //             const web3 = new Web3(currProvider);
        //             // const userAccounts = await web3.eth.getAccounts();
        //             const ContractInstance = new web3.eth.Contract(ABI, ADD);
        //             const len = parseInt(await ContractInstance.methods.fetchAllDoctorLength().call());
        //             console.log("length: ",len);

        //             for (let i = 0; i < len; i++) {
        //                 let doc = await ContractInstance.methods.fetchAllDoctorDetails(i).call();
        //                 docArray.push(doc);
        //             }
        //             console.log("useEffefct: ",docArray);
        //             let tempRatingArray = [];
        //             for (let i = 0; i < len; i++) {
        //                 let rate = await ContractInstance.methods.fetchAllDoctorRating(i).call();
        //                 tempRatingArray.push(rate);
        //             }
        //             setDoctorAllRatingFetched(tempRatingArray);
        //             console.log(tempRatingArray);
        //             // console.log("details ->",docArray);
        //         }
        //     } catch (error) {
        //         console.log("Error at profile patient");
        //         console.error(error);
        //     }
        // }
        // onConnect();
        onConnectfetchNotification(id);
        // onConnect();
        // console.log("from useeffect",doctorFetchedDetails);
        // console.log(doctorFetchedDetails);
    }, []);



    return (
        <div className="profilePatWrapper">
            <div className="topRightDoctor">
                <div style={{ marginLeft: "2rem", fontSize: "1.5rem" }}>
                    Patient's Dash_Board
                </div>
                <div id="rightSide">
                    <div className="logOut" onClick={resetHandler}>Reset Password </div>
                    <div className="logOut" onClick={clickhandler}>Log out </div>
                </div>
            </div>
            {/* <hr /> */}
            <div className="profileNav">
                <div className="g1">Id:</div>
                <div id="g1-color" className="g1">{id}</div>
            </div>
            <div className="buttonKeeper">
                <button className="about" id={activeD === 'add' ? 'activeDiv' : ''} onClick={addPatient}>Seach Doctor</button>
                <button className="about" id={activeD === 'noti' ? 'activeDiv' : ''} onClick={notify}>Notifications</button>
                <button className="about" id={activeD === 'uploads' ? 'activeDiv' : ''} onClick={viewContri}>View Reports</button>
            </div>
            <div>
                {
                    contributionStatus &&
                    <div className="notify">
                        <div className="contriHeading">
                            <div className="column">S.No.</div>
                            <div className="column">Doctor's Name</div>
                            <div className="column">Problem</div>
                            <div className="column">Report</div>
                            <div></div>
                            <div className="column">Cross Check</div>
                        </div>
                        <div style={{ background: "#ecf0f3", height: "25rem" }}>
                            {
                                showReports.map((input, index) => {
                                    return (
                                        <div className="tupple" key={index}>
                                            <div className="column">{index + 1}</div>
                                            <div className="column">{input.from_name}</div>
                                            <div className="column">{input.problem}</div>
                                            <textarea className="column" disabled value={input.reports} />
                                            <button className="about" id="reportButton" onClick={() => ratingButtonHandler(index)}>Rate Doctor</button>
                                            <button className="about" id="reportButton" onClick={() => crossCheck(index,input)}>Cross Check</button>
                                        </div>
                                    );
                                })
                            }
                            {
                                ratePopupStatus && <PopupModalRating onClose={setRatePopupStatus} docId={raingDocId} />
                            }
                            {
                                crossCheckStatus && <PopupCrossCheck onClose={setCrossCheckStatus} crossReport={crossReport} notificationIndex={notificationIndex} pid={id}/>
                            }
                        </div>
                    </div>

                }
                {
                    addMore &&
                    <div className="wrapperPatient">
                        <div className="signinDoctor ">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h2 className="formdoc">Enter Details</h2>
                                <div className="lookingFor">
                                    <label htmlFor="category">Looking for</label>
                                    <select className="category" id="category" onClick={e => setDoctorSelection(e.target.value)}>
                                        <option value="cardiologist">Cardiologist</option>
                                        <option value="physician">Physician</option>
                                        <option value="dermatologist">Dermatologist</option>
                                        <option value="pulmonologist">Pulmonologist</option>
                                        <option value="neurologist">Neurologist</option>
                                    </select>
                                </div>
                                <div className="submitResetButton">
                                    <button className="submitDoc" type="submit" >Search</button>
                                    {/* <button className="submitDoc" onClick={resetHandler}>Reset Details</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {
                    noti &&
                    <div className="notify">
                        <div className="notifyHeader">
                            <div className="column">S.No.</div>
                            <div className="column">Status</div>
                            <div className="column">Rating</div>
                            <div className="column">Doctor's Name</div>
                            <div className="column">Issue</div>
                            <div className="column"> Description</div>
                        </div>
                        <div style={{ background: "#ecf0f3", height: "25rem" }}>
                            {
                                showNotification.map((value, index) => {
                                    return (
                                        <div className="nTupple" key={index}>
                                            <div className="column">{index + 1}</div>
                                            <div className="column" style={{ color: "blueviolet" }}>{value.status}</div>
                                            <div className="column">{parseInt(value.rating) / 10}</div>
                                            <div className="column">{value.from_name}</div>
                                            <div className="column">{value.problem}</div>
                                            <textarea className="column" disabled defaultValue={value.description} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                }
                <div style={{ background: "#ecf0f3", height: "auto", minHeight: "20rem" }}>
                    {
                        displayList &&
                        <div id="selectionCard" className="wrapperPatient">
                            <div className="signinDoctor">
                                {
                                    <div>
                                        <div className="headerDoc">
                                            <div className="form-label1">Selected</div>
                                            <div className="form-label1">Ratings</div>
                                            <div className="form-label1">Name</div>
                                            <div className="form-label1">Specialization</div>
                                        </div>
                                        <div>
                                            {
                                                //licenseId: 'D1', 
                                                // name: 'Dr Berlin Pandey', 
                                                // specialization: 'cardiologist', 
                                                // contribution: 0n

                                                // doctorFetchedDetails.filter(element => element.specialization === doctorSelection).map((element, index) => {
                                                // finalDoctorMapping.map((element, index) => {
                                                topsisIndexProvider.map((element, index) => {
                                                    return (
                                                        <div className="headerDoc" key={index}>
                                                            <input type="radio" className="radio" name="doctor" value={index} onChange={e => selectdoctorHandler(e)} />
                                                            <div className="finalRating">{parseInt(finalDoctorMapping[element[1]].finalRating) / 10}</div>
                                                            <div className="nameCol">{finalDoctorMapping[element[1]].name}</div>
                                                            <div className="specCol">{finalDoctorMapping[element[1]].specialization}</div>
                                                            <div></div>
                                                            <div></div>
                                                            <div className="feeCol">Fee Rating: {parseInt(finalRatingMapping[element[1]].fee) / 10}</div>
                                                            <div className="timeCol">Time Rating: {parseInt(finalRatingMapping[element[1]].time) / 10}</div>

                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                                <div className="doctorSubmit">
                                    <button onClick={bookAppointmentButton} className="submitDoc">Proceed to Book</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {
                    popup && <PopupModal onClose={setpopup} id={id} selectedDoc={selectedDoctorName} selectedSpec={selectedSpec} selectedDocId={selectedDoctorId} />
                }
                {
                    resetPopupStatus && <PopupResetPassword onClose={setResetPopupStatus} id={id} />
                }

                <div className="clearButton">
                    {
                        clearButton &&
                        <button className="about" onClick={clearScreen}>Clear Screen</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileDoctor;
