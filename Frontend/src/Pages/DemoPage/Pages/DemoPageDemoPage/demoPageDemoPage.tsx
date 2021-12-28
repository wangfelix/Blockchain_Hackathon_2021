import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router-dom";

import { Container } from "BaseComponents/container";
import { UserPanel } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanel/userPanel";
import { UserPanelContributionModal } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/UserPanelContributionModal/userPanelContributionModal";
import { Colors, Z_INDEX } from "Utils/globalStyles";
import { Row } from "BaseComponents/row";
import nodes from "Illustrations/Lotties/nodes.json";
import { Button } from "BaseComponents/Button/button";
import cross from "Illustrations/crossing.png";
import { DemoPagePaths, Paths } from "Utils/paths";
import { useSelector } from "react-redux";
import { RootState } from "State/Reducers";
import { NodeConnectionPipe } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/NodeConnectionPipe/nodeConnectionPipe";

export const DemoPageDemoPage = () => {
    // -- STATE --

    const history = useHistory();

    const isUserPanelContributionModalOpen = useSelector<RootState, boolean>(
        (state) => state.modals.isUserPanelContributionModalOpen
    );

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

    const startAnimation = useSelector<RootState, boolean>((state) => state.demoPage.isContributionSuccessful);

    // -- RENDER --

    return (
        <Container
            styleProps={{
                width: "100vw",
                minWidth: 1200,
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
                    <UserPanel userIndex={0} />
                    <NodeConnectionPipe triggerAnimation={startAnimation} />
                    <UserPanel userIndex={1} />
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
                        <NodeConnectionPipe triggerAnimation={startAnimation} vertical />
                    </Container>

                    <Lottie
                        options={nodesOptions}
                        isClickToPauseDisabled
                        isPaused={isUserPanelContributionModalOpen}
                        style={{ width: 700, height: 500, background: Colors.TRANSPARENT, margin: 0 }}
                    />

                    <Container
                        styleProps={{ width: 500, height: "100%", alignItems: "center", justifyContent: "center" }}
                    >
                        <NodeConnectionPipe triggerAnimation={startAnimation} vertical />
                    </Container>
                </Row>

                <Row styleProps={{ alignItems: "center", height: "100%" }}>
                    <UserPanel userIndex={2} />
                    <NodeConnectionPipe triggerAnimation={startAnimation} />
                    <UserPanel userIndex={3} />
                </Row>
            </Container>

            <UserPanelContributionModal />
        </Container>
    );
};
