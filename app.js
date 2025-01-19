// Import web3 library
import Web3 from "web3";

async function init() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        // Initialize Web3 with MetaMask provider
        const web3 = new Web3(window.ethereum);
        
        try {
            // Request account access if needed
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
        
// Load the compiled SimpleAuthentication contract ABI and address
const contractABI = [
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

const contractAddress = "0x30807Bd9cC3A0F9A706092e96D19b4Ad58907358"; // Replace with your actual contract address

// Create an instance of the contract
const simpleAuthenticationContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to register a new user
async function registerUser(name, phoneNumber, email, username, password) {
    try {
        const accounts = await web3.eth.getAccounts();
        const gas = await simpleAuthenticationContract.methods.registerUser(name, phoneNumber, email, username, password).estimateGas();
        const result = await simpleAuthenticationContract.methods.registerUser(name, phoneNumber, email, username, password)
            .send({ from: accounts[0], gas: gas });
        console.log("User registered:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Event listener for form submission
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the default link behavior
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    // Function to handle registration form submission
async function handleRegistrationForm(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const phoneNumber = document.getElementById("signupPhoneNumber").value;
    const email = document.getElementById("signupEmail").value;
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    // Call the registerUser function with user input
    await registerUser(name, phoneNumber, email, username, password);

    // Optionally, you can clear the form fields or display a success message
    document.getElementById("signupName").value = "";
    document.getElementById("signupPhoneNumber").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupUsername").value = "";
    document.getElementById("signupPassword").value = "";
}

// Add an event listener to the registration form
const registrationForm = document.querySelector("#createAccount");
registrationForm.addEventListener("submit", handleRegistrationForm);

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});

    } else {
        console.error("MetaMask is not installed");
    }
}

// Call the init function when the page loads
document.addEventListener("DOMContentLoaded", init);
