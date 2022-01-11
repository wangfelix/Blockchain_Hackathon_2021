import React from "react";
import ParticlesBg from "particles-bg";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";

import { Button } from "BaseComponents/Button/button";
import { LandingPageSection } from "Pages/LandingPage/Components/landingPageSection";
import ArtificialIntelligence from "Illustrations/artificial-intelligence.jpg";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { useIsLoggedIn } from "Utils/hooks";
import { Page } from "BaseComponents/page";
import { Row } from "BaseComponents/row";
import { setRegistrationModalOpen } from "State/Actions/actionCreators";
import { Container } from "BaseComponents/container";
import { Paths } from "Utils/paths";
import { Text } from "BaseComponents/text";
import DownArrows from "Illustrations/Lotties/DownArrows.json";
import { LandingSection, LandingSectionProps } from "BaseComponents/landingSection";
import MLServer from "Illustrations/landing-page-ml-server.png";
import ScientistNodes from "Illustrations/scientist_nodes.png";
import Ethereum from "Illustrations/ethereum_illustration.png";
import PeopleTalking from "Illustrations/people_talking_on_pie_chart.png";

export const LandingPage = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const history = useHistory();

    const isLoggedIn = useIsLoggedIn();

    // -- STYLES --

    const imageStyle = {
        width: "55%",
        objectFit: "cover" as "cover",
    };

    // -- CONST DATA --

    const newLandingSections: LandingSectionProps[] = [
        {
            title: "Artificial Intelligence in Medicine",
            content: (
                <>
                    <Text>
                        Unter Verwendung medizinischer Datenmengen (bspw. bei Anämien und Diabetes) hat Künstliche
                        Intelligenz (KI) im medizinischen Umfeld großes Potenzial, die Qualität von Diagnosen zu
                        verbessern und dabei Ärztinnen und Ärzte in der Stufendiagnostik von Krankheiten zu
                        unterstützen. In diesem Prozess kann KI und darunter besonders ML helfen, hoch komplexe
                        Zusammenhänge zu identifizieren und vor allem in der computergestützten Diagnostik zu
                        berücksichtigen.
                    </Text>

                    <img style={imageStyle} src={ArtificialIntelligence} alt="artificial intelligence" />
                </>
            ),
        },
        {
            title: "About Medicalvalues",
            backgroundColor: "dark",
            content: (
                <Text>
                    Die medicalvalues GmbH ist ein Start-up aus Karlsruhe mit ca. 20 Mitarbeitern und entwickelt die
                    medicalvalues platform zur Diagnose-Unterstützung. Das Hauptziel der Plattform ist die Unterstützung
                    von Ärztinnen und und dabei Ärztinnen und Ärzte in der Stufendiagnostik von Krankheiten zu
                    unterstützen. In diesem Prozess kann KI und darunter besonders ML helfen, hoch komplexe
                    Zusammenhänge zu identifizieren und vor allem in der computergestützten Diagnostik zu
                    berücksichtigen. Ärzten in der frühen Erkennung von Krankheiten. Die relevanten Komponenten der
                    medicalvalues platform sind (1) der Editor, welcher von den Mediziner:innen zur Digitalisierung des
                    medizinischen Wissens genutzt wird, und (2) das Reasoning-System. Das Reasoning-System wertet die
                    Daten von Patienten aus und generiert unter Zuhilfenahme eines sog. Knowledge-Graphen passende
                    Diagnose- und Behandlungsvorschläge. Der KnowledgeGraph wird von kooperierenden Mediziner:innen
                    gepflegt und mittels aktueller Messdaten und MachineLearning (ML) laufend optimiert.
                </Text>
            ),
        },
        {
            title: "What is MediSystem?",
            content: (
                <Container>
                    <Row
                        styleProps={{
                            alignItems: "center",
                            padding: "0 150px",
                            borderBottom: `solid 3px ${Colors.PRIMARY_ACCENT_HUE_DARKER}`,
                        }}
                    >
                        <img src={MLServer} alt="Server" style={{ width: 350, objectFit: "cover" as "cover" }} />

                        <h3
                            style={{
                                fontSize: 30,
                                lineHeight: 1.2,
                                fontWeight: "500",
                                color: "#5a73bc",
                                marginRight: 60,
                                width: 205,
                                flexShrink: 0,
                            }}
                        >
                            Gathers Data For ML-Server
                        </h3>

                        <Text>
                            MediSystem is a supporting application for the Medicalvalues knowledge-graph. Big amounts of
                            data are necessary for the developement of it. Therefore, MediSystem aims to offer
                            incentives for doctors and scientists for sharing research and patient data.
                        </Text>
                    </Row>

                    <Row
                        styleProps={{
                            alignItems: "center",
                            padding: "0 150px",
                            borderBottom: `solid 3px ${Colors.PRIMARY_ACCENT_HUE_DARKER}`,
                        }}
                    >
                        <Text styleProps={{ marginRight: 60 }}>
                            MediSystem comes with the MediCoin. MediCoins are virtual coins, that the user gets for
                            contributing patient data in MediSystem. Using it's evaluation algorithm, MediSystem will
                            assess the users dataset, and calculate the amount of MediCoins, that the dataset is worth
                            at the given point in time. These MediCoins can then be used for royalties for different
                            Medicalvalues products, such as the Medicalvalues workbench.
                        </Text>

                        <h3
                            style={{
                                fontSize: 30,
                                lineHeight: 1.2,
                                fontWeight: "500",
                                color: "#58bdc7",
                                width: 205,
                                flexShrink: 0,
                            }}
                        >
                            Collect MediCoins For Royalties
                        </h3>

                        <img src={ScientistNodes} alt="Server" style={{ width: 350, objectFit: "cover" as "cover" }} />
                    </Row>

                    <Row
                        styleProps={{
                            alignItems: "center",
                            padding: "0 150px",
                            borderBottom: `solid 3px ${Colors.PRIMARY_ACCENT_HUE_DARKER}`,
                        }}
                    >
                        <img
                            src={Ethereum}
                            alt="Server"
                            style={{ width: 350, objectFit: "cover" as "cover", paddingTop: 30, paddingBottom: 10 }}
                        />

                        <h3
                            style={{
                                fontSize: 30,
                                lineHeight: 1.2,
                                fontWeight: "500",
                                color: "#7c5cd9",
                                marginRight: 60,
                                width: 205,
                                flexShrink: 0,
                            }}
                        >
                            Built on the Ethereum Blockchain
                        </h3>

                        <Text>
                            Unlike traditional applications, the core of MediSystem is located on the Ethereum
                            Blockchain in a smart contract. Every participant and blockchain user can see the contract
                            in it's entirety, and therefore also see, how the contract, and especially the evaluation
                            algorithm works. The blockchain also perfectly accommodates for the government regulations,
                            as the user, as a node in the blockchain, has a copy of the MediSystem smart contract on his
                            computer, eradicating the need for patient data to leave the local facility.
                        </Text>
                    </Row>

                    <Row
                        styleProps={{
                            alignItems: "center",
                            padding: "0 150px",
                            borderBottom: `solid 3px ${Colors.PRIMARY_ACCENT_HUE_DARKER}`,
                        }}
                    >
                        <Text styleProps={{ marginRight: 60 }}>
                            Every participant and blockchain user can see the contract in it's entirety, and therefore
                            also see, how the contract, and especially the evaluation algorithm works. This proof to all
                            users, that everyone is being treated fairly and no big constituions like government funded
                            research facilities are being favoured over local doctors.
                        </Text>

                        <h3
                            style={{
                                fontSize: 30,
                                lineHeight: 1.2,
                                fontWeight: "500",
                                color: "rgb(104,178,255)",
                                width: 205,
                                flexShrink: 0,
                            }}
                        >
                            Transparency To Ensure Fairness
                        </h3>

                        <img
                            src={PeopleTalking}
                            alt="Server"
                            style={{ width: 350, objectFit: "cover" as "cover", paddingTop: 30, paddingBottom: 10 }}
                        />
                    </Row>
                </Container>
            ),
        },
    ];

    // -- CALLBACKS --

    const openRegistrationModal = () => dispatch(setRegistrationModalOpen(true));

    const handleGoToDemoPage = () => history.push(Paths.DEMO_PAGE);

    // -- RENDER --

    const lottieOptions = {
        downArrowOptions: {
            animationData: DownArrows,
            loop: true,
            autoplay: true,
        },
    };

    return (
        <Page layout="landing">
            <Row styleProps={{ background: Colors.BLUE_DARKEST, position: "relative", height: "85vh" }}>
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
                                marginRight: "-8px", // Removes letter-spacing from the last letter.
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

                <ParticlesBg type="cobweb" color={Colors.PRIMARY_ACCENT_BLUE_HUE} num={300} bg={false} />
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

            {newLandingSections.map((section) => (
                <LandingSection
                    title={section.title}
                    content={section.content ?? undefined}
                    contentLeft={section.contentLeft ?? undefined}
                    contentRight={section.contentRight ?? undefined}
                    backgroundColor={section.backgroundColor ?? undefined}
                />
            ))}
        </Page>
    );
};
