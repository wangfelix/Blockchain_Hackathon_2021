import React, { useCallback } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import { sha256, toUtf8Bytes } from "ethers/lib/utils";

import { Container } from "BaseComponents/container";
import contract from "Illustrations/Lotties/contract.json";
import codeStack from "Illustrations/Lotties/codeStack.json";
import { Colors } from "Utils/globalStyles";
import { Text } from "BaseComponents/text";
import { Button } from "BaseComponents/Button/button";
import { RootState } from "State/Reducers";
import { DemoPageState } from "State/Reducers/demoPageReducer";
import {
    addDemoEvent,
    setDemoDiseaseBudget,
    setDemoDiseaseNumberOfContributions,
    setDemoIsContributionSuccessful,
    setDemoUserBalance,
    setDemoUserNumberOfContributions,
} from "State/Actions/actionCreators";

type UserPanelContributionModalSuccessPartProps = {
    handleCloseModal: () => void;
    finalDatasetValue: number;
};

export const UserPanelContributionModalSuccessPart = ({
    handleCloseModal: closeModal,
    finalDatasetValue,
}: UserPanelContributionModalSuccessPartProps) => {
    const dispatch = useDispatch();

    // -- STATE --

    const demoState = useSelector<RootState, DemoPageState>((state) => state.demoPage);

    const {
        contribution: contributionState,
        diseases,
        indexOfContributingUser: contributionUserIndex,
        users,
    } = demoState;

    const contributionDiseaseName = contributionState?.disease;

    const contributionDiseaseNumberOfContributions = diseases.find(
        (disease) => disease.name === contributionDiseaseName
    )?.numberContributions;

    const contributionDiseaseBudget = diseases.find((disease) => disease.name === contributionDiseaseName)?.budget;

    const contributionUserBalance = users.find((user) => user.index === contributionUserIndex)?.balance;

    const contributionUserNumberOfContributions = users.find(
        (user) => user.index === contributionUserIndex
    )?.numberContributions;

    // -- CONST DATA --

    const lottieOptions = {
        contractOptions: {
            animationData: contract,
            loop: false,
            autoplay: true,
        },
        codeStackOptions: {
            animationData: codeStack,
            loop: false,
            autoplay: true,
        },
    };

    // -- CALLBACKS --

    const handleCloseModal = useCallback(() => {
        if (
            contributionDiseaseBudget === undefined ||
            !contributionDiseaseName ||
            contributionUserIndex === undefined ||
            contributionUserBalance === undefined ||
            contributionDiseaseNumberOfContributions === undefined ||
            contributionUserNumberOfContributions === undefined
        )
            return; // TODO Toast Error

        // Start the Lottie animations and update the store.
        batch(() => {
            dispatch(setDemoDiseaseBudget(contributionDiseaseName, contributionDiseaseBudget - finalDatasetValue));
            dispatch(
                setDemoDiseaseNumberOfContributions(
                    contributionDiseaseName,
                    contributionDiseaseNumberOfContributions + 1
                )
            );
            dispatch(setDemoUserBalance(contributionUserIndex, contributionUserBalance + finalDatasetValue));
            dispatch(
                setDemoUserNumberOfContributions(contributionUserIndex, contributionUserNumberOfContributions + 1)
            );
            dispatch(
                addDemoEvent({
                    date: `${new Date()}`,
                    userAddress: `${sha256(toUtf8Bytes(`${contributionUserIndex}`))}`, // TODO: Save the user address to the redux store, if needed elsewhere.
                    datasetHash: `${sha256(toUtf8Bytes(`${Math.random().toString(36)}`))}`, // Simulate Random Filename.
                    diseaseName: contributionDiseaseName,
                    transferredMediCoins: finalDatasetValue,
                })
            );
        });

        closeModal();

        dispatch(setDemoIsContributionSuccessful(true));
    }, [
        closeModal,
        contributionDiseaseBudget,
        contributionDiseaseName,
        contributionDiseaseNumberOfContributions,
        contributionUserBalance,
        contributionUserIndex,
        contributionUserNumberOfContributions,
        dispatch,
        finalDatasetValue,
    ]);

    // -- RENDER --

    return (
        <>
            <h2 style={{ color: Colors.PRIMARY_ACCENT_HUE_DARKER, marginBottom: 10 }}>Contribution successful !</h2>

            <Container
                styleProps={{
                    position: "relative",
                    height: 320,
                    width: 500,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Lottie
                    options={lottieOptions.codeStackOptions}
                    style={{
                        width: 500,
                        height: 500,
                    }}
                />

                <Lottie
                    options={lottieOptions.contractOptions}
                    style={{ height: 200, width: 200, position: "absolute", bottom: 20, right: 50 }}
                />
            </Container>

            <Text
                styleProps={{
                    color: Colors.LAVENDER,
                    padding: "0 20px",
                    marginBottom: 30,
                    height: 72,
                    lineHeight: 1.5,
                    fontSize: 15,
                }}
            >
                Your contribution has been documented in the blockchain. Every observer can validate, that a dataset
                about the disease {contributionDiseaseName} has been contributed to Medisystem under your address, and
                that you have been rewarded {finalDatasetValue} MediCoins in exchange.
            </Text>

            <Button
                buttonType="primary"
                onClickHandle={handleCloseModal}
                styleProps={{ height: 40, borderRadius: 50, padding: "0 30px", position: "absolute", bottom: 30 }}
            >
                Finish
            </Button>
        </>
    );
};
