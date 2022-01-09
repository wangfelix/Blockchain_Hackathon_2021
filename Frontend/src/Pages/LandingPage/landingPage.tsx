import React from "react";
import { useEthers } from "@usedapp/core";
import ParticlesBg from "particles-bg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";

import { Button } from "BaseComponents/Button/button";
import { LandingPageSection } from "Pages/LandingPage/Components/landingPageSection";
import LandingPicture from "Illustrations/Drawkit-Vector-Illustration-Medical-16.png";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { useIsLoggedIn } from "Utils/hooks";
import { Page } from "BaseComponents/page";
import { Row } from "BaseComponents/row";
import { setRegistrationModalOpen } from "State/Actions/actionCreators";
import { Container } from "BaseComponents/container";
import { Paths } from "Utils/paths";
import { Text } from "BaseComponents/text";
import DownArrows from "Illustrations/Lotties/DownArrows.json";
import lottieBlockchain from "Illustrations/Lotties/blockchain_lottie.json";
import dataTransfer from "Illustrations/Lotties/computer.json";
import checkmark from "Illustrations/Lotties/checkmark.json";

export const LandingPage = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const history = useHistory();

    const { account } = useEthers();

    const isLoggedIn = useIsLoggedIn();

    // -- CONST DATA --

    const landingSections = [
        {
            title: "Section 1",
            illustration: LandingPicture,
            description:
                "Unter Verwendung medizinischer Datenmengen (bspw. bei Anämien und Diabetes)" +
                "hat Künstliche Intelligenz (KI) im medizinischen Umfeld großes Potenzial, die Qualität von Diagnosen zu" +
                "verbessern und dabei Ärztinnen und Ärzte in der Stufendiagnostik von Krankheiten zu unterstützen. In diesem" +
                "Prozess kann KI und darunter besonders ML helfen, hoch komplexe Zusammenhänge zu identifizieren und vor" +
                "allem in der computergestützten Diagnostik zu berücksichtigen.",
        },
        {
            title: "Section 2",
            illustration: LandingPicture,
            description:
                "Die medicalvalues GmbH ist ein Start-up aus Karlsruhe mit ca. 20 Mitarbeitern und entwickelt die medicalvalues" +
                "platform zur Diagnose-Unterstützung. Das Hauptziel der Plattform ist die Unterstützung von Ärztinnen und" +
                "Ärzten in der frühen Erkennung von Krankheiten. Die relevanten Komponenten der medicalvalues platform sind" +
                "(1) der Editor, welcher von den Mediziner:innen zur Digitalisierung des medizinischen Wissens genutzt wird, und" +
                "(2) das Reasoning-System. Das Reasoning-System wertet die Daten von Patienten aus und generiert unter" +
                "Zuhilfenahme eines sog. Knowledge-Graphen passende Diagnose- und Behandlungsvorschläge. Der KnowledgeGraph" +
                "wird von kooperierenden Mediziner:innen gepflegt und mittels aktueller Messdaten und MachineLearning (ML) laufend optimiert.",
        },
    ];

    const lottieOptions = {
        downArrowOptions: {
            animationData: DownArrows,
            loop: true,
            autoplay: true,
        },
    };

    // -- CALLBACKS --

    const openRegistrationModal = () => dispatch(setRegistrationModalOpen(true));

    const handleGoToDemoPage = () => history.push(Paths.DEMO_PAGE);

    // -- STYLES --

    const imageStyle = {
        width: "300px",
        height: "500px",
        objectFit: "cover" as "cover",
    };

    // -- RENDER --

    return (
        <Page layout="landing">
            <Row styleProps={{ background: Colors.BLUE_DARKEST, position: "relative" }}>
                <Container
                    styleProps={{
                        width: "100%",
                        height: "100%",
                        padding: "40px",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                    }}
                >
                    <Container styleProps={{ marginBottom: "40px", justifyContent: "center", alignItems: "center" }}>
                        <h1
                            style={{
                                fontSize: "50px",
                                color: Colors.WHITE_OFF_WHITE,
                                letterSpacing: "8px",
                                marginRight: "-8px", // remove letter-spacing from last letter
                                marginBottom: 40,
                            }}
                        >
                            Medicalvalues MediSystem
                        </h1>

                        <h3 style={{ color: Colors.GREY, textAlign: "center" }}>
                            Fair and transparent data-sharing platform for medical data.
                            <br />
                            Build on the blockchain, using the newest technologies.
                        </h3>
                    </Container>

                    <Container
                        styleProps={{
                            width: 60,
                            height: 5,
                            background: Colors.LAVENDER,
                            marginBottom: 40,
                            borderRadius: BORDER_RADIUS,
                        }}
                    />

                    <Row styleProps={{ width: "100%", justifyContent: "center", gap: "20px" }}>
                        {!isLoggedIn && (
                            <Button
                                buttonType="primary"
                                styleProps={{ width: "200px" }}
                                onClickHandle={openRegistrationModal}
                            >
                                Get Started
                            </Button>
                        )}
                        <Button
                            buttonType={"secondary"}
                            styleProps={{ width: "200px" }}
                            onClickHandle={handleGoToDemoPage}
                        >
                            Learn More
                        </Button>
                    </Row>
                </Container>

                <ParticlesBg type="cobweb" color={Colors.PRIMARY_ACCENT_BLUE_HUE} num={350} bg={false} />
            </Row>

            <LandingPageSection color="secondary" styleProps={{ height: "auto", padding: 30 }}>
                <Row styleProps={{ justifyContent: "center", alignItems: "center" }}>
                    <Lottie
                        options={lottieOptions.downArrowOptions}
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        isClickToPauseDisabled
                    />
                </Row>
            </LandingPageSection>

            {landingSections.map((section, index) => (
                <LandingPageSection
                    sectionTitle={section.title}
                    color={index % 2 === 0 ? "primary" : "secondary"}
                    key={index}
                >
                    <>
                        <Text>{section.description}</Text>
                        {section.illustration && <img style={imageStyle} src={section.illustration} />}
                    </>
                </LandingPageSection>
            ))}
        </Page>
    );
};
