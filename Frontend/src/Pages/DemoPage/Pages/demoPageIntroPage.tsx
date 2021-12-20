import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "BaseComponents/Button/button";
import { DemoPagePaths, Paths } from "Utils/paths";
import { Row } from "BaseComponents/row";
import bgImage from "Illustrations/demo-landing.jpg";
import { Container } from "BaseComponents/container";
import { Text } from "BaseComponents/text";
import { Colors } from "Utils/globalStyles";

export const DemoPageIntroPage = () => {
    const history = useHistory();

    // -- CALLBACKS --

    const handleGoToDemoPageDemoPage = () => history.push(`${Paths.DEMO_PAGE}${DemoPagePaths.DEMO_PAGE}`);

    // -- RENDER --

    return (
        <Container>
            <Row
                styleProps={{
                    width: "100%",
                    height: "80vh",
                    background: "linear-gradient(#182e61, #1d3185)",
                }}
            >
                <img
                    src={bgImage}
                    style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "right" }}
                    alt="Blockchain Blocks"
                />

                <Container styleProps={{ position: "absolute", left: "5%", width: 400, top: "30%" }}>
                    <Text
                        styleProps={{
                            marginBottom: 20,
                            fontWeight: "bold",
                            fontSize: 40,
                            color: Colors.WHITE_OFF_WHITE,
                        }}
                    >
                        Showcase
                    </Text>

                    <Text styleProps={{ marginBottom: 40, color: Colors.WHITE_OFF_WHITE }}>
                        Lernen Sie Medisystem anhand einer Simulation einfach, schnell und kostenlos kennen. Lernen Sie
                        Medisystem anhand einer Simulation einfach, schnell und kostenlos kennen.
                    </Text>

                    <Button buttonType="primary" onClickHandle={handleGoToDemoPageDemoPage}>
                        Start Demo
                    </Button>
                </Container>
            </Row>
        </Container>
    );
};
