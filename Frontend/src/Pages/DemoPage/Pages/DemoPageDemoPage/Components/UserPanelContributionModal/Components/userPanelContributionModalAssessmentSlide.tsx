import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "State/Reducers";
import {
    AgeData,
    Contribution,
    DataCompleteness,
    DatasetAttributes,
    GenderData,
    NumberOfAttributes,
    NumberPatientData,
    SNOMEDData,
} from "State/Reducers/demoPageReducer";
import { Container } from "BaseComponents/container";

import { Text } from "BaseComponents/text";
import { Button } from "BaseComponents/Button/button";
import { Row } from "BaseComponents/row";
import { Colors } from "Utils/globalStyles";

type UserPanelContributionModalAssessmentSlideProps = {
    finalDatasetValue: number;
    setFinalDatasetValue: React.Dispatch<React.SetStateAction<number>>;
    contributionDiseaseName: string;
    setContributionDiseaseName: React.Dispatch<React.SetStateAction<string>>;
    handleGoToDatasetConfigurationSlide: () => void;
};

export const UserPanelContributionModalAssessmentSlide = ({
    // Lifting state up only for general data about the contribution. Data about the dataset are stored in the redux store.
    // TODO store everything in store, as the cta onClickHandler is specified in the SuccessPart-Slide
    finalDatasetValue,
    setFinalDatasetValue,
    contributionDiseaseName,
    setContributionDiseaseName,
    handleGoToDatasetConfigurationSlide,
}: UserPanelContributionModalAssessmentSlideProps) => {
    // -- STATE --

    const contribution = useSelector<RootState, Contribution>((state) => state.demoPage.contribution);

    const diseaseName = contribution?.disease;

    const diseaseBudget = useSelector<RootState, number | undefined>((state) => {
        let budget: number | undefined = undefined;

        state.demoPage.diseases.forEach((disease) => {
            if (disease.name === diseaseName) budget = disease.budget;
        });

        return budget;
    });

    const datasetAttributes: DatasetAttributes = contribution?.datasetAttributes;

    const { numberPatientData, numberOfAttributes, ageData, genderData, snomedData, dataCompleteness } =
        datasetAttributes || {};

    const isNumberPatientDataType = (attribute: any): boolean => {
        return !!["0-200", "200-400", "400-600", "600-800", "800-1000", ">1000"].find(
            (attr) => attr === (attribute as NumberPatientData)
        );
    };

    const isNumberAttributesType = (attribute: any): boolean => {
        return !!["0-6", "7-12", "13-18", "19-24", "25-30", ">30"].find(
            (attr) => attr === (attribute as NumberOfAttributes)
        );
    };

    const isNonNullableAgeData = (attribute: any): boolean => {
        return !!["0%", "25%", "50%", "75%", "100%"].find((attr) => attr === (attribute as NonNullable<AgeData>));
    };

    function getValue<
        T extends AgeData | GenderData | SNOMEDData | DataCompleteness | NumberPatientData | NumberOfAttributes
    >(attribute: T, higherBetter?: boolean) {
        if (!attribute) return 0;

        // Selector Values

        if (isNumberPatientDataType(attribute)) {
            const attr: NumberPatientData = attribute as NumberPatientData;

            switch (attr) {
                case "0-200":
                    return 0;
                case "200-400":
                    return 20;
                case "400-600":
                    return 40;
                case "600-800":
                    return 60;
                case "800-1000":
                    return 80;
                case ">1000":
                    return 100;
            }
        }

        if (isNumberAttributesType(attribute)) {
            const attr: NumberOfAttributes = attribute as NumberOfAttributes;

            switch (attr) {
                case "0-6":
                    return 0;
                case "7-12":
                    return 20;
                case "13-18":
                    return 40;
                case "19-24":
                    return 60;
                case "25-30":
                    return 80;
                case ">30":
                    return 100;
            }
        }

        // Slider Values

        if (isNonNullableAgeData(attribute)) {
            // Currently, value calculation for age, gender and snomed data is the same, so we just use the AgeData Type in the following.
            const attr = attribute as NonNullable<AgeData>;

            if (!higherBetter) {
                switch (attr) {
                    case "0%":
                        return higherBetter ? 0 : 100;
                    case "25%":
                        return higherBetter ? 25 : 75;
                    case "50%":
                        return 50;
                    case "75%":
                        return higherBetter ? 75 : 25;
                    case "100%":
                        return higherBetter ? 100 : 0;
                }
            }
        }

        return 0;
    }

    const doubleWeight = (nbr: number) => 2 * nbr;

    const [datasetNumberOfPatientsScore, setdatasetNumberOfPatientsScore] = useState<number>(0);
    const [datasetNumberOfAttributesScore, setdatasetNumberOfAttributesScore] = useState<number>(0);
    const [datasetAgeScore, setdatasetAgeScore] = useState<number>(0);
    const [datasetGenderScore, setdatasetGenderScore] = useState<number>(0);
    const [datasetSnomedScore, setdatasetSnomedScore] = useState<number>(0);
    const [datasetDataCompletenessScore, setdatasetDataCompletenessScore] = useState<number>(0);

    const [totalDatasetScore, setTotalDatasetScore] = useState<number>(0);

    // -- EFFECTS --

    useEffect(() => {
        if (diseaseName) {
            setContributionDiseaseName(diseaseName);
        }
    }, [diseaseName]);

    useEffect(() => {
        if (datasetAttributes === undefined || diseaseName === undefined || diseaseBudget === undefined) return;

        const numberPatientValue = getValue<NumberPatientData>(numberPatientData!);
        const numberAttributesValue = doubleWeight(getValue<NumberOfAttributes>(numberOfAttributes!));
        const ageValue = doubleWeight(getValue<AgeData>(ageData));
        const genderValue = doubleWeight(getValue<GenderData>(genderData));
        const snomedValue = doubleWeight(getValue<SNOMEDData>(snomedData));
        const dataCompletenessValue = getValue<DataCompleteness>(dataCompleteness!);

        const normedSum =
            numberPatientValue + numberAttributesValue + ageValue + genderValue + snomedValue + dataCompletenessValue;

        setdatasetNumberOfPatientsScore(numberAttributesValue);
        setdatasetNumberOfAttributesScore(numberAttributesValue);
        setdatasetAgeScore(ageValue);
        setdatasetGenderScore(genderValue);
        setdatasetSnomedScore(snomedValue);
        setdatasetDataCompletenessScore(dataCompletenessValue);
        setTotalDatasetScore(normedSum);

        const finalDatasetValue = (normedSum / 1000) * 0.5 * diseaseBudget;

        setFinalDatasetValue(finalDatasetValue);
    }, [
        ageData,
        dataCompleteness,
        datasetAttributes,
        diseaseBudget,
        diseaseName,
        genderData,
        getValue,
        numberOfAttributes,
        numberPatientData,
        setFinalDatasetValue,
        snomedData,
    ]);

    // -- RENDER --

    const tableContent = [
        {
            label: "Number of Patients",
            value: numberPatientData,
            score: datasetNumberOfPatientsScore,
        },
        {
            label: "Number of Attributes",
            value: numberOfAttributes,
            score: datasetNumberOfAttributesScore,
        },
        {
            label: "Invalid Age Values (%)",
            value: ageData ? ageData : "No Age Data",
            score: datasetAgeScore,
        },
        {
            label: "Invalid Gender Values (%)",
            value: genderData ? genderData : "No Gender Data",
            score: datasetGenderScore,
        },
        {
            label: "Invalid SNOMED Values (%)",
            value: snomedData ? snomedData : "No SNOMED Data",
            score: datasetSnomedScore,
        },
        {
            label: "Empty Fields Values (%)",
            value: dataCompleteness ? dataCompleteness : "",
            score: datasetDataCompletenessScore,
        },

        // fafsl
    ];

    return (
        <Container
            styleProps={{
                width: "800px",
                height: "400px",
                alignItems: "center",
            }}
        >
            <Container
                styleProps={{
                    width: "700px",
                    gap: 10,
                    marginBottom: 50,
                }}
            >
                <Container
                    styleProps={{
                        position: "relative",
                    }}
                >
                    <Container
                        styleProps={{
                            width: "100%",
                            maxHeight: 250,
                            border: "solid 1px",
                            borderColor: Colors.GREY,
                            overflow: "auto",
                            marginTop: 40,
                            flexShrink: 2,
                        }}
                    >
                        <Row
                            styleProps={{
                                justifyContent: "space-between",
                                padding: "10px 20px",
                                background: Colors.GREY_LIGHT,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                border: "solid 1px",
                                borderColor: Colors.GREY,
                                borderBottom: "none",
                            }}
                        >
                            <Container styleProps={{ flexGrow: 0, width: "40%" }}>Attribute</Container>
                            <Container styleProps={{ flexGrow: 0, width: "30%" }}>Assessed Value</Container>
                            <Container styleProps={{ flexGrow: 0, width: "20%" }}>Normed Score</Container>
                        </Row>

                        {tableContent.map((attribute, index) => (
                            <Row
                                styleProps={{
                                    justifyContent: "space-between",
                                    padding: "10px 20px",
                                    borderBottom:
                                        index === tableContent.length - 1 ? "" : `solid 1px ${Colors.GREY_LIGHT}`,
                                }}
                            >
                                <Container styleProps={{ flexGrow: 0, width: "40%" }}>{attribute.label}</Container>
                                <Container
                                    styleProps={{
                                        flexGrow: 0,
                                        width: "30%",
                                        borderLeft: `solid 2px ${Colors.GREY_LIGHT}`,
                                        borderRight: `solid 2px ${Colors.GREY_LIGHT}`,
                                    }}
                                >
                                    {attribute.value}
                                </Container>
                                <Container styleProps={{ flexGrow: 0, width: "20%" }}>{attribute.score}</Container>
                            </Row>
                        ))}
                    </Container>

                    <Row
                        styleProps={{
                            justifyContent: "space-between",
                            padding: "10px 20px",
                            background: Colors.GREY_LIGHT,
                            border: "solid 1px",
                            borderColor: Colors.GREY,
                            borderTop: "none",
                            flexShrink: 0,
                        }}
                    >
                        <Container styleProps={{ flexGrow: 0, width: "50%" }}>
                            Disease Budget: {diseaseBudget} MDC
                        </Container>
                        <Container styleProps={{ flexGrow: 0, width: "20%" }}>Sum: {totalDatasetScore}</Container>
                    </Row>
                </Container>

                <Text styleProps={{ textAlign: "unset" }}>
                    In exchange for your specified dataset, you will recieve {finalDatasetValue} Medi-Coins.
                    <Button buttonType="text" onClickHandle={handleGoToDatasetConfigurationSlide}>
                        Try other dataset configurations
                    </Button>
                </Text>
            </Container>
        </Container>
    );
};
