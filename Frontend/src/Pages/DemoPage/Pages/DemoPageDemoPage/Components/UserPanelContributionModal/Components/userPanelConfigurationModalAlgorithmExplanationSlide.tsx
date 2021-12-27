import React from "react";

import { Container } from "BaseComponents/container";
import Lottie from "react-lottie";
import codeRunning from "Illustrations/Lotties/codeRunningAnimation.json";
import { Text } from "BaseComponents/text";

export const UserPanelConfigurationModalAlgorithmExplanationSlide = () => {
    const lottieOptions = {
        animationData: codeRunning,
        loop: true,
        autoplay: true,
    };

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
                    width: "600px",
                    gap: 10,
                    marginBottom: 50,
                }}
            >
                <Container
                    styleProps={{
                        height: 200,
                        width: 400,
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        margin: "0 auto",
                    }}
                >
                    <Lottie
                        options={lottieOptions}
                        isClickToPauseDisabled
                        style={{ width: 400, height: 400, overflow: "visible" }}
                    />
                </Container>

                <Text>
                    After selecting your dataset, the evaluation algorithm in the smart contract is run. All the quality
                    attributes, that you configured manually on the last slide, are being automatically assessed and
                    detected by the algorithm. This ensures fairness and transparency, as every user can see and
                    retrace, by which quality attributes his or her dataset has been and will be evaluated.
                    <br />
                    <br />
                    Following local regulations, all calculations are done <b>locally on your computer</b>, which means,
                    that <b>no patient data leave your local facility</b>. This shows the great advantage of the
                    blockchain over traditional, centralized servers.
                </Text>
            </Container>
        </Container>
    );
};
