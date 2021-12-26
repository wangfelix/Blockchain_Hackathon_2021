import React from "react";
import Lottie from "react-lottie";

import { Container } from "BaseComponents/container";
import contract from "Illustrations/Lotties/contract.json";
import codeStack from "Illustrations/Lotties/codeStack.json";
import { Colors } from "Utils/globalStyles";
import { Text } from "BaseComponents/text";
import { Button } from "BaseComponents/Button/button";

type UserPanelContributionModalSuccessPartProps = {
    handleCloseModal: () => void;
};

export const UserPanelContributionModalSuccessPart = ({
    handleCloseModal,
}: UserPanelContributionModalSuccessPartProps) => {
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

    // -- RENDER --

    return (
        <>
            <h2 style={{ color: Colors.PRIMARY_ACCENT_HUE_DARKER, marginBottom: 10 }}>Contribution successful !</h2>

            <Container
                styleProps={{
                    position: "relative",
                    height: 350,
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

            <Text styleProps={{ color: Colors.LAVENDER, padding: "0 20px", marginBottom: 30, height: 72 }}>
                Your contribution has been documented in the blockchain. Every observer can see and validate, that a
                dataset about the disease $disease has been contributed to Medisystem under your address, and that you
                have been rewarded $amount MediCoins in exchange.
            </Text>

            <Button
                buttonType="primary"
                onClickHandle={handleCloseModal}
                styleProps={{ height: 40, borderRadius: 50, padding: "0 30px" }}
            >
                Finish
            </Button>
        </>
    );
};
