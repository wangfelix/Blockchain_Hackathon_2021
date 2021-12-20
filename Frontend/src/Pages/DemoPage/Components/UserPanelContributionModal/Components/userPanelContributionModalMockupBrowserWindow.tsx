import React from "react";

import { Row } from "BaseComponents/row";
import { Container } from "BaseComponents/container";
import { Text } from "BaseComponents/text";
import { UserPanelContributionModalSuccessPart } from "Pages/DemoPage/Components/UserPanelContributionModal/Components/userPanelContributionModalSuccessPart";

export const UserPanelContributionModalMockupBrowserWindow = () => {
    // -- CONST DATA --

    const browserButtons = ["#ef6c5c", "#f5bf4c", "#4ca069"];

    // -- RENDER --

    return (
        <Container
            styleProps={{
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "rgba(50, 050, 050, 0.3) 0px 0px 20px",
                width: "100%",
            }}
        >
            <Row
                styleProps={{
                    background: "#EEE",
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <Row styleProps={{ position: "absolute", left: 0, padding: "0 15px" }}>
                    {browserButtons.map((buttonColor) => (
                        <Container
                            styleProps={{
                                background: buttonColor,
                                borderRadius: 50,
                                height: 15,
                                width: 15,
                                marginRight: 10,
                            }}
                        />
                    ))}
                </Row>

                <Text>www.medisystem.de</Text>
            </Row>

            <Row styleProps={{ justifyContent: "center" }}>
                <UserPanelContributionModalSuccessPart />
            </Row>
        </Container>
    );
};
