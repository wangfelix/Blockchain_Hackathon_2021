pragma solidity 0.8.7;
import "./MediCoin.sol";

contract MediSystem {
    mapping(address => Doctor) private doctors;
    mapping(string => Disease) private diseases;
    MediCoin mediCoin = MediCoin();

    struct Doctor {
        address doctorAccount;
        string doctorName;
        bytes32[] contributedData;
    }

    struct Disease {
        uint budget;
        uint caseAmount;
        string name;
    }

    modifier hasAccess {
        require(owner == msg.sender, "No access rights");
        _;
    }

    function registerDoctor(string doctorName) public view returns(string) {
        Doctor doctor = Doctor(msg.sender, doctorName, bytes32[]);
        doctors[doctorAccount] = doctor;
        return "success";
    }

    function addDisease(uint budget, string name) public view hasAccess returns() {
        Disease disease = Disease(budget, 0, name);
        diseases[name] = disease;
    }

    function getMyName() public view returns(string){
        return doctors[msg.sender].doctorName;
    }

    function getMyMediCoin() public view returns(uint) {
        return ;
    }


}
