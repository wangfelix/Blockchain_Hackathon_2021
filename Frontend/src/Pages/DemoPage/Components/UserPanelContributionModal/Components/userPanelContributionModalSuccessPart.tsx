import React from "react";
import Lottie from "react-lottie";

import { Row } from "BaseComponents/row";
import { Container } from "BaseComponents/container";
import contract from "Illustrations/Lotties/contract.json";
import codeStack from "Illustrations/Lotties/codeStack.json";

export const UserPanelContributionModalSuccessPart = () => {
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
        <Row styleProps={{ background: "#16162e", justifyContent: "center" }}>
            <Container styleProps={{ position: "relative" }}>
                <Lottie
                    options={lottieOptions.codeStackOptions}
                    style={{
                        width: 500,
                        height: 400,
                    }}
                />

                <Lottie
                    options={lottieOptions.contractOptions}
                    style={{ height: 200, width: 200, position: "absolute", bottom: 20, right: 50 }}
                />
            </Container>
        </Row>
    );
};
