// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {

    struct Certificate {
        string recipientName;
        string courseName;
        string institutionName;
        string issueDate; // Store date as a string in "dd-mm-yy" format
        bool valid;
        string ipfsHash;  // Optional: To store certificate PDF or image in IPFS
    }

    mapping(uint256 => Certificate) public certificates;
    uint256 public certificateCount;

    address public admin;

    constructor() {
        admin = msg.sender; // Assign the contract deployer as the admin
    }

    // Function to issue a certificate
    function issueCertificate(
        string memory _recipientName,
        string memory _courseName,
        string memory _institutionName,
        string memory _issueDate,  // Input date in "dd-mm-yy" format
        string memory _ipfsHash
    ) public {
        require(msg.sender == admin, "Only admin can issue certificates");

        certificateCount++;
        certificates[certificateCount] = Certificate(
            _recipientName,
            _courseName,
            _institutionName,
            _issueDate,
            true,
            _ipfsHash
        );
    }

    // Function to verify certificate by ID
    function verifyCertificate(uint256 _certificateId) public view returns (bool) {
        Certificate memory cert = certificates[_certificateId];
        return cert.valid;
    }

    // Function to get certificate details by ID
    function getCertificate(uint256 _certificateId) public view returns (
        string memory recipientName,
        string memory courseName,
        string memory institutionName,
        string memory issueDate,
        bool valid,
        string memory ipfsHash
    ) {
        Certificate memory cert = certificates[_certificateId];
        return (
            cert.recipientName,
            cert.courseName,
            cert.institutionName,
            cert.issueDate,
            cert.valid,
            cert.ipfsHash
        );
    }
}
