import React from "react";
// import "./CheckWallet.css";
import './allcss.css';
import Web3 from 'web3';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD, ABI } from "./AddAndAbi";
import Swal from "sweetalert2";

const CheckWallet = () => {

    const dispatch = useDispatch();
    // const addressCurr = useSelector((state) => state.account.addressAccount);
    const balanceCurr = useSelector((state) => state.account.bal);
    // const [accountName, setAccountName] = useState(addressCurr);
    const [accountBalance, setAccountBalance] = useState(balanceCurr);
    // const [contract, setConstract] = useState(null);



    const sweetAlertSuccess = (acc) => {
        Swal.fire({
            title: "Success",
            text: `Account add: ${acc}`,
            icon: "success"
        })
    }

    const sweetAlertError = (res = "Error at wallet Connection.") => {
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


    const onConnect = async () => {
        try {
            const currProvider = detectProvider();
            if (currProvider) {
                await currProvider.request({ method: 'eth_requestAccounts' });
                const web3 = new Web3(currProvider);
                const userAccounts = await web3.eth.getAccounts();
                // setAccountName(userAccounts[0]);
                const balance1 = await web3.eth.getBalance(userAccounts[0]);
                setAccountBalance(balance1);
                console.log("Account: " + userAccounts[0]);
                console.log("Balance: " + accountBalance);
                const ContractInstance = new web3.eth.Contract(ABI, ADD);
                // setConstract(ContractInstance);
                const res = await ContractInstance.methods.checkWalletStatus().call();
                console.log(res);
                if (res === true) {
                    sweetAlertSuccess(userAccounts[0]);
                } else {
                    sweetAlertError();
                }
                // Add the account to Redux store
                // dispatch(address(accountName));
                // dispatch(balance(accountBalance));
            }
        } catch (error) {
            console.log("Error at checkWallet");
            console.log(error);
        }
    }


    function clickHandler() {
        console.log("clicked");
        onConnect();
    }


    return (
        <div id="div1">
            <h2 id="h2div1">Connect to your Wallet</h2>
            <button onClick={clickHandler} className="about" id="sign-btn1">Check Connection</button>
        </div>
    );
}

export default CheckWallet;