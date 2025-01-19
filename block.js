var web3;
var contract;
var contractAddress = "0x65c0900DC01565B0FA6Caa2409DfE3305fc40565"; // Replace with the actual contract address
var abi = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "success",
                    "type": "bool"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "password",
                    "type": "string"
                }
            ],
            "name": "LogAuthenticationAttempt",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_password",
                    "type": "string"
                }
            ],
            "name": "authenticate",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "hashedUsername",
                    "type": "bytes32"
                }
            ],
            "name": "getUserDetails",
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
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUsernames",
            "outputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "",
                    "type": "bytes32[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_phoneNumber",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_email",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_password",
                    "type": "string"
                }
            ],
            "name": "registerUser",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "usernames",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "users",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "email",
                    "type": "string"
                },
                {
                    "internalType": "bytes32",
                    "name": "hashedUsername",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "salt",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "hashedPassword",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

async function init() {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // Connect to a local Ethereum node if no web3 instance is available
        web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    }

    contract = new web3.eth.Contract(abi, contractAddress);
}

async function registerUser() {
    var name = document.getElementById("signupName").value;
    var phoneNumber = document.getElementById("signupPhoneNumber").value;
    var email = document.getElementById("signupEmail").value;
    var username = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;

    var account = (await web3.eth.getAccounts())[0];

    try {
        await contract.methods.registerUser(name, phoneNumber, email, username, password).send({ from: account });
        alert("User registration successful!");
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// Call the init function when the page loads to initialize web3 and the contract
window.addEventListener('load', function () {
    init();
});

// Add event listeners to your HTML form elements
document.getElementById("createAccount").addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally
    registerUser(); // Call your registration function when the form is submitted
});
