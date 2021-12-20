import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Lottie from "react-lottie";

import { Container } from "BaseComponents/container";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import { Text } from "BaseComponents/text";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { setUserPanelContributionModalOpen } from "State/Actions/actionCreators";

import lottieBlockchain from "Illustrations/Lotties/blockchain_lottie.json";
import dataTransfer from "Illustrations/Lotties/computer.json";
import checkmark from "Illustrations/Lotties/checkmark.json";

export const UserPanel = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const [isUpdatingUser, setIsUpdatingUser] = useState(false);

    const [isUploadingDataset, setIsUploadingDataset] = useState(false);

    const [isComputerAnimating, setIsComputerAnimating] = useState(false);
    const [isServerAnimating, setIsServerAnimating] = useState(false);

    // -- EFFECTS --

    useEffect(() => {
        if (isUploadingDataset) {
            setIsComputerAnimating(true);
            setIsServerAnimating(true);

            setIsUploadingDataset(false);
        }
    }, [isUploadingDataset]);

    // -- CONST DATA --

    const lottieOptions = {
        serverOptions: {
            animationData: lottieBlockchain,
            loop: true,
            autoplay: false,
        },
        computerOptions: {
            animationData: dataTransfer,
            loop: true,
            autoplay: false,
        },
        checkmarkOptions: {
            animationData: checkmark,
            loop: true,
            autoplay: false,
        },
    };

    // -- RENDER --

    return (
        <Container styleProps={{ width: 400, position: "relative", margin: "0px 20px" }}>
            <Lottie
                options={lottieOptions.checkmarkOptions}
                style={{
                    width: 30,
                    height: 30,
                    position: "absolute",
                    top: 20,
                    left: 20,
                    visibility: isUpdatingUser ? "unset" : "hidden",
                }}
                isPaused={!isUpdatingUser}
                eventListeners={[
                    {
                        eventName: "loopComplete",
                        callback: () => setIsUpdatingUser(false),
                    },
                ]}
            />

            <Row
                styleProps={{
                    height: 200,
                    overflow: "hidden",
                    alignItems: "center",
                    borderRadius: 5,
                    // background: "rgba(55,143,255,0.15)",
                    background: `${Colors.PRIMARY_ACCENT_HUE_DARKER}aa`,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    marginBottom: 12,
                }}
            >
                <Container styleProps={{ width: 200, overflow: "hidden", height: 500 }}>
                    <Lottie
                        options={lottieOptions.computerOptions}
                        style={{ width: 300, paddingLeft: 20 }}
                        isPaused={!isComputerAnimating}
                        eventListeners={[
                            {
                                eventName: "loopComplete",
                                callback: () => setIsComputerAnimating(false),
                            },
                        ]}
                    />
                </Container>

                <Container styleProps={{ width: 300, overflow: "hidden", height: 800 }}>
                    <Lottie
                        options={lottieOptions.serverOptions}
                        style={{ width: 200 }}
                        isPaused={!isServerAnimating}
                        eventListeners={[
                            {
                                eventName: "loopComplete",
                                callback: () => setIsServerAnimating(false),
                            },
                        ]}
                    />
                </Container>
            </Row>

            <Row
                styleProps={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Button
                    buttonType={"primary"}
                    styleProps={{
                        fontSize: 16,
                        width: "100%",
                        marginRight: 15,
                        background: Colors.WHITE_OFF_WHITE,
                        color: Colors.PRIMARY_ACCENT,
                    }}
                    // onClickHandle={() => setIsUploadingDataset(true)}
                    onClickHandle={() => dispatch(setUserPanelContributionModalOpen(true))}
                >
                    Contribute Data
                </Button>

                <Text
                    styleProps={{
                        background: "rgba(104,178,255,0.25)",
                        borderRadius: BORDER_RADIUS,
                        fontWeight: "bold",
                        fontSize: 18,
                        padding: "10px 20px",
                        width: "100%",
                        textAlign: "center",
                        color: Colors.WHITE_OFF_WHITE,
                    }}
                >
                    25 MDC
                </Text>
            </Row>
        </Container>
    );
};
