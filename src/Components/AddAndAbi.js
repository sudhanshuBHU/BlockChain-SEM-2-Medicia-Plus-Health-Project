
export const ADD = "0xd04dc1d953a94e22b67e95851f195826d7875f67";
export const ABI =[
	{
		"inputs": [],
		"name": "SET_only_for_developer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "docId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "docIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "approveHandlerPopupDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "checkPasswordDoctor",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "checkPasswordPatient",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkWalletStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "problem",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "rep",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "victimName",
				"type": "string"
			}
		],
		"name": "crossCheckHandler",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lenPat",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lenDoc",
				"type": "uint256"
			}
		],
		"name": "crossCheckRejectSender",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lenPat",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "did",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "lenDoc",
				"type": "uint256"
			}
		],
		"name": "crossCheckResponseSender",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "fetchAllDoctorDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "licenseId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "specialization",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "contribution",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "finalRating",
						"type": "int256"
					}
				],
				"internalType": "struct HealthCare.doctor",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "fetchAllDoctorLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "fetchAllDoctorRating",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int256",
						"name": "finalRating",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "fee",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "time",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "countPatient",
						"type": "int256"
					}
				],
				"internalType": "struct HealthCare.doctorRating",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getDoctorDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getNotificationPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "to",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from_id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "problem",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "rating",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "indexPatient",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "indexDoctor",
						"type": "uint256"
					}
				],
				"internalType": "struct HealthCare.patientNotification[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getRatingOfDoctor",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			}
		],
		"name": "getReportPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "to",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "from_id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "problem",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "reports",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "indexPatient",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "indexDoctor",
						"type": "uint256"
					}
				],
				"internalType": "struct HealthCare.report[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "special",
				"type": "string"
			}
		],
		"name": "newRegistrationDoctor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"name": "newRegistrationPatient",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "docId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "docIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			}
		],
		"name": "rejectHandlerPopupDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "docId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "indexPat",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "indexDoc",
				"type": "uint256"
			}
		],
		"name": "reportSendHandlerPopupDoctor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"name": "resetDoctorPassword",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"name": "resetPatientPassword",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "to",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "from_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "prob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "desc",
				"type": "string"
			}
		],
		"name": "setNotificationPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "feeRating",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "timeRating",
				"type": "int256"
			}
		],
		"name": "setRating",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];