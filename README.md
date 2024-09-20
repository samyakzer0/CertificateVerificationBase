

---

# Certificate Verification via Web3 🛡️

This project demonstrates how to verify certificates using blockchain technology. It leverages **Solidity** for smart contracts and **JavaScript** for interacting with the blockchain, ensuring secure and immutable certificate issuance and verification.

## Features
- **Issue Certificates**: Admins can issue certificates with details like recipient name, course name, institution, and issue date.
- **Verify Certificates**: Anyone can verify the authenticity of a certificate using its unique ID.
- **IPFS Integration**: Optionally store certificate images or PDFs on IPFS and reference them in the contract.

## Technologies Used
- **Solidity**: Smart contract development
- **JavaScript**: Frontend interaction with smart contracts
- **Web3.js**: Blockchain interaction from the browser
- **IPFS**: Decentralized file storage for certificate files
- **Hardhat/Truffle**: Development environment for testing and deployment


## How It Works

1. **Issue a Certificate**:
   - Admin issues a certificate by providing the recipient's name, course details, institution name, issue date, and optionally an IPFS hash for certificate storage.

2. **Verify a Certificate**:
   - Anyone can verify a certificate by providing the certificate's unique ID, ensuring its validity and confirming its authenticity.

3. **Retrieve Certificate Details**:
   - View the details of any issued certificate using its unique ID, including the recipient, course, institution, and IPFS hash (if applicable).

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) for managing your Web3 wallet
- [Hardhat](https://hardhat.org/) or [Truffle](https://www.trufflesuite.com/) for local blockchain development

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/certificate-verification-web3.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the smart contract:

   ```bash
   npx hardhat compile
   ```

4. Deploy the contract to a local or test blockchain:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```


## License
This project is licensed under the MIT License.

---
