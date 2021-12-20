import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import { Container } from "BaseComponents/container";
import { UserPanel } from "Pages/DemoPage/Components/UserPanel/userPanel";
import { UserPanelContributionModal } from "Pages/DemoPage/Components/UserPanelContributionModal/userPanelContributionModal";
import { Colors, Z_INDEX } from "Utils/globalStyles";
import { Row } from "BaseComponents/row";
import nodes from "Illustrations/Lotties/nodes.json";
import { Button } from "BaseComponents/Button/button";
import cross from "Illustrations/crossing.png";
import { DemoPagePaths, Paths } from "Utils/paths";

export const DemoPageDemoPage = () => {
    const history = useHistory();

    // -- EFFECTS --

    useEffect(() => {
        // Removes the scrollbar

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const nodesOptions = {
        animationData: nodes,
        loop: true,
        autoplay: true,
    };

    // -- CALLBACKS --

    const handleGoToDemoPageIntroPage = () => history.push(`${Paths.DEMO_PAGE}${DemoPagePaths.INTRO_PAGE}`);

    // -- RENDER --

    return (
        <Container
            styleProps={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                background: "linear-gradient(.35turn, #6c86de, #7975e0)",
                inset: 0,
                zIndex: Z_INDEX.DEMO_PAGE,
                overflow: "auto",
                padding: 50,
                alignItems: "center",
            }}
        >
            <Button
                buttonType="secondary"
                onClickHandle={handleGoToDemoPageIntroPage}
                styleProps={{
                    position: "absolute",
                    top: 20,
                    right: 30,
                    borderRadius: 50,
                    background: Colors.TRANSPARENT,
                    fontWeight: "bold",
                    fontSize: 20,
                    width: 40,
                    height: 40,
                    padding: 0,
                    borderStyle: "none",
                }}
            >
                <img src={cross} style={{ width: 30, height: 30 }} alt="cross" />
            </Button>

            <Container
                styleProps={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    maxWidth: 2000,
                    width: "100%",
                    height: "100%",
                    maxHeight: "100vh",
                }}
            >
                <Row styleProps={{ alignItems: "center", height: "100%" }}>
                    <UserPanel />
                    <Container styleProps={{ background: Colors.LAVENDER, width: "100%", height: 10 }} />
                    <UserPanel />
                </Row>

                <Row
                    styleProps={{
                        alignItems: "center",
                        position: "relative",
                        height: 100,
                        justifyContent: "space-between",
                        minWidth: 1040,
                    }}
                >
                    <Container
                        styleProps={{ width: 500, height: "100%", alignItems: "center", justifyContent: "center" }}
                    >
                        <Container styleProps={{ background: Colors.LAVENDER, width: 10, height: "100%" }} />
                    </Container>

                    <Lottie
                        options={nodesOptions}
                        style={{ width: 700, height: 500, background: Colors.TRANSPARENT, margin: 0 }}
                    />

                    <Container
                        styleProps={{ width: 500, height: "100%", alignItems: "center", justifyContent: "center" }}
                    >
                        <Container styleProps={{ background: Colors.LAVENDER, width: 10, height: "100%" }} />
                    </Container>
                </Row>

                <Row styleProps={{ alignItems: "center", height: "100%" }}>
                    <UserPanel />
                    <Container styleProps={{ width: "100%", height: 10, background: Colors.LAVENDER }} />
                    <UserPanel />
                </Row>
            </Container>

            <UserPanelContributionModal />
        </Container>
    );
};
