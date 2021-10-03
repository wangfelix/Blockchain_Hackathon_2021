pragma solidity 0.8.7;
import "./MediCoin.sol";

contract MediSystem {
    mapping(address => Doctor) private doctors;
    mapping(string => Disease) private diseases;
    address mediCoinAddress;
    address owner;

    struct Doctor {
        address doctorAccount;
        string doctorName;
        bytes32[] contributedData;
        bytes32[] pendingDataSets;
        bool isExist;
    }

    struct Disease {
        uint budget;
        uint caseAmount;
        string name;
    }

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner {
        require(owner == msg.sender, "No access rights!");
        _;
    }

    modifier isRegistered {
        require(doctors[msg.sender].isExist, "Not registered!");
        _;
    }

    function setMediCoinAddress(address _mediCoinAddress) external {
        mediCoinAddress = _mediCoinAddress;
    }

    function registerDoctor(string memory doctorName) public payable returns(string memory) {
        Doctor memory doctor;
        doctor.doctorAccount = msg.sender;
        doctor.doctorName = doctorName;
        doctor.isExist = true;
        doctors[msg.sender] = doctor;
        return "success";
    }

    function addDisease(uint budget, string memory name) public payable returns(string memory) {
        Disease memory disease = Disease(budget, 0, name);
        diseases[name] = disease;
        return "";
    }

    function getMyName(address account) public view returns(string memory){
        return doctors[account].doctorName;
    }

    function getMyMediCoinBalance() public view returns(uint) {
        InterfaceMediCoin medicoin = InterfaceMediCoin(mediCoinAddress);
        return medicoin.balanceOf(doctors[msg.sender].doctorAccount);
    }

    // Only the deployer of the contract - medicalvalues - is able to see a list of all the users.
    function getDoctorName(address _doctorAddress) public view isOwner returns(string memory) {
        return doctors[_doctorAddress].doctorName;
    }

    function evaluation_attribute(uint _attributeAmount) public view returns(uint){
        uint attributeCredit;
        if(_attributeAmount <= 6){
            attributeCredit = 0;
        }else if(6 < _attributeAmount && _attributeAmount <= 12){
            attributeCredit = 20;
        }else if(12 < _attributeAmount && _attributeAmount <= 18){
            attributeCredit = 40;
        }else if(18< _attributeAmount && _attributeAmount <= 24){
            attributeCredit = 60;
        }else if(24 < _attributeAmount && _attributeAmount <= 30){
            attributeCredit = 80;
        }else{
            attributeCredit = 100;
        }
        return attributeCredit;
    }

    function parseStringToUint(string memory _string) public view returns(uint){
        uint[] memory array1 = new uint[](10);
        uint uint8_number = 48;

        uint[] memory array2 = new uint[](bytes(_string).length);
        uint len_array2 = array2.length;
        uint number = 0;

        for(uint y = 0; y < 10; y++){
            array1[y] = uint8_number;
            uint8_number += 1;
        }

        for(uint i = 0; i < bytes(_string).length; i++){
            bytes1 new_string = bytes(_string)[i];
            uint num = uint8(new_string);
            array2[i] = num;
        }

        for(uint p = 0; p < 10; p++){
            for(uint r = 0; r < len_array2; r++){
                if(array1[p] == array2[r]){
                    array2[r] = p;
                }
            }
        }

        for(uint e = 0; e < len_array2; e++){
            array2[e] = array2[e] * 10 ** (len_array2-1-e);
            number = number + array2[e];
        }

        return number;
    }

}
