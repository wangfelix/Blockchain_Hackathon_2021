pragma solidity 0.8.7;
import "./MediCoin.sol";

contract MediSystem {
    mapping(address => Doctor) private doctors;
    mapping(string => Disease) private diseases;
    address public mediCoinAddress;
    address owner;
    string[] public diseasesNames;
    address[] public allDoctorAddress;
    address[] public unapprovedDoctors;


    struct Dataset {
        bytes32 fileHash;
        uint256 value;
        uint numberOfPatientsData;
        string diseaseName;
    }

    struct Doctor {
        address doctorAccount;
        string doctorName;
        bytes32[] contributedData;      //TODO Needed? Could be done with Events, but maybe for Admin its easier this way?

        // If isPendingDatasetExist is true, the Dataset pending has correct data.
        bool isPendingDatasetExist;
        Dataset pending;

        bool isExist;
    }

    struct Disease {
        uint budget;
        uint numberOfPatientsData;
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

    /**
     * @dev Sets the address to the MediCoin contract. Needs to be called as soon as possible after contract deployment.
     */
    function setMediCoinAddress(address _mediCoinAddress) external {
        mediCoinAddress = _mediCoinAddress;
    }

    /**
     * @notice Registers a Doctor in the system by creating a Doctor instance and adding it to the doctors mapping.
     *
     * @param doctorName The name of the doctor.
     */
    function registerDoctor(string memory doctorName) public payable {
        Doctor memory doctor;
        doctor.doctorAccount = msg.sender;
        doctor.doctorName = doctorName;
        doctor.isExist = true;
        doctors[msg.sender] = doctor;
        allDoctorAddress.push(doctor.doctorAccount);
        unapprovedDoctors.push(msg.sender);
    }

    function addDisease(uint budget, string memory name) public payable {
        Disease memory disease = Disease(budget, 0, name);
        diseases[name] = disease;
        diseasesNames.push(name);

        InterfaceMediCoin medicoin = InterfaceMediCoin(mediCoinAddress);
        medicoin.mint(owner, budget);
    }

    /**
     * @param account The address of the doctor, whose name should be returned
     *
     * @return name of the doctor with the given address
     */
    function getMyName(address account) public view returns(string memory) {
        return doctors[account].doctorName;
    }

    /**
     * @notice Returns the MediCoin balance of the sender
     *
     * @return the MediCoin balance of the senders
     */
    function getMyMediCoinBalance(address _address) public view returns(uint) {
        InterfaceMediCoin medicoin = InterfaceMediCoin(mediCoinAddress);
        return medicoin.balanceOf(_address);
    }

    // Only the deployer of the contract - medicalvalues - is able to see a list of all the users.
    function getDoctorName(address _doctorAddress) public view isOwner returns(string memory) {
        return doctors[_doctorAddress].doctorName;
    }

    function evaluation_attribute(uint _attributeAmount) public pure returns(uint) {
        uint attributeCredit;
        if(_attributeAmount <= 6) {
            attributeCredit = 0;
        } else if(_attributeAmount <= 12) {
            attributeCredit = 20;
        } else if(_attributeAmount <= 18) {
            attributeCredit = 40;
        } else if(_attributeAmount <= 24) {
            attributeCredit = 60;
        } else if(_attributeAmount <= 30) {
            attributeCredit = 80;
        } else {
            attributeCredit = 100;
        }
        return attributeCredit;
    }

    function parseStringToUint(string memory _string) public pure returns(uint) {
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

    function getGenderValue(string[] memory gender) public pure returns(uint) {
        uint genderCredit;
        uint genderLength = gender.length;
        uint sumAll;
        uint sumUngender;

        if(genderLength == 6) {
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
        } else if(sumUngender <= 12) {
            genderCredit = 60;
        } else if(sumUngender <= 18) {
            genderCredit = 40;
        } else if(sumUngender <= 24) {
            genderCredit = 20;
        } else if(sumUngender == sumAll) {
            genderCredit = 0;
        } else {
            genderCredit = 10;
        }

        return genderCredit;
    }

    // @dev
    function getAgeValue(string[] memory age) public pure returns(uint256) {
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

    function getLoincVal(bool loinc) public pure returns(uint256) {
        if (loinc == true) {
            return 100;
        }
        return 0;
    }

    function getRadlexVal(bool radlex) public pure returns(uint256) {
        if (radlex == true) {
            return 100;
        }
        return 0;
    }

    function getSnomedVal(string[] memory snomed) public pure returns(uint256) {
        string memory exists = snomed[0];
        string memory countFalsyVal = snomed[1];

        uint256 countFalsyNum = parseStringToUint(countFalsyVal);

        if (keccak256(bytes(exists)) == keccak256(bytes("true"))) {
            if (countFalsyNum <= 5){
                return 100;
            } else if (countFalsyNum <= 10) {
                return 90;
            } else if (countFalsyNum <= 10) {
                return 80;
            } else if (countFalsyNum <= 15) {
                return 70;
            } else if (countFalsyNum <= 20) {
                return 60;
            } else if (countFalsyNum <= 25) {
                return 50;
            } else if (countFalsyNum <= 30) {
                return 25;
            } else {
                return 0;
            }
        }
        return 0;
    }

    /**
    * @notice Main function that calculates a value of a dataset, given the given quality attributes.
    *
    * @param account The address of the caller (TODO: Check why msg.sender doesn't work)
    * @param disease The name of the disease.
    * @param numberOfPatients Number of different patients, for whom the dataset contains readings.
    * @param age A string array with 3 fields. The first containing the lowest occuring age, the second containing the highest occuring age, and the third containing a string representation of the number of falsy values in the dataset. Falsy values in a dataset are anything other than numbers.
    * @param gender A string array with variable amount of fields. The fields with even indexes contain the different genders or falsy data, that occurr in the dataset. The odd-indexed fields contain a string representation of the number of occurrences of the predecessing value.
    * @param numberOfAttributes The number of different attributes/columns in the dataset.
    * @param loinc true, if dataset contains loinc-data - false, if not.
    * @param radlex loinc true, if dataset contains radlex-data - false, if not.
    * @param snomed A string array with 2 fields. The first containing either "true" or "false", corresponding with the existence of snomed data in the dataset. The second field contains a string representation of the number of falsy values. A falsy snomed value is any string containing symbols different than numbers.
    *
    */
    function calculateDatasetValue(
        address account,
        string memory disease,
        uint256 numberOfPatients,
        string[] memory age,
        string[] memory gender,
        uint256 numberOfAttributes,
        bool loinc,
        bool radlex,
        bytes32 _fileHash,
        string[] memory snomed
    ) public payable {

        uint256 sumValue = getTotalDatasetValuePercentage(numberOfPatients, age, gender, numberOfAttributes, loinc, radlex, snomed);

        // The maximum percentage is 5%, represented by 5000, resulting of a maximum sumValue of 1000 multiplied by 5
        uint256 percentageWorth = sumValue * 5;

        // Check if the disease exists. If not, add it to the system, mint medicoins and allocate budget.
        if (getIsDiseaseExists(disease) == false) {
            addDisease(10000 * 10 ** 18, disease);
        }

        uint mediCoinsWorth = (diseases[disease].budget * percentageWorth) / 100000;
        diseases[disease].budget -= mediCoinsWorth;

        addPendingDataset(account, _fileHash, mediCoinsWorth, numberOfPatients);
        doctors[account].pending.diseaseName = disease;
    }

    function addPendingDataset(address account, bytes32 _fileHash, uint256 amount, uint256 numberOfPatients) public payable {
        Dataset memory dataset;
        dataset.fileHash = _fileHash;
        dataset.value = amount;
        dataset.numberOfPatientsData = numberOfPatients;
        doctors[account].isPendingDatasetExist = true;
        doctors[account].pending = dataset;
    }

    function getDataSetValue(address account) public view returns(uint256) {
        require(doctors[account].isPendingDatasetExist == true, "No pending dataset");
        return doctors[account].pending.value;
    }

    function abortContribution(address account, string memory diseaseName) public {
        require(doctors[account].isPendingDatasetExist == true, "Nothing to abort");

        // Add the value of the dataset to the budget of the disease
        diseases[diseaseName].budget += doctors[account].pending.value;

        // Delete pending dataset
        doctors[account].isPendingDatasetExist = false;

    }

    function getTotalDatasetValuePercentage(
        uint256 numberOfPatients,
        string[] memory age,
        string[] memory gender,
        uint256 numberOfAttributes,
        bool loinc,
        bool radlex,
        string[] memory snomed
    ) public pure returns(uint256) {

        // number of patients, attributes and the existence of valid snomed data is double-weighted
        uint256 numberOfPatientsValue = getNumberOfPatientsValue(numberOfPatients) * 2;
        uint256 numberOfAttributesValue = evaluation_attribute(numberOfAttributes) * 2;
        uint256 snomedValue = getSnomedVal(snomed) * 2;

        uint256 ageValue = getAgeValue(age);
        uint256 genderValue = getGenderValue(gender);
        uint256 loincValue = getLoincVal(loinc);
        uint256 radlexValue = getRadlexVal(radlex);

        // sumValue is a value in the range [0,1000]
        return numberOfPatientsValue + ageValue + genderValue + numberOfAttributesValue + loincValue + radlexValue + snomedValue;
    }


    // Checks if a disease exists in the system. The check is done via the name of the disease.
    function getIsDiseaseExists(string memory content) public view returns(bool) {

        for (uint256 i = 0; i < diseasesNames.length; i++) {

            if (keccak256(bytes(content)) == keccak256(bytes(diseasesNames[i]))) {
                return true;
            }
        }

        return false;
    }

    /// @notice Event, that is beeing emitted every time a doctor shares a dataset.
    event ContributeData(address doctor, bytes32 fileHash, uint256 amount, uint now);

    /**
     * @notice function that contributes a dataset to MediSystem. The params fileHash and amount must align with the data values in the Dataset pending of the doctor.
     * @dev In order to contribute data, a pending Dataset is required.
     *
     * @param _fileHash The hash value of the dataset, that is about to be contributed.
     * @param _address address of the doctor, who is contributing the dataset. TODO check msg.sender
     * @param amount The value of the dataset.
     */
    function contributeData(bytes32 _fileHash, address _address, uint256 amount) public payable {
        require(doctors[_address].isPendingDatasetExist == true, "Cannot contribute dataset. No pending data.");
        require(doctors[_address].pending.value == amount, "Cannot contribute dataset. The given amount does not match the calculated value of the dataset.");
        require(doctors[_address].pending.fileHash == _fileHash, "Cannot contribute dataset. The given file does not match the previously evaluated dataset.");

        transfer(_address, amount);

        // Increment attribute numberOfPatientsData of the disease by the attribute numberOfPatients of the dataset.
        diseases[doctors[_address].pending.diseaseName].numberOfPatientsData += doctors[_address].pending.numberOfPatientsData;

        // Delete pending dataset, as the contribution is completed.
        doctors[_address].isPendingDatasetExist = false;
        doctors[_address].contributedData.push(_fileHash);

        emit ContributeData(msg.sender, _fileHash, amount, block.timestamp);
    }

    /**
     * @notice function transfers a given amount of MediCoins from the owners account to the given account.
     *
     * @dev The function checks, if the doctor has enough allowance from the owner, from where he will transfer MediCoins to himself.
     * If the allowance is lower than 100 [MDC], his account will be pushed into the array unapprovedDoctors, so that the owner can approve him more allowance.
     * Before the transaction is made, the given amount is compared to pendingDataSetsValues. If the given amount is included in pendingDataSetsValues,
     * the amount was manipulated in the frontend and the transaction should not be executed.
     *
     * @param _address The address of the message sender. TODO: Check why msg.sender does not work
     * @param amount The amount of MediCoins to be transfered.
     *
     */
    function transfer(address _address, uint amount) public {
        InterfaceMediCoin medicoin = InterfaceMediCoin(mediCoinAddress);

        uint doctorsAllowance = medicoin.allowance(owner, _address);

        require(doctorsAllowance >= amount, "Allowance not sufficient for transaction.");

        medicoin.transferFrom(owner, _address, amount);

        // If the doctors allowance is low, add his address to the unapprovedDoctors array, so that meidcalvalues can refill his allowance.
        if (doctorsAllowance < 100 * 10 ** 18) {
            unapprovedDoctors.push(_address);
        }
    }

    /**
     * @notice Checks if the doctor with the given address is already approved (= has allowance)
     *
     * @return true, if doctor is approved; false, if not.
     */
    function getIsIApproved(address _address) public view returns(bool) {
        for(uint i = 0; i < unapprovedDoctors.length; i++) {
            if(unapprovedDoctors[i] == _address){
                return false;
            }
        }

        return true;
    }

    /**
     * @notice function returns the MediCoin budget of the given disease.
     *
     * @param diseaseName The name of the disease, whose budget should be returned.
     *
     * @return MediCoin budget of the given disease.
     */
    function getDiseaseBudget(string memory diseaseName) public view returns(uint) {
        return diseases[diseaseName].budget;
    }

    // TODO Increment numberOfPatientsData after contiributing data.
    function getDiseaseNumberOfPatientsData(string memory diseaseName) public view returns(uint256) {
        return diseases[diseaseName].numberOfPatientsData;
    }

    function getIsPendingDataExists(address _address) public view returns(bool) {
        return doctors[_address].isPendingDatasetExist;
    }

}
