import React, { useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import { ParseResult } from "papaparse";
import { batch, useDispatch, useSelector } from "react-redux";

import { Button } from "BaseComponents/Button/button";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Row } from "BaseComponents/row";
import { Page } from "BaseComponents/page";
import wallet from "Illustrations/wallet.png";
import { Container } from "BaseComponents/container";
import { Text } from "BaseComponents/text";
import {
    setFalsyGenderValues,
    setFemaleOccurrences,
    setIndexAge,
    setIsAgeExists,
    setIsFemaleExists,
    setIsMaleExists,
    setIsTransgenderExists,
    setMaleOccurrences,
    setMaxAge,
    setMinAge,
    setNumberFalsyAgeValues,
    setTransgenderOccurrences,
} from "State/Actions/actionCreators";
import { RootState } from "State/Reducers";
import { containsAgeColumn, containsGenderColumn } from "Pages/ContributeDataPage/contributeDataPageUtils";
import { FalsyGenderValue } from "State/Reducers/contributeDataPageReducer";
import { useEthers } from "@usedapp/core";

export const ContributeDataPage = () => {
    // -- CALLBACKS --

    const handleMoveToValuePage = () => {};

    // -- RENDER --

    return <FileUploader ctaLabel="Calculate Value" onCta={handleMoveToValuePage} acceptedFileType="csv" />;
};

type FileUploaderProps = {
    label?: string;
    ctaLabel: string;
    onCta: (...args: any[]) => any;
    acceptedFileType: "csv" | "image";
};

export const FileUploader = ({ label, ctaLabel, onCta }: FileUploaderProps) => {
    const dispatch = useDispatch();

    // -- STATE --

    const { account } = useEthers();

    const [selectedFile, setSelectedFile] = useState<ParseResult<any>[] | undefined>(undefined);

    const isAgeExists = useSelector<RootState, boolean>((state) => state.contributeDataPage.age.isAgeExists);
    const indexAge = useSelector<RootState, number>((state) => state.contributeDataPage.age.indexAge);
    const minAge = useSelector<RootState, number>((state) => state.contributeDataPage.age.minAge);
    const maxAge = useSelector<RootState, number>((state) => state.contributeDataPage.age.maxAge);
    const nbrFalsyAgeVal = useSelector<RootState, number>((state) => state.contributeDataPage.age.numberFalsyAgeValues);

    const isMaleExists = useSelector<RootState, boolean>((state) => state.contributeDataPage.gender.isMaleExists);
    const maleOccurrences = useSelector<RootState, number>(
        (state) => state.contributeDataPage.gender.numberMaleOccurrences
    );
    const isFemaleExists = useSelector<RootState, boolean>((state) => state.contributeDataPage.gender.isFemaleExists);
    const femaleOccurrences = useSelector<RootState, number>(
        (state) => state.contributeDataPage.gender.numberFemaleOccurrences
    );
    const isTransgenderExists = useSelector<RootState, boolean>(
        (state) => state.contributeDataPage.gender.isTransgenderExists
    );
    const transgenderOccurrences = useSelector<RootState, number>(
        (state) => state.contributeDataPage.gender.numberTransgenderOccurrences
    );
    const falsyGenderValues = useSelector<RootState, FalsyGenderValue[]>(
        (state) => state.contributeDataPage.gender.falsyGenderValues
    );

    // -- EFFECTS --

    useEffect(() => {
        if (!selectedFile) return;

        // Process dataset
        batch(() => {
            processAge();
            processGender();
        });
    }, [dispatch, selectedFile]);

    // -- HELPERS --

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
                case gender.match(/^(\s*(male|m|mann|männlich|xy)\s*)$/i)?.input:
                    isMaleExists = true;
                    nbrMaleOccurrences++;
                    break;

                case gender.match(/^(\s*(female|frau|weiblich|woman|w|xx)\s*)$/i)?.input:
                    isFemaleExists = true;
                    nbrFemaleOccurrences++;
                    break;

                case gender.match(/^(\s*(transgender|trans|)\s*)$/i)?.input:
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
    };

    // -- RENDER --

    return (
        <Page heading="Contribute-Data" icon={wallet}>
            <Container
                styleProps={{
                    display: "grid",
                    gridTemplateColumns: "1fr 50% 1fr",
                    gridGap: "80px",
                    width: "100%",
                }}
            >
                <Container styleProps={{ gridColumn: "2" }}>
                    <Container styleProps={{ height: "400px" }}>
                        <CSVReader
                            onDrop={handleSelectFile}
                            onError={() => console.log("Error")}
                            config={{ header: false }}
                            style={{
                                dropArea: {
                                    borderColor: Colors.GREY_LIGHT,
                                    borderRadius: BORDER_RADIUS,
                                    width: "100%",
                                    marginBottom: "50px",
                                },
                                dropAreaActive: {
                                    borderColor: "red",
                                },
                                dropFile: {
                                    width: 800,
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
                                    width: 800,
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
                        {selectedFile && (
                            <Button
                                buttonType="primary"
                                onClickHandle={handleCalculateValue}
                                styleProps={{ marginLeft: "auto" }}
                            >
                                {ctaLabel}
                            </Button>
                        )}
                    </Row>
                </Container>

                <Text textType="nudge" styleProps={{ width: "75%", margin: "0 auto 0 0" }}>
                    Help us improve our platform and facilitate the process of diagnosis, ultimatively helping patients
                    getting the best medical resources possible! By contributing high quality datasets, you will be
                    given Medicalvalues-Coins, with which you can access our products at a discounted price.
                    <br />
                    <br />
                    Help us improve our platform and facilitate the process of diagnosis, ultimatively helping patients
                    getting the best medical resources possible! By contributing high quality datasets, you will be
                    given Medicalvalues-Coins, with which you can access our products at a discounted price. Help us
                    improve our platform and facilitate the process of diagnosis, ultimatively helping patients getting
                    the best medical resources possible! By contributing high quality datasets, you will be given
                    Medicalvalues-Coins, with which you can access our products at a discounted price.
                </Text>
            </Container>
        </Page>
    );
};
