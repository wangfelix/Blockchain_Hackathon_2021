import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import document from "Illustrations/documentIcon.png";
import { Text } from "BaseComponents/text";
import { RootState } from "State/Reducers";
import wallet from "Illustrations/wallet.png";
import { Page } from "BaseComponents/page";
import { Container } from "BaseComponents/container";
import { CSVReader } from "react-papaparse";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
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
import { GenderState } from "State/Reducers/contributeDataPageReducer";
import { MediSys_Functions } from "Utils/smartContractUtils";

export const ContributeDataPageDataSetValueDetailsPage = () => {
    const isModalOpen = useSelector<RootState, boolean>((state) => state.modals.isRegistrationModalOpen);

    const isLoincExist = useSelector<RootState, boolean>((state) => state.contributeDataPage.loinc);
    const isRadlexExist = useSelector<RootState, boolean>((state) => state.contributeDataPage.radlex);
    const isSnomedExist = useSelector<RootState, boolean>((state) => state.contributeDataPage.snomed.isSnomedExists);
    const numOfFalsySnomedValues = useSelector<RootState, number>(
        (state) => state.contributeDataPage.snomed.numberOfFalsySnomedValues
    );

    const numOfPatients = useSelector<RootState, number>((state) => state.contributeDataPage.numberOfPatients);
    const numOfAttributes = useSelector<RootState, number>((state) => state.contributeDataPage.numberOfAttributes);

    const isAgeExists = useSelector<RootState, boolean>((state) => state.contributeDataPage.age.isAgeExists);
    const numFalsyAgeValues = useSelector<RootState, number>(
        (state) => state.contributeDataPage.age.numberFalsyAgeValues
    );

    const { numberMaleOccurrences, numberFemaleOccurrences, numberTransgenderOccurrences, falsyGenderValues } =
        useSelector<RootState, GenderState>((state) => state.contributeDataPage.gender);

    let genderArr: string[] = [];

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

    const genderValue = useGetGenderValue(genderArr);

    const datasetValue = useSelector<RootState, number>((state) => state.contributeDataPage.datasetValue);

    const { send: transferFrom } = useMediSysMethod(MediSys_Functions.TRANSFER_FROM);
    const transfer = () => {
        transfer();
    };

    return (
        <Page heading="Contribute-Data" icon={document}>
            <Container
                styleProps={{
                    display: "grid",
                    gridTemplateColumns: "1fr 50% 1fr",
                    gridGap: "80px",
                    width: "100%",
                }}
            >
                <Container styleProps={{ gridColumn: "2" }}>
                    <Container
                        styleProps={{
                            //background: "red",
                            border: "solid",
                            borderColor: "lightgrey",
                            borderWidth: "1px",
                            borderRadius: "5px",
                            padding: "15px",
                            marginBottom: "70px",
                        }}
                    >
                        <Text
                            styleProps={{
                                color: "grey",
                                marginBottom: "50px",
                            }}
                        >
                            Selected file:
                        </Text>

                        <Row
                            styleProps={{
                                width: "100%",
                                //background:"red"
                            }}
                        >
                            <Button
                                buttonType="text"
                                styleProps={{
                                    width: "200px",
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                buttonType="secondary"
                                styleProps={{
                                    width: "200px",
                                    marginLeft: "auto",
                                }}
                            >
                                Select new file
                            </Button>
                        </Row>
                    </Container>
                    <Container styleProps={{ marginBottom: "50px", alignItems: "space-between" }}>
                        <Text textType="text" styleProps={{ color: "grey", marginBottom: "30px" }}>
                            Quality of your dataset:
                        </Text>

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text textType="text">Loinc</Text>
                            <img
                                alt={isLoincExist ? "Checkmark" : "Crossing"}
                                src={isLoincExist ? Checkmark : Crossing}
                                style={{ height: "15px" }}
                            />
                        </Row>
                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text textType="text">Radlex</Text>
                            <img
                                alt={isRadlexExist ? "Checkmark" : "Crossing"}
                                src={isRadlexExist ? Checkmark : Crossing}
                                style={{ height: "15px" }}
                            />
                        </Row>

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
                                style={{ height: "15px" }}
                            />
                        </Row>

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text textType="text">Number of patients</Text>
                            <img
                                src={
                                    numOfPatients >= 1000
                                        ? fivePoints
                                        : numOfPatients >= 600
                                        ? fourPoints
                                        : numOfPatients >= 400
                                        ? threepoints
                                        : numOfPatients >= 200
                                        ? twoPoints
                                        : numOfPatients >= 10
                                        ? onePoint
                                        : zeroPoints
                                }
                                style={{ height: "15px" }}
                            />
                        </Row>

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text textType="text">Correctness of patients age</Text>
                            <img
                                src={
                                    isAgeExists
                                        ? numFalsyAgeValues <= 5
                                            ? fivePoints
                                            : numFalsyAgeValues <= 10
                                            ? fourPoints
                                            : numFalsyAgeValues <= 15
                                            ? threepoints
                                            : numFalsyAgeValues <= 20
                                            ? twoPoints
                                            : numFalsyAgeValues <= 25
                                            ? onePoint
                                            : zeroPoints
                                        : zeroPoints
                                }
                                style={{ height: "15px" }}
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
                                style={{ height: "15px" }}
                            />
                        </Row>

                        <Row styleProps={{ justifyContent: "space-between", marginBottom: "10px" }}>
                            <Text>Number of attributes</Text>
                            <img
                                src={
                                    numOfAttributes >= 30
                                        ? fivePoints
                                        : numOfAttributes >= 24
                                        ? fourPoints
                                        : numOfAttributes >= 18
                                        ? threepoints
                                        : numOfAttributes >= 12
                                        ? twoPoints
                                        : numOfAttributes >= 6
                                        ? onePoint
                                        : zeroPoints
                                }
                                style={{ height: "15px" }}
                            />
                        </Row>

                        <Row styleProps={{ marginTop: "40px" }}>
                            <Text
                                styleProps={{
                                    color: "grey",
                                    marginLeft: "auto",
                                }}
                            >
                                <h2>Approximate value of your dataset:</h2>
                            </Text>
                            <h2 style={{ color: "black", marginLeft: "auto" }}>{datasetValue} MediCoins</h2>
                        </Row>
                    </Container>
                    <Row styleProps={{ justifyContent: "flex-end" }}>
                        <Button buttonType="primary" styleProps={{ width: "200px", marginBottom: "50px" }}>
                            Upload Dataset
                        </Button>
                    </Row>
                </Container>
                <Text styleProps={{ gridColumn: "3", width: "50%" }}>
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
