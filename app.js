// Connect to Web3
let web3;
let contract;
const contractAddress = '0xAF6414B8b302C40113cb1C61FBcA805ED80bdCD9';  // Replace with your deployed contract address
const contractABI = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [],
    "name": "admin",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "certificateCount",
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
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "certificates",
    "outputs": [
        {
            "internalType": "string",
            "name": "recipientName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "courseName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "institutionName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "issueDate",
            "type": "string"
        },
        {
            "internalType": "bool",
            "name": "valid",
            "type": "bool"
        },
        {
            "internalType": "string",
            "name": "ipfsHash",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_certificateId",
            "type": "uint256"
        }
    ],
    "name": "getCertificate",
    "outputs": [
        {
            "internalType": "string",
            "name": "recipientName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "courseName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "institutionName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "issueDate",
            "type": "string"
        },
        {
            "internalType": "bool",
            "name": "valid",
            "type": "bool"
        },
        {
            "internalType": "string",
            "name": "ipfsHash",
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
            "name": "_recipientName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_courseName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_institutionName",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_issueDate",
            "type": "string"
        },
        {
            "internalType": "string",
            "name": "_ipfsHash",
            "type": "string"
        }
    ],
    "name": "issueCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_certificateId",
            "type": "uint256"
        }
    ],
    "name": "verifyCertificate",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}];  // Replace with your contract ABI

window.addEventListener('load', async () => {
    const alchemyUrl = 'https://eth-sepolia.g.alchemy.com/v2/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';  // Replace with your Alchemy Sepolia API URL
    web3 = new Web3(new Web3.providers.HttpProvider(alchemyUrl));
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        alert('Please install MetaMask!');
    }

    contract = new web3.eth.Contract(contractABI, contractAddress);
});

// Issue Certificate by interacting with the smart contract
async function issueCertificate() {
    const recipientName = document.getElementById('recipientName').value;
    const courseName = document.getElementById('courseName').value;
    const institutionName = document.getElementById('institutionName').value;
    const issueDate = document.getElementById('issueDate').value;
    const ipfsHash = document.getElementById('ipfsHashInput').value;  // Get the manually entered IPFS hash

    if (!ipfsHash) {
        alert('Please enter an IPFS hash!');
        return;
    }

    const accounts = await web3.eth.getAccounts();
    const admin = accounts[0];

    contract.methods.issueCertificate(recipientName, courseName, institutionName, issueDate, ipfsHash)
        .send({ from: admin })
        .on('transactionHash', (hash) => {
            document.getElementById('txStatus').innerText = 'Transaction sent: ' + hash;
        })
        .on('confirmation', (confirmationNumber, receipt) => {
            document.getElementById('txStatus').innerText = 'Certificate issued successfully!';
        })
        .on('error', (error) => {
            document.getElementById('txStatus').innerText = 'Error issuing certificate: ' + error.message;
        });
}

// Get certificate details
async function getCertificateDetails() {
    const certificateId = document.getElementById('certificateId').value;
    if (!certificateId) {
        alert('Please enter a certificate ID');
        return;
    }

    const cert = await contract.methods.getCertificate(certificateId).call();
    const details = `Recipient: ${cert[0]}<br>
                     Course: ${cert[1]}<br>
                     Institution: ${cert[2]}<br>
                     Issue Date: ${cert[3]}<br>
                     Valid: ${cert[4]}<br>
                     IPFS Hash: ${cert[5]}`;

    document.getElementById('certificateDetails').innerHTML = details;
    document.getElementById('certificateLink').href = `https://ipfs.io/ipfs/${cert[5]}`;
}