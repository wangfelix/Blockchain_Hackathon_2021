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

}
