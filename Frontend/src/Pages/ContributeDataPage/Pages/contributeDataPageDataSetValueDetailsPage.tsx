import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import document from "Illustrations/documentIcon.png";
import { Text } from "BaseComponents/text";
import { RootState } from "State/Reducers";
import { Page } from "BaseComponents/page";
import { Container } from "BaseComponents/container";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import Checkmark from "Illustrations/checkmark.png";
import Crossing from "Illustrations/crossing.png";
import fivePoints from "Illustrations/100percent.png";
import fourPoints from "Illustrations/80percent.png";
import threepoints from "Illustrations/60percent.png";
import twoPoints from "Illustrations/40percent.png";
import onePoint from "Illustrations/20percent.png";
import zeroPoints from "Illustrations/0percent.png";
import { useGetGenderValue, useMediSysMethod } from "Utils/hooks";
import { AgeState, ContributeDataState, GenderState } from "State/Reducers/contributeDataPageReducer";
import { MediSys_Functions } from "Utils/smartContractUtils";
import { useHistory } from "react-router-dom";
import { ContributeDataPagePaths, Paths } from "Utils/paths";
import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { parseMediCoin } from "Utils/utils";
import { Colors } from "Utils/globalStyles";

export const ContributeDataPageDataSetValueDetailsPage = () => {
    const history = useHistory();

    // -- STATE --

    const { account } = useEthers();

    const { datasetValue, fileHash, numberOfPatients, numberOfAttributes, loinc, radlex } = useSelector<
        RootState,
        ContributeDataState
    >((state) => state.contributeDataPage);

    // Snomed

    const isSnomedExist = useSelector<RootState, boolean>((state) => state.contributeDataPage.snomed.isSnomedExists);
    const numOfFalsySnomedValues = useSelector<RootState, number>(
        (state) => state.contributeDataPage.snomed.numberOfFalsySnomedValues
    );

    // Age

    const { isAgeExists, numberFalsyAgeValues } = useSelector<RootState, AgeState>(
        (state) => state.contributeDataPage.age
    );

    // Gender

    const { numberMaleOccurrences, numberFemaleOccurrences, numberTransgenderOccurrences, falsyGenderValues } =
        useSelector<RootState, GenderState>((state) => state.contributeDataPage.gender);

    let genderArr: string[] = [];

    const genderValue = useGetGenderValue(genderArr);

    // Smart Contract Functions

    const { state: contributeDataState, send: contributeData } = useMediSysMethod(MediSys_Functions.CONTRIBUTE_DATA);

    // -- EFFECTS --

    useEffect(() => {
        genderArr = [
            "male",
            `${numberMaleOccurrences}`,
            "female",
            `${numberFemaleOccurrences}`,
            "transgender",
            `${numberTransgenderOccurrences}`,
        ];
        falsyGenderValues.forEach((falsyValue) => {
            genderArr.push(falsyValue.value);
            genderArr.push(`${falsyValue.numberOccurrences}`);
        });
    }, [numberMaleOccurrences, numberFemaleOccurrences, numberTransgenderOccurrences, falsyGenderValues]);

    // Monitors the State of the transaction for the contribution
    useEffect(() => {
        if (contributeDataState.status === "Success") {
            history.push(Paths.ACCOUNT_AND_HISTORY_PAGE);
        }
        if (contributeDataState.errorMessage) {
            console.log("Error");
            console.log(contributeDataState.errorMessage);
        }
    }, [contributeDataState]);

    // -- HELPERS --

    const data = [
        { title: "Loinc", value: loinc },
        { title: "RadLex", value: radlex },
    ];

    // -- CALLBACKS --

    const handleGoToFileUploader = () => {
        history.push(`${Paths.CONTRIBUTE_DATA_PAGE}${ContributeDataPagePaths.FILE_UPLOADER}`);

        // Call abortContributeData function in MediSystem contract

        // Reset redux store
    };

    const handleContributeData = () => {
        console.log("BigNumber from");
        console.log(BigNumber.from(datasetValue));

        contributeData(fileHash, account, BigNumber.from(datasetValue));
    };

    // -- RENDER --

    return (
        <Page heading="Contribute-Data" icon={document}>
            <Container
                styleProps={{
                    display: "grid",
                    gridTemplateColumns: "1fr 50% 1fr",
                    gridGap: "100px",
                    width: "100%",
                }}
            >
                <Container styleProps={{ gridColumn: "2" }}>
                    <Container
                        styleProps={{
                            border: `solid 2px ${Colors.GREY_LIGHT}`,
                            borderRadius: "5px",
                            padding: "20px",
                            marginBottom: "70px",
                        }}
                    >
                        <Text styleProps={{ color: "grey", marginBottom: "50px" }}>Selected file:</Text>

                        <Row styleProps={{ width: "100%" }}>
                            <Button buttonType="text" onClickHandle={handleGoToFileUploader}>
                                Delete
                            </Button>

                            <Button
                                buttonType="secondary"
                                onClickHandle={handleGoToFileUploader}
                                styleProps={{ marginLeft: "auto" }}
                            >
                                Select new file
                            </Button>
                        </Row>
                    </Container>

                    <Container styleProps={{ marginBottom: "50px", alignItems: "space-between" }}>
                        <Text
                            textType="text"
                            styleProps={{ color: Colors.BLACK, fontWeight: "bold", fontSize: 17, marginBottom: "30px" }}
                        >
                            Quality of your dataset:
                        </Text>

                        {data.map((attribute) => (
                            <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                                <Text textType="text">{attribute.title}</Text>
                                <img
                                    alt={attribute.value ? "Checkmark" : "Crossing"}
                                    src={attribute.value ? Checkmark : Crossing}
                                    style={{ height: 20 }}
                                />
                            </Row>
                        ))}

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text textType="text">Snomed</Text>
                            <img
                                src={
                                    isSnomedExist
                                        ? numOfFalsySnomedValues <= 5
                                            ? fivePoints
                                            : numOfFalsySnomedValues <= 10
                                            ? fourPoints
                                            : numOfFalsySnomedValues <= 15
                                            ? threepoints
                                            : numOfFalsySnomedValues <= 20
                                            ? twoPoints
                                            : numOfFalsySnomedValues <= 25
                                            ? onePoint
                                            : zeroPoints
                                        : Crossing
                                }
                                style={{ height: isSnomedExist ? 15 : 20 }}
                            />
                        </Row>

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text textType="text">Number of patients</Text>
                            <img
                                src={
                                    numberOfPatients >= 1000
                                        ? fivePoints
                                        : numberOfPatients >= 600
                                        ? fourPoints
                                        : numberOfPatients >= 400
                                        ? threepoints
                                        : numberOfPatients >= 200
                                        ? twoPoints
                                        : numberOfPatients >= 10
                                        ? onePoint
                                        : zeroPoints
                                }
                                style={{ height: 15 }}
                            />
                        </Row>

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text textType="text">Correctness of patients age</Text>
                            <img
                                src={
                                    isAgeExists
                                        ? numberFalsyAgeValues <= 5
                                            ? fivePoints
                                            : numberFalsyAgeValues <= 10
                                            ? fourPoints
                                            : numberFalsyAgeValues <= 15
                                            ? threepoints
                                            : numberFalsyAgeValues <= 20
                                            ? twoPoints
                                            : numberFalsyAgeValues <= 25
                                            ? onePoint
                                            : zeroPoints
                                        : zeroPoints
                                }
                                style={{ height: 15 }}
                            />
                        </Row>

                        <Row styleProps={{ justifyContent: "space-between" }}>
                            <Text styleProps={{ marginBottom: "6px" }}>Correctness of patients gender</Text>
                            <img
                                src={
                                    genderValue >= 90
                                        ? fivePoints
                                        : genderValue >= 80
                                        ? fourPoints
                                        : genderValue >= 60
                                        ? threepoints
                                        : genderValue >= 40
                                        ? twoPoints
                                        : genderValue >= 20
                                        ? onePoint
                                        : zeroPoints
                                }
                                style={{ height: 15 }}
                            />
                        </Row>

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text>Number of attributes</Text>
                            <img
                                src={
                                    numberOfAttributes >= 30
                                        ? fivePoints
                                        : numberOfAttributes >= 24
                                        ? fourPoints
                                        : numberOfAttributes >= 18
                                        ? threepoints
                                        : numberOfAttributes >= 12
                                        ? twoPoints
                                        : numberOfAttributes >= 6
                                        ? onePoint
                                        : zeroPoints
                                }
                                style={{ height: 15 }}
                            />
                        </Row>

                        <Row styleProps={{ marginTop: "40px", alignItems: "center" }}>
                            <Text
                                styleProps={{
                                    color: "grey",
                                    marginLeft: "auto",
                                }}
                            >
                                <h2>Approximate value of your dataset:</h2>
                            </Text>

                            <h2 style={{ color: "black", marginLeft: "auto" }}>
                                {parseMediCoin(datasetValue)} MediCoins
                            </h2>
                        </Row>
                    </Container>

                    <Row styleProps={{ justifyContent: "flex-end", marginBottom: "50px" }}>
                        <Button buttonType="primary" onClickHandle={handleContributeData}>
                            Upload Dataset
                        </Button>
                    </Row>
                </Container>

                <Text styleProps={{ gridColumn: "3", width: "100%", marginRight: 80 }}>
                    Help us improve our platform and facilitate the process of diagnosis, ultimately helping patients
                    getting the best medical resources possible!
                    <br></br>
                    <br></br>
                    By contributing high-quality datasets, you will be given MediCoins, with which you can access our
                    products at a discounted price.
                </Text>
            </Container>
        </Page>
    );
};
