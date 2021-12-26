import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "State/Reducers";
import { Container } from "BaseComponents/container";
import {
    AgeData,
    DataCompleteness,
    DemoPageState,
    Disease,
    GenderData,
    SNOMEDData,
} from "State/Reducers/demoPageReducer";
import { Text } from "BaseComponents/text";
import { Selector, SelectorOption } from "BaseComponents/Selector";
import { Row } from "BaseComponents/row";
import { InsetForm } from "BaseComponents/Form/insetForm";
import { Z_INDEX } from "Utils/globalStyles";
import {
    setDemoContribution,
    setDemoContributionAgeData,
    setDemoContributionDataCompletenessValue,
    setDemoContributionGenderData,
    setDemoContributionSnomedData,
    setDemoDiseaseNumberOfContributions,
    setDemoNumberOfAttributes,
    setDemoNumberOfPatients,
} from "State/Actions/actionCreators";
import {
    DefaultValues,
    QuartersToHundred,
} from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/Components/UserPanelContributionModalConfigurationSlide/Utils/userPanelContributionModalConfigurationSlideTypes";

export const UserPanelContributionModalConfigurationSlide = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const demoState = useSelector<RootState, DemoPageState>((state) => state.demoPage);

    const { contribution: contributionState, diseases, indexOfContributingUser: userIndex } = demoState;

    const diseaseNames = diseases.map((disease) => disease.name);

    // Form Inputs

    const [selectedDisease, setSelectedDisease] = useState<Disease | undefined>(undefined);

    let diseaseSelectorOptions: SelectorOption[] | undefined = diseaseNames.map((diseaseName) => ({
        value: diseaseName,
        label: diseaseName,
    }));

    const [numberOfPatients, setNumberOfPatients] = useState<
        "0-200" | "200-400" | "400-600" | "600-800" | "800-1000" | ">1000"
    >("0-200");

    const numberOfPatientsOptions: SelectorOption[] = [
        { value: "0-200", label: "0-200" },
        { value: "200-400", label: "200-400" },
        { value: "400-600", label: "400-600" },
        { value: "600-800", label: "600-800" },
        { value: "800-1000", label: "800-1000" },
        { value: ">1000", label: ">1000" },
    ];

    const [numberOfAttributes, setNumberOfAttributes] = useState<"0-6" | "7-12" | "13-18" | "19-24" | "15-30" | ">30">(
        "0-6"
    );

    const numberOfAttributesOptions: SelectorOption[] = [
        { value: "0-6", label: "0-6" },
        { value: "7-12", label: "7-12" },
        { value: "13-18", label: "13-18" },
        { value: "19-24", label: "19-24" },
        { value: "15-30", label: "15-30" },
        { value: ">30", label: ">30" },
    ];

    const [ageSliderValue, setAgeSliderValue] = useState<QuartersToHundred>(0);

    const [genderSliderValue, setGenderSliderValue] = useState<QuartersToHundred>(0);

    const [snomedSliderValue, setSnomedSliderValue] = useState<QuartersToHundred>(0);

    const [dataCompleteness, setDataCompleteness] = useState<QuartersToHundred>(0);

    // -- MEMOIZED DATA --

    const defaultValues: DefaultValues = useMemo(
        () => ({
            numberOfPatientsSelector: "0-200",

            ageCheckbox: false,
            ageFalsyValuesSlider: 0,

            genderCheckbox: false,
            genderFalsyValueSlider: 0,

            snomedCheckbox: false,
            snomedFalsyValueSlider: 0,

            dataCompletenessSlider: 0,
        }),
        []
    );

    // -- EFFECTS --

    useEffect(() => {
        // Sets the object reference for selectedDisease on mount

        if (diseaseSelectorOptions && diseaseSelectorOptions[0]) {
            handleSelectDisease(diseaseSelectorOptions[0].value);
        }
    }, []);

    useEffect(() => {
        console.log("DemoState: ", demoState);
    }, [demoState]);

    useEffect(() => {
        // Create the contribution object in store

        if (!selectedDisease || userIndex === undefined || contributionState) return;

        const diseaseName = selectedDisease.name;
        const numberPatientData = "0-200";
        const numberAttributes = "0-6";

        const ageSliderValue: AgeData = `${defaultValues.ageFalsyValuesSlider}%`;
        const genderSliderValue: GenderData = `${defaultValues.genderFalsyValueSlider}%`;
        const snomedSliderValue: SNOMEDData = `${defaultValues.snomedFalsyValueSlider}%`;
        const dataCompletenessSliderValue: DataCompleteness = `${defaultValues.dataCompletenessSlider}%`;

        dispatch(
            setDemoContribution({
                user: userIndex,
                disease: diseaseName,
                datasetAttributes: {
                    numberPatientData: numberPatientData,
                    numberOfAttributes: numberAttributes,
                    ageData: defaultValues.ageCheckbox ? ageSliderValue : undefined,
                    genderData: defaultValues.genderCheckbox ? genderSliderValue : undefined,
                    snomedData: defaultValues.snomedCheckbox ? snomedSliderValue : undefined,
                    dataCompleteness: dataCompletenessSliderValue,
                },
            })
        );
    }, [contributionState, defaultValues, dispatch, selectedDisease, userIndex]);

    useEffect(() => {
        // Updates selectedDisease object after dispatching actions altering attributes inside that object.

        if (!selectedDisease) return;

        // Reference needs to be updated, as objects in the store are immutable => created new with every change.
        handleSelectDisease(selectedDisease.name);
    }, [selectedDisease]);

    // Form Inputs

    useEffect(() => {
        dispatch(setDemoNumberOfPatients(numberOfPatients));
    }, [dispatch, numberOfPatients]);

    useEffect(() => {
        dispatch(setDemoNumberOfAttributes(numberOfAttributes));
    }, [dispatch, numberOfAttributes]);

    useEffect(() => {
        dispatch(setDemoContributionAgeData(`${ageSliderValue}%`));
    }, [ageSliderValue, dispatch]);

    useEffect(() => {
        dispatch(setDemoContributionGenderData(`${genderSliderValue}%`));
    }, [dispatch, genderSliderValue]);

    useEffect(() => {
        dispatch(setDemoContributionSnomedData(`${snomedSliderValue}%`));
    }, [dispatch, snomedSliderValue]);

    useEffect(() => {
        dispatch(setDemoContributionDataCompletenessValue(`${dataCompleteness}%`));
    }, [dispatch, dataCompleteness]);

    // -- CALLBACKS --

    const handleSelectDisease = (e: string) => {
        // Get the disease object form the store with the same disease name.
        const diseaseObject = diseases.filter((disease) => {
            return disease.name === e;
        });

        if (selectedDisease && selectedDisease.name === diseaseObject[0].name) return;

        // Set that object to this state var selectedDisease.
        setSelectedDisease(diseaseObject[0]);
    };

    const handleIncrease = () => {
        if (!selectedDisease) return;

        dispatch(setDemoDiseaseNumberOfContributions(selectedDisease.name, selectedDisease.numberContributions + 1));
    };

    const isTypeTwoHundredsToThousand = (
        str: string
    ): "0-200" | "200-400" | "400-600" | "600-800" | "800-1000" | ">1000" | undefined =>
        ["0-200", "200-400", "400-600", "600-800", "800-1000", ">1000"].filter((item) => item === str).length !== 0
            ? (str as "0-200" | "200-400" | "400-600" | "600-800" | "800-1000" | ">1000")
            : undefined;

    const isTypeFifthsToThirty = (str: string): "0-6" | "7-12" | "13-18" | "19-24" | "15-30" | ">30" | undefined =>
        ["0-6", "7-12", "13-18", "19-24", "15-30", ">30"].filter((item) => item === str).length !== 0
            ? (str as "0-6" | "7-12" | "13-18" | "19-24" | "15-30" | ">30")
            : undefined;

    // -- RENDER --

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
                    width: "500px",
                    gap: 10,
                    marginBottom: 50,
                }}
            >
                <Row
                    styleProps={{
                        width: "500px",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text styleProps={{ fontSize: 17 }}>Disease:</Text>

                    <Container styleProps={{ width: 250, zIndex: Z_INDEX.DEMO_PAGE_MODAL }}>
                        <Selector options={diseaseSelectorOptions} onChange={handleSelectDisease} />
                    </Container>
                </Row>
            </Container>

            <InsetForm
                title="Quality Attributes"
                formStyleProps={{
                    form: {
                        width: "650px",
                        alignItems: "center",
                        maxHeight: 300,
                        overflow: "auto",
                    },
                }}
                content={[
                    {
                        label: "Number of patients",
                        type: "Selector",
                        selectorOptions: numberOfPatientsOptions,
                        onChange: (e) => {
                            if (typeof e === "string") {
                                const input = isTypeTwoHundredsToThousand(e);

                                if (input) {
                                    setNumberOfPatients(input);
                                }
                            }
                        },
                    },
                    {
                        label: "Number of attributes",
                        type: "Selector",
                        selectorOptions: numberOfAttributesOptions,
                        onChange: (e) => {
                            if (typeof e === "string") {
                                const input = isTypeFifthsToThirty(e);

                                if (input) {
                                    setNumberOfAttributes(input);
                                }
                            }
                        },
                    },

                    {
                        label: "Age data available",
                        type: "Checkbox",
                        defaultIsChecked: defaultValues.ageCheckbox,
                        onChange: (e) => {
                            if ((e as React.ChangeEvent<HTMLInputElement>).target !== undefined) {
                                if (!contributionState || !contributionState.datasetAttributes) return;

                                dispatch(
                                    setDemoContributionAgeData(
                                        (e as React.ChangeEvent<HTMLInputElement>).target.checked
                                            ? `${ageSliderValue}%`
                                            : undefined
                                    )
                                );
                            }
                        },
                    },
                    {
                        label: "Invalid age values (%)",
                        type: "Slider",
                        defaultValueSlider: defaultValues.ageFalsyValuesSlider,
                        isSliderDisabled: contributionState?.datasetAttributes?.ageData === undefined,
                        sliderValue: ageSliderValue,
                        onChange: (e) => {
                            if ((e as Event).target) {
                                // @ts-ignore
                                setAgeSliderValue((e as Event).target.value);
                            }
                        },
                    },

                    {
                        label: "Gender data available",
                        type: "Checkbox",
                        defaultIsChecked: defaultValues.genderCheckbox,
                        onChange: (e) => {
                            if ((e as React.ChangeEvent<HTMLInputElement>).target !== undefined) {
                                console.log((e as React.ChangeEvent<HTMLInputElement>).target.checked);

                                dispatch(
                                    setDemoContributionGenderData(
                                        (e as React.ChangeEvent<HTMLInputElement>).target.checked
                                            ? `${genderSliderValue}%`
                                            : undefined
                                    )
                                );
                            }
                        },
                    },
                    {
                        label: "Invalid gender values (%)",
                        type: "Slider",
                        defaultValueSlider: defaultValues.genderFalsyValueSlider,
                        isSliderDisabled: contributionState?.datasetAttributes?.genderData === undefined,
                        sliderValue: genderSliderValue,
                        onChange: (e) => {
                            if ((e as Event).target) {
                                // @ts-ignore
                                setGenderSliderValue((e as Event).target.value);
                            }
                        },
                    },

                    {
                        label: "SNOMED data available",
                        type: "Checkbox",
                        defaultIsChecked: defaultValues.snomedCheckbox,
                        onChange: (e) => {
                            if ((e as React.ChangeEvent<HTMLInputElement>).target !== undefined) {
                                dispatch(
                                    setDemoContributionSnomedData(
                                        (e as React.ChangeEvent<HTMLInputElement>).target.checked
                                            ? `${snomedSliderValue}%`
                                            : undefined
                                    )
                                );
                            }
                        },
                    },
                    {
                        label: "Invalid SNOMED values (%)",
                        type: "Slider",
                        defaultValueSlider: defaultValues.snomedFalsyValueSlider,
                        isSliderDisabled: contributionState?.datasetAttributes?.snomedData === undefined,
                        sliderValue: snomedSliderValue,
                        onChange: (e) => {
                            if ((e as Event).target) {
                                console.log((e as Event).target);

                                // @ts-ignore
                                setSnomedSliderValue((e as Event).target.value);
                            }
                        },
                    },

                    {
                        label: "Empty fields (%)",
                        type: "Slider",
                        defaultValueSlider: defaultValues.dataCompletenessSlider,
                        sliderValue: dataCompleteness,
                        onChange: (e) => {
                            if ((e as Event).target) {
                                console.log((e as Event).target);

                                // @ts-ignore
                                setDataCompleteness((e as Event).target.value);
                            }
                        },
                    },
                ]}
            />
        </Container>
    );
};

// TODO Component needs clean up
