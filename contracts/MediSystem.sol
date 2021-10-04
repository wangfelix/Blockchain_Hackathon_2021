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

    function getMyName(address account) public view returns(string memory) {
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

    function evaluation_attribute(uint _attributeAmount) public view returns(uint) {
        uint attributeCredit;
        if(_attributeAmount <= 6) {
            attributeCredit = 0;
        } else if(6 < _attributeAmount && _attributeAmount <= 12) {
            attributeCredit = 20;
        } else if(12 < _attributeAmount && _attributeAmount <= 18) {
            attributeCredit = 40;
        } else if(18< _attributeAmount && _attributeAmount <= 24) {
            attributeCredit = 60;
        } else if(24 < _attributeAmount && _attributeAmount <= 30) {
            attributeCredit = 80;
        } else {
            attributeCredit = 100;
        }
        return attributeCredit;
    }

    function parseStringToUint(string memory _string) public view returns(uint) {
        uint[] memory array1 = new uint[](10);
        uint uint8_number = 48;

        uint[] memory array2 = new uint[](bytes(_string).length);
        uint len_array2 = array2.length;
        uint number = 0;

        for(uint y = 0; y < 10; y++) {
            array1[y] = uint8_number;
            uint8_number += 1;
        }

        for(uint i = 0; i < bytes(_string).length; i++) {
            bytes1 new_string = bytes(_string)[i];
            uint num = uint8(new_string);
            array2[i] = num;
        }

        for(uint p = 0; p < 10; p++) {
            for(uint r = 0; r < len_array2; r++){
                if(array1[p] == array2[r]){
                    array2[r] = p;
                }
            }
        }

        for(uint e = 0; e < len_array2; e++) {
            array2[e] = array2[e] * 10 ** (len_array2-1-e);
            number = number + array2[e];
        }

        return number;
    }

    function getGenderValue(string[] memory gender) public view returns(uint) {
        uint genderCredit;
        uint genderLength = gender.length;
        uint sumAll;
        uint sumUngender;

        if(genderLength == 6){
            genderCredit = 100;
            return genderCredit;
        }

        for(uint j = 1; j < genderLength; j += 2) {
            sumAll += parseStringToUint(gender[j]);
        }

        if(genderLength > 6) {
            for(uint i = 7; i < genderLength; i += 2) {
                sumUngender += parseStringToUint(gender[i]);
            }
        }

        if(sumUngender <= 6) {
            genderCredit = 80;
        } else if(6 < sumUngender && sumUngender <= 12) {
            genderCredit = 60;
        } else if(12 < sumUngender && sumUngender <= 18) {
            genderCredit = 40;
        } else if(18 < sumUngender && sumUngender <= 24) {
            genderCredit = 20;
        } else if(sumUngender == sumAll) {
            genderCredit = 0;
        } else {
            genderCredit = 10;
        }

        return genderCredit;
    }

    // @dev
    function getAgeValue(string[] memory age) public view returns(uint256) {
        uint minAge = parseStringToUint(age[0]);
        uint256 maxAge = parseStringToUint(age[1]);
        uint256 numberOfFalsyValues = parseStringToUint(age[2]);

        // Check if range of age is valid and believable
        if (minAge < 0 || maxAge > 150) {
            return 0;
        }

        // ToDo: make decisions relative to total number of patients in the dataset
        if (numberOfFalsyValues <= 5) {
            return 100;
        } else if (numberOfFalsyValues <=10) {
            return 70;
        } else if (numberOfFalsyValues <=20) {
            return 40;
        } else if (numberOfFalsyValues <=30) {
            return 10;
        } else {
            return 0;
        }
    }

    function getNumberOfPatientsValue(uint256 numberOfPatients) public pure returns(uint256) {
        if (numberOfPatients <= 200) {
            return 40;
        } else if (numberOfPatients <= 400) {
            return 60;
        } else if (numberOfPatients <= 600) {
            return 70;
        } else if (numberOfPatients <= 800) {
            return 80;
        } else if (numberOfPatients <= 1000) {
            return 90;
        } else {
            return 100;
        }
    }

    function getLoincVal(bool loinc) public view returns(uint){
        if (loinc == true){
            return 100;
        }
        return 0;
    }

    function getRadlexVal(bool radlex) public view returns(uint){
        if (radlex == true){
            return 100;
        }
        return 0;
    }

    function getSnomedVal(string[] memory snomed) public view returns(uint256){
        string memory exists = snomed[0];
        string memory countFalsyVal = snomed[1];

        uint countFalsyNum = parseStringToUint(countFalsyVal);

        if (keccak256(bytes(exists)) == keccak256(bytes("true"))){
            if (countFalsyNum <= 5){
                return 100;
            }
            else if (countFalsyNum > 5 && countFalsyNum <= 10){
                return 90;
            }
            else if (countFalsyNum > 5 && countFalsyNum <= 10){
                return 80;
            }
            else if (countFalsyNum > 11 && countFalsyNum <= 15){
                return 70;
            }
            else if (countFalsyNum > 16 && countFalsyNum <= 20){
                return 60;
            }
            else if (countFalsyNum > 21 && countFalsyNum <= 25){
                return 50;
            }
            else if (countFalsyNum > 26 && countFalsyNum <= 30){
                return 25;
            }
            else{
                return 0;
            }
        }
        return 0;

    }

}
