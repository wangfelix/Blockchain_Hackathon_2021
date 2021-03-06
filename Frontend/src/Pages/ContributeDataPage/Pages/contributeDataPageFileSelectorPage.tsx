import React, { useEffect, useState } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { ParseResult } from "papaparse";

import { useHistory } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import { useGetDatasetValue, useMediSysMethod } from "Utils/hooks";
import { MediSys_Functions } from "Utils/smartContractUtils";
import { RootState } from "State/Reducers";
import { AgeState, FalsyGenderValue, GenderState, SnomedState } from "State/Reducers/contributeDataPageReducer";
import {
    containsAgeColumn,
    containsGenderColumn,
    containsLoincColumn,
    containsSnomedColumn,
    FEMALE_REGEX,
    MALE_REGEX,
    TRANSGENDER_REGEX,
} from "Pages/ContributeDataPage/contributeDataPageUtils";
import { HashTable } from "Utils/utils";
import {
    setDatasetValue,
    setDiseaseName,
    setFalsyGenderValues,
    setFemaleOccurrences,
    setFileHash,
    setIndexAge,
    setIsAgeExists,
    setIsFemaleExists,
    setIsLoincExists,
    setIsMaleExists,
    setIsRadlexExists,
    setIsSnomedExists,
    setIsTransgenderExists,
    setMaleOccurrences,
    setMaxAge,
    setMinAge,
    setNumberFalsyAgeValues,
    setNumberOfAttributes,
    setNumberOfFalsySnomedValues,
    setNumberOfPatients,
    setTransgenderOccurrences,
} from "State/Actions/actionCreators";
import { ContributeDataPagePaths, Paths } from "Utils/paths";
import { Page } from "BaseComponents/page";
import document from "Illustrations/documentIcon.png";
import { Container } from "BaseComponents/container";
import { Text } from "BaseComponents/text";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { CSVReader } from "react-papaparse";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";

const CryptoJS = require("crypto-js");

type ContributeDataPageFileSelectorPageProps = {
    label?: string;
    ctaLabel: string;
    onCta: (...args: any[]) => any;
    acceptedFileType: "csv" | "image";
};

export const ContributeDataPageFileSelectorPage = ({
    label,
    ctaLabel,
    onCta,
}: ContributeDataPageFileSelectorPageProps) => {
    const dispatch = useDispatch();

    const history = useHistory();

    // -- STATE --

    const { account } = useEthers();

    const { state: calculateValueState, send: calculateValue } = useMediSysMethod(
        MediSys_Functions.CALCULATE_DATASET_VALUE
    );

    const [selectedFile, setSelectedFile] = useState<ParseResult<any>[] | undefined>(undefined);

    // File Data

    const datasetValue = useGetDatasetValue(account);

    const diseaseName = useSelector<RootState, string>((state) => state.contributeDataPage.diseaseName);

    const [selectedFileHash, setSelectedFileHash] = useState("");

    const numberOfPatients = useSelector<RootState, number>((state) => state.contributeDataPage.numberOfPatients);
    const numberOfAttributes = useSelector<RootState, number>((state) => state.contributeDataPage.numberOfAttributes);

    // Age

    const ageState = useSelector<RootState, AgeState>((state) => state.contributeDataPage.age);

    const isAgeExists = ageState.isAgeExists;
    const indexAge = ageState.indexAge;
    const minAge = ageState.minAge;
    const maxAge = ageState.maxAge;
    const nbrFalsyAgeVal = ageState.numberFalsyAgeValues;

    // Gender

    const genderState = useSelector<RootState, GenderState>((state) => state.contributeDataPage.gender);

    const isMaleExists = genderState.isMaleExists;
    const maleOccurrences = genderState.numberMaleOccurrences;
    const isFemaleExists = genderState.isFemaleExists;
    const femaleOccurrences = genderState.numberFemaleOccurrences;
    const isTransgenderExists = genderState.isTransgenderExists;
    const transgenderOccurrences = genderState.numberTransgenderOccurrences;
    const falsyGenderValues = genderState.falsyGenderValues;

    // Loinc

    const isLoincExists = useSelector<RootState, boolean>((state) => state.contributeDataPage.loinc);

    // Radlex

    const isRadlexExists = useSelector<RootState, boolean>((state) => state.contributeDataPage.radlex);

    // Snomed

    const snomedState = useSelector<RootState, SnomedState>((state) => state.contributeDataPage.snomed);

    const isSnomedExists = snomedState.isSnomedExists;
    const numberOfFalsySnomedValues = snomedState.numberOfFalsySnomedValues;

    // -- EFFECTS --

    /*
     * If Snomed data exists, it is very likely, that multiple rows of data belong to a single patient.
     * In this case, the number of patients doesn't equal the number of rows.
     */
    useEffect(() => {
        if (!selectedFile || !isSnomedExists) return;

        // Check if a column "patient id" or similar exists
        const patientIdIndex = containsSnomedColumn(selectedFile[0].data);

        /* If no patient Id exists, it is not possible to differentiate different patients.
         * Therefore we decide in favour of the doctor and keep assuming, that each row is indeed a complete dataset of a single patient.
         */
        if (patientIdIndex < 0) return;

        let exists: HashTable<boolean> = {};

        // Get rid of duplicated values to get an array with only unique patientIDs.
        const patients = selectedFile.filter((row) => {
            const patientIdValue: string = row.data[patientIdIndex];

            return exists.hasOwnProperty(patientIdValue) ? false : (exists[patientIdValue] = true);
        });

        console.log("Patients");
        console.log(patients);

        // Update the number of Patients to the correct value.
        dispatch(setNumberOfPatients(patients.length));
    }, [isSnomedExists]);

    // TODO REMOVE BELOW
    useEffect(() => {
        console.log("calculateValueState:");
        console.log(calculateValueState);
    }, [calculateValueState]);
    // TODO REMOVE ABOVE

    useEffect(() => {
        if (!selectedFile) return;

        // Calculate hash value of the dataset.
        const arr: any[] = [];
        selectedFile?.forEach((item) => arr.push(item.data));

        const fileHashHex = `0x${CryptoJS.SHA256(JSON.stringify(arr)).toString(CryptoJS.enc.Hex)}`;
        setSelectedFileHash(fileHashHex);
        dispatch(setFileHash(fileHashHex));

        // Process dataset
        batch(() => {
            processAge();
            processGender();
            processLoinc();
            processRadlex();
            processNumberOfPatientsAndAttributes();
            processSnomed();
        });
    }, [dispatch, selectedFile]);

    useEffect(() => {
        if (calculateValueState.status === "Success" && datasetValue) {
            dispatch(setDatasetValue(datasetValue));
            history.push(`${Paths.CONTRIBUTE_DATA_PAGE}${ContributeDataPagePaths.DATASET_VALUE_DETAILS_PAGE}`);
        }
    }, [datasetValue, calculateValueState]);

    // -- HELPERS --

    const processSnomed = () => {
        if (!selectedFile) return;

        const snomedIndex = containsSnomedColumn(selectedFile[0].data);

        if (snomedIndex < 0) return;

        let numberFalsyValues = 0;

        selectedFile.forEach((row) => {
            if (isNaN(+row.data[snomedIndex])) {
                numberFalsyValues++;
            }
        });

        dispatch(setIsSnomedExists(true));
        dispatch(setNumberOfFalsySnomedValues(numberFalsyValues));
    };

    const processNumberOfPatientsAndAttributes = () => {
        if (!selectedFile) return;

        dispatch(setNumberOfPatients(selectedFile.length - 1));
        dispatch(setNumberOfAttributes(selectedFile[0].data.length));
    };

    const processLoinc = () => {
        if (!selectedFile) return;

        const loincIndex = containsLoincColumn(selectedFile[0].data);

        if (loincIndex > 0) {
            dispatch(setIsLoincExists(true));
        }
    };

    const processRadlex = () => {
        if (!selectedFile) return;

        const radlexIndex = containsLoincColumn(selectedFile[0].data);

        if (radlexIndex > 0) {
            dispatch(setIsRadlexExists(true));
        }
    };

    const processGender = () => {
        if (!selectedFile) return;

        const genderIndex = containsGenderColumn(selectedFile[0].data);

        if (genderIndex < 0) return;

        let isMaleExists = false;
        let isFemaleExists = false;
        let isTransgenderExists = false;

        let nbrMaleOccurrences = 0;
        let nbrFemaleOccurrences = 0;
        let nbrTransgenderOccurrences = 0;

        let falsyGenderValues: FalsyGenderValue[] = [];

        selectedFile.forEach((item, index) => {
            if (index === 0) return; // First index is the header.

            const gender = `${item.data[genderIndex]}`;

            switch (gender) {
                case gender.match(MALE_REGEX)?.input:
                    isMaleExists = true;
                    nbrMaleOccurrences++;
                    break;

                case gender.match(FEMALE_REGEX)?.input:
                    isFemaleExists = true;
                    nbrFemaleOccurrences++;
                    break;

                case gender.match(TRANSGENDER_REGEX)?.input:
                    isTransgenderExists = true;
                    nbrTransgenderOccurrences++;
                    break;

                default:
                    falsyGenderValues.some((falsyGenderValue) => falsyGenderValue.value === gender)
                        ? falsyGenderValues.filter((falsyGenderValue) => falsyGenderValue.value === gender)[0]
                              .numberOccurrences++
                        : falsyGenderValues.push({ value: gender, numberOccurrences: 1 });
            }
        });

        dispatch(setIsMaleExists(isMaleExists));
        dispatch(setIsFemaleExists(isFemaleExists));
        dispatch(setIsTransgenderExists(isTransgenderExists));

        dispatch(setMaleOccurrences(nbrMaleOccurrences));
        dispatch(setFemaleOccurrences(nbrFemaleOccurrences));
        dispatch(setTransgenderOccurrences(nbrTransgenderOccurrences));

        dispatch(setFalsyGenderValues(falsyGenderValues));
    };

    const processAge = () => {
        if (!selectedFile) return;

        const ageIndex = containsAgeColumn(selectedFile[0].data);

        if (ageIndex >= 0) {
            dispatch(setIndexAge(ageIndex));
            dispatch(setIsAgeExists(true));

            let arrMinAge = 0;
            let arrMaxAge = 0;
            let arrNbrFalsyAgeValues = 0;

            selectedFile.forEach((item, index) => {
                if (index === 0) return; // First index is the header.
                const age = +item.data[ageIndex];

                if (!isNaN(age)) {
                    if (index === 1) {
                        arrMinAge = age;
                        arrMaxAge = age;
                    }

                    if (age < arrMinAge) {
                        arrMinAge = age;
                    } else if (age > arrMaxAge) {
                        arrMaxAge = age;
                    }
                } else {
                    arrNbrFalsyAgeValues++;
                }
            });

            dispatch(setMinAge(arrMinAge));
            dispatch(setMaxAge(arrMaxAge));
            dispatch(setNumberFalsyAgeValues(arrNbrFalsyAgeValues));
        }
    };

    // -- CALLBACKS --

    const handleSelectFile = (data: ParseResult<any>[]) => setSelectedFile(data);

    const handleChangeName = (value: string) => dispatch(setDiseaseName(value));

    // Calls SmartContract Function to calculate the value (in MediCoins) of the given dataset.
    const handleCalculateValue = () => {
        const genderArr = [
            String(isMaleExists),
            String(maleOccurrences),
            String(isFemaleExists),
            String(femaleOccurrences),
            String(isTransgenderExists),
            String(transgenderOccurrences),
        ];

        falsyGenderValues.forEach((falsyValue) => {
            genderArr.push(falsyValue.value);
            genderArr.push(String(falsyValue.numberOccurrences));
        });

        const ageArr = isAgeExists ? [String(minAge), String(maxAge), String(nbrFalsyAgeVal)] : null;

        const snomedArr = [`${isSnomedExists}`, `${numberOfFalsySnomedValues}`];

        const argumentsArr: any[] = [
            account,
            diseaseName,
            numberOfPatients,
            ageArr,
            genderArr,
            numberOfAttributes,
            isLoincExists,
            isRadlexExists,
            selectedFileHash,
            snomedArr,
        ];

        calculateValue(...argumentsArr);
    };

    // -- RENDER --

    return (
        <Page heading="Contribute-Data" icon={document}>
            <Container
                styleProps={{
                    display: "grid",
                    gridTemplateColumns: "1fr 45% 1fr",
                    width: "100%",
                }}
            >
                <Container styleProps={{ gridColumn: "2" }}>
                    <Container styleProps={{ marginBottom: 50, gap: 10 }}>
                        <Text textType="text">Disease:</Text>
                        <input
                            type="text"
                            placeholder="Input disease here..."
                            onChange={(e) => handleChangeName(e.target.value)}
                            style={{
                                height: 50,
                                borderRadius: BORDER_RADIUS,
                                borderStyle: "solid",
                                borderColor: Colors.GREY,
                                background: Colors.TRANSPARENT,

                                padding: "0 20px",
                            }}
                        />
                    </Container>

                    <Text textType="text" styleProps={{ marginBottom: 10 }}>
                        File:
                    </Text>
                    <Container styleProps={{ height: "400px", display: "flex" }}>
                        <CSVReader
                            onDrop={handleSelectFile}
                            onError={() => console.log("Error")}
                            config={{ header: false }}
                            style={{
                                dropArea: {
                                    borderColor: Colors.GREY_LIGHT,
                                    borderRadius: BORDER_RADIUS,
                                    width: "100%",
                                    maxWidth: "100%",
                                    marginBottom: "50px",
                                },
                                dropAreaActive: {
                                    borderColor: "red",
                                },
                                dropFile: {
                                    width: "100%",
                                    background: Colors.TRANSPARENT,
                                },
                                fileSizeInfo: {
                                    display: "none",
                                },
                                fileNameInfo: {
                                    color: Colors.GREY_DARK,
                                    backgroundColor: Colors.GREY_LIGHT,
                                    borderRadius: BORDER_RADIUS,
                                    fontSize: 17,
                                    lineHeight: 1,
                                    padding: "15px 20px",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    width: "80%",
                                },
                                progressBar: {
                                    backgroundColor: Colors.PRIMARY_ACCENT,
                                    position: "absolute",
                                    bottom: "-50px",
                                },
                            }}
                        >
                            <span>Drop CSV file here or click to upload.</span>
                        </CSVReader>
                    </Container>

                    <Row>
                        <Container styleProps={{ justifySelf: "flex-end", marginLeft: "auto", gap: 30 }}>
                            {selectedFile && (
                                <Text textType="nudge" styleProps={{ color: Colors.RED, height: 10 }}>
                                    {diseaseName ? "" : "Error: Please specify the name of the disease!"}
                                </Text>
                            )}

                            <Button
                                buttonType={diseaseName ? "primary" : "primaryGreyedOut"}
                                onClickHandle={handleCalculateValue}
                                styleProps={{ marginLeft: "auto" }}
                            >
                                Calculate Value
                            </Button>
                        </Container>
                    </Row>
                </Container>

                <Text textType="nudge" styleProps={{ width: "75%", margin: "0 auto 0 auto", textAlign: "justify" }}>
                    Your Dataset will not be uploaded to any remote server. After selecting your dataset, MediSystem
                    will parse it and extract the most critical information for the evaluation algorithm. By clicking
                    "Calculate Value", the evaluation algorithm will be called locally on your blockchain node, and the
                    extracted information will be passed to it. At no point in time do information about your dataset
                    leave your computer.
                </Text>
            </Container>
        </Page>
    );
};
