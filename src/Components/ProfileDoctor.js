import React, { useEffect, useState } from "react";
// import './ProfileDoctor.css';
import './allcss.css';
import Web3 from "web3";
import { ABI, ADD } from "./AddAndAbi";
import PopupApproveDoctor from "./PopupApproveDoctor";
import ReportPopupDoctor from "./ReportPopupDoctor";
import PopupResetDoctorPassword from "./PopupResetDoctorPassword";
import CheckResponseDoctor from './CheckResponseDoctor';
import Swal from "sweetalert2";


const ProfileDoctor = ({ detail, setLoginStatus }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const [contributionStatus, setContributionStatus] = useState(false);
    const [addMore, setAddMoreStatus] = useState(false);
    const [clearButton, setClearButton] = useState(false);
    const [noti, setNoti] = useState(true);
    const [fieldDetails, setFieldDetails] = useState([]);

    const [patientId, setpatientId] = useState('');
    const [problem, setProblem] = useState('');
    const [desc, setdesc] = useState('');

    const [activeD, setActiveD] = useState('noti');
    const [showNotification, setShowNotification] = useState([]);

    const [approveStatus, setApproveStatus] = useState(false);
    const [pidApprove, setPipApprove] = useState('');
    const [indexPatient, setIndexPatient] = useState(0);
    const [indexDoctor, setIndexDoctor] = useState(0);
    const [inputProblem, setInputproblem] = useState('');

    const [reportPopupStatus, setReportPopupStatus] = useState(false);
    const [resetPasswordPopupStatus, setResetPasswordPopupStatus] = useState(false);

    const [checkCrossResponseStatus, setCheckCrossResponseStatus] = useState(false);
    const [crossCheckInfo, setCrossCheckInfo] = useState();

    const clickhandler = () => {
        // setFieldDetails([...fieldDetails, { patientId: "12", problem: "12", desc: "12" }]);
        setLoginStatus(false);
        console.log("log out Successfull");
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

    const addPatient = () => {
        setAddMoreStatus(true);
        setContributionStatus(false);
        setClearButton(true);
        setNoti(false);
        setActiveD('add');
    }

    const viewContri = () => {
        setAddMoreStatus(false);
        setContributionStatus(true);
        setClearButton(true);
        setNoti(false);
        onConnectfetchReports();
        setActiveD('uploads');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(patientId);
        // console.log(problem);
        // console.log(desc);
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                let existingPatient = await ContractInstance.methods.checkPasswordPatient(patientId).call();

                if (!existingPatient) {
                    sweetAlertError(`Patient with id ${patientId} does not exists`);
                    console.log(`Patient with id ${patientId} does not exists`);
                } else {
                    const c = await ContractInstance.methods.reportSendHandlerPopupDoctor(detail.fid, patientId, problem, desc, 100, 100).send({ from: userAccounts[0], gas: 3000000 });
                    sweetAlertSuccess(`Report sent successfully to patient id: ${patientId}`);
                    console.log(`Report sent successfully to patient id: ${patientId}`);
                }
            }
        } catch (error) {
            console.log("Error at profile patient");
            console.error(error);
        }

    }
    const clearScreen = () => {
        setAddMoreStatus(false);
        setContributionStatus(false);
        setNoti(false);
        setClearButton(false);
        console.log(detail);
    }
    const resetHandler = () => {
        setProblem('');
        setpatientId('');
        setdesc('');
    }
    const notify = () => {
        setNoti(true);
        setAddMoreStatus(false);
        setContributionStatus(false);
        setClearButton(true);
        setActiveD('noti');
        onConnectfetchNotification();
    }

    const approveHandler = (pid, indexPat, indexDoc, problem) => {
        setPipApprove(pid);
        setIndexPatient(indexPat);
        setIndexDoctor(indexDoc);
        setInputproblem(problem);
        // console.log(pid);
        // console.log("index patient",indexPat);
        // console.log("doctor index",indexDoc);
        // console.log("problem: ",problem);
        setApproveStatus(true);
    }

    const reportSendHandler = async (pid, indexPat, indexDoc, problem) => {
        setPipApprove(pid);
        setIndexPatient(indexPat);
        setIndexDoctor(indexDoc);
        setInputproblem(problem);
        setReportPopupStatus(true);
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
    const onConnectfetchNotification = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                // const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                let notifiArray = await ContractInstance.methods.getNotificationPatient(detail.fid).call();
                setShowNotification(notifiArray);
            }
        } catch (error) {
            console.log("Error at profile patient");
            console.error(error);
        }
    }
    const onConnectfetchReports = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                // const userAccounts = await web3.eth.getAccounts();
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                let reportArray = await ContractInstance.methods.getReportPatient(detail.fid).call();
                reportArray.reverse();
                setFieldDetails(reportArray);
            }
        } catch (error) {
            console.log("Error at profile patient");
            console.error(error);
        }
    }
    const resetDoctorPassword = () => {
        setResetPasswordPopupStatus(true);
    }
    const crossCheckResponseHandler = (input) => {
        setCrossCheckInfo(input);
        setCheckCrossResponseStatus(true);
    }

    // container for fetching ans storing all doctor details from blockchain
    useEffect(() => {
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
                    // const userAccounts = await web3.eth.getAccounts();
                    const ContractInstance = new web3.eth.Contract(ABI, ADD);
                    // console.log(detail.fid);
                    let notifiArray = await ContractInstance.methods.getNotificationPatient(detail.fid).call();
                    setShowNotification(notifiArray);
                }
            } catch (error) {
                console.log("Error at profile doctor");
                console.error(error);
            }
        }
        onConnect();
    }, []);

    return (
        <div className="profileDocWrapper">
            <div>
                <div className="topRightDoctor">
                    <div style={{ marginLeft: "2rem", fontSize: "1.5rem" }}>
                        Doctor's Dash_Board
                    </div>
                    <div id="rightSide">
                        <div className="logOut" onClick={resetDoctorPassword}>Reset Password </div>
                        <div className="logOut" onClick={clickhandler}>Log out </div>
                    </div>
                </div>
            </div>
            {
                resetPasswordPopupStatus && <PopupResetDoctorPassword onClose={setResetPasswordPopupStatus} id={detail.fid} />
            }
            <hr />
            <div className="profileNav">
                <div className="g1Doctor">Id:</div>
                <div className="g1Doctor" id="profileId">{detail.fid}</div>
                <div className="g1Doctor">Specialization:</div>
                <div className="g1Doctor" id="profileSpec">{detail.special}</div>
                <div className="g1Doctor">Name</div>
                <div className="g1Doctor" id="profileId">{detail.name}</div>
                <div className="g1Doctor">Contributions:</div>
                <div className="g1Doctor" id="profileSpec">{parseInt(detail.contri)}</div>

            </div>
            <div className="buttonKeeper">
                <button className="about" id={activeD === 'add' ? 'activeDiv' : ''} onClick={addPatient}>Add Patient Details</button>
                <button className="about" id={activeD === 'noti' ? 'activeDiv' : ''} onClick={notify}>Notifications</button>
                <button className="about" id={activeD === 'uploads' ? 'activeDiv' : ''} onClick={viewContri}>Reports</button>
            </div>
            <div>
                {
                    contributionStatus &&
                    <div className="contribution">
                        <div className="contriHeading">
                            <div className="columnDoc">S.No.</div>
                            <div className="columnDoc">Patient's ID</div>
                            <div className="columnDoc">Problem</div>
                            <div className="columnDoc"> Description</div>
                        </div>
                        {
                            fieldDetails.map((input, index) => {
                                return (
                                    <div className="tupple" key={index}>
                                        <div className="columnDoc">{index + 1}</div>
                                        <div className="columnDoc">{input.to}</div>
                                        <div className="columnDoc">{input.problem}</div>
                                        <textarea className="columnDoc" disabled defaultValue={input.reports} />
                                    </div>
                                );
                            })
                        }
                    </div>

                }
                {
                    addMore &&
                    <div className="addPatientFormDoc">
                        <div className="signinDoctor ">
                            <form className="login-form" onSubmit={handleSubmit}>
                                <h2 className="formdoc">Enter Patient Details</h2>
                                <div className="form-group">
                                    <label htmlFor="patientId" className="formDoc1">Patient ID</label>
                                    <input
                                        type="text"
                                        id="patientId"
                                        className="form-input"
                                        placeholder="Enter Patient's ID"
                                        value={patientId}
                                        onChange={(e) => setpatientId(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="problem" className="formDoc1">Enter Problem</label>
                                    <input
                                        type="text"
                                        id="problem"
                                        className="form-input"
                                        placeholder="Enter problem"
                                        value={problem}
                                        onChange={(e) => setProblem(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="desc" className="formDoc1">Description</label>
                                    <input
                                        type="text"
                                        id="desc"
                                        className="form-input"
                                        placeholder="Enter Description about problem"
                                        value={desc}
                                        onChange={(e) => setdesc(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="submitResetButton">
                                    <button type="submit" className="submitDoc" >Submit details</button>
                                    <button className="submitDoc" onClick={resetHandler}>Reset Details</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
                {
                    noti &&
                    <div className="notify">
                        <div className="notifyHeaderDoc">
                            <div className="columnDoc">S.No.</div>
                            <div className="columnDoc">Status</div>
                            <div className="columnDoc">Patient's ID</div>
                            <div className="columnDoc">Problem</div>
                            <div className="columnDoc"> Description</div>
                            <div className="columnDoc"> Action</div>
                        </div>
                        {
                            showNotification.map((input, index) => {
                                return (
                                    <div className="nTuppleDoc" key={index}>
                                        <div className="columnDoc">{index + 1}</div>
                                        <div className="columnDoc" style={{ color: "blueviolet" }}>{input.status}</div>
                                        <div className="columnDoc">{input.from_id}</div>
                                        <div className="columnDoc">{input.problem}</div>
                                        <textarea className="columnDoc" defaultValue={input.description} disabled />
                                        {
                                            input.status === "pending" &&
                                            <button className="about" id="reportButton" onClick={() => approveHandler(input.from_id, parseInt(input.indexPatient), parseInt(input.indexDoctor))}>Approve</button>
                                        }
                                        {
                                            input.status === "Approved" &&
                                            <button className="about" id="reportButton" onClick={() => reportSendHandler(input.from_id, parseInt(input.indexPatient), parseInt(input.indexDoctor), input.problem)}>Send Report</button>
                                        }
                                        {
                                            input.status === "crossCheckRequest" &&
                                            <button className="about" id="reportButton" onClick={() => crossCheckResponseHandler(input)}>Check</button>
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                }
                {
                    approveStatus && <PopupApproveDoctor onClose={setApproveStatus} pid={pidApprove} did={detail.fid} indexPatient={indexPatient} indexDoctor={indexDoctor} />
                }
                {
                    reportPopupStatus && <ReportPopupDoctor onClose={setReportPopupStatus} pid={pidApprove} did={detail.fid} indexPatient={indexPatient} indexDoctor={indexDoctor} problem={inputProblem} />
                }
                {
                    checkCrossResponseStatus && <CheckResponseDoctor onClose={setCheckCrossResponseStatus} crossCheckInfo={crossCheckInfo} />
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

