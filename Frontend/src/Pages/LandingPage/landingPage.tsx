import React from "react";
import { useEthers } from "@usedapp/core";
import ParticlesBg from "particles-bg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Button } from "BaseComponents/Button/button";
import { LandingPageSection } from "Pages/LandingPage/Components/landingPageSection";
import LandingPicture from "Illustrations/Drawkit-Vector-Illustration-Medical-16.png";
import { Colors } from "Utils/globalStyles";
import { useIsLoggedIn } from "Utils/hooks";
import { Page } from "BaseComponents/page";
import { Row } from "BaseComponents/row";
import { setRegistrationModalOpen } from "State/Actions/actionCreators";
import { Container } from "BaseComponents/container";
import { Paths } from "Utils/paths";

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

    // -- CALLBACKS --

    const openRegistrationModal = () => dispatch(setRegistrationModalOpen(true));

    const handleGoToDemoPage = () => history.push(Paths.DEMO);

    // -- STYLES --

    const imageStyle = {
        width: "300px",
        height: "500px",
        objectFit: "cover" as "cover",
    };

    // -- RENDER --

    return (
        <Page layout="landing">
            <ParticlesBg type="cobweb" color={Colors.PRIMARY_ACCENT} num={550} bg={true} />

            <LandingPageSection color="transparent">
                <Container
                    styleProps={{
                        width: "90%",
                        maxWidth: "800px",
                        padding: "40px",
                        background: "rgba(250, 245, 256, 0.3)",
                        backdropFilter: "blur(5px)",
                        boxShadow: "0 0 20px 10px rgba(185, 175, 190, 0.2)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Row styleProps={{ marginBottom: "30px", justifyContent: "center" }}>
                        <h1
                            style={{
                                fontWeight: "bold",
                                fontSize: "50px",
                                fontFamily: "Work Sans",
                                color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                letterSpacing: "10px",
                                marginRight: "-10px", // remove letter-spacing from last letter
                            }}
                        >
                            Medi-System
                        </h1>
                    </Row>
                    <Row>
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
                                Watch Demo
                            </Button>
                        </Row>
                    </Row>
                </Container>
            </LandingPageSection>

            {landingSections.map((section, index) => (
                <LandingPageSection
                    sectionTitle={section.title}
                    color={index % 2 === 0 ? "primary" : "secondary"}
                    firstSection={index === 0 ?? true}
                    key={index}
                >
                    <div>{section.description}</div>
                    {section.illustration && <img style={imageStyle} src={section.illustration} />}
                </LandingPageSection>
            ))}
        </Page>
    );
};
