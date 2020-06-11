pragma solidity ^0.5.0;
contract Certification {
    constructor() public {}
    struct Certificate {
        string USN;
        string candidate_name;
        string Email;
        string father_name;
        string department;
        uint[8] sgpa;
        uint256 birth_date;
        }
    mapping(bytes32 => Certificate) public certificates;
    event certificateGenerated(bytes32 _certificateId);

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
                result := mload(add(source, 32))
        } 
    }

    function generateCertificate(
        string memory _id,
        string memory _USN,
        string memory _candidate_name,
        string memory _Email,
        string memory _father_name, 
        string memory _department,
        uint[8] memory _sgpa, 
        uint256 _birth_date) public {
        bytes32 byte_id = stringToBytes32(_id);
        certificates[byte_id] = Certificate(_USN,_candidate_name,_Email, _father_name, _department, _sgpa, _birth_date);
        emit certificateGenerated(byte_id);
    }
    function getData(string memory _id) public view returns(string memory,string memory,string memory, string memory, string memory, uint[8] memory,uint256 _birth_date) {
        bytes32 byte_id = stringToBytes32(_id);
        Certificate memory temp = certificates[byte_id];
        
        return (temp.USN, temp.candidate_name, temp.Email,temp.father_name, temp.department, temp.sgpa, temp.birth_date);
    }
}