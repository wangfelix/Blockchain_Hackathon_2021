import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "BaseComponents/Button/button";
import { DemoPagePaths, Paths } from "Utils/paths";
import { Row } from "BaseComponents/row";
import bgImage from "Illustrations/demo-landing.jpg";
import { Container } from "BaseComponents/container";
import { Text } from "BaseComponents/text";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import ArchitectureImage from "Illustrations/ArchitectureScribble.png";
import { useIsMobile } from "Utils/hooks";
import { LandingSection } from "BaseComponents/landingSection";
import { DemoPageIntroPageInfoCard } from "Pages/DemoPage/Pages/DemoPageIntroPage/Components/demoPageIntroPageInfoCard";
import PieChart from "Illustrations/pieChart.png";
import Coins from "Illustrations/coins.png";
import Eyes from "Illustrations/eyes.png";
import LightBulb from "Illustrations/lightBulb.png";
import Dart from "Illustrations/dart.png";
import Budget from "Illustrations/budget.png";

export const DemoPageIntroPage = () => {
    const history = useHistory();

    // -- STATE --

    const isMobile = useIsMobile();

    // -- CALLBACKS --

    const handleGoToDemoPageDemoPage = () => history.push(`${Paths.DEMO_PAGE}${DemoPagePaths.DEMO_PAGE}`);

    // -- RENDER --

    return (
        <Container>
            <Row
                styleProps={{
                    width: "100%",
                    height: "80vh",
                    position: "relative",
                }}
            >
                <img
                    src={bgImage}
                    style={{ height: "100%", width: "100%", objectFit: "cover", objectPosition: "right" }}
                    alt="Blockchain Blocks"
                />

                <Container
                    styleProps={{
                        position: "absolute",
                        left: "5%",
                        padding: 25,
                        width: 450,
                        top: "40%",
                        ...(isMobile
                            ? {
                                  background: `${Colors.BLUE_DARKEST}aa`,
                                  backdropFilter: "blur(15px)",
                                  borderRadius: BORDER_RADIUS,
                              }
                            : {}),
                    }}
                >
                    <h2
                        style={{
                            marginBottom: 20,
                            fontSize: 40,
                            color: Colors.WHITE_OFF_WHITE,
                        }}
                    >
                        Showcase
                    </h2>

                    <Text styleProps={{ marginBottom: 40, color: Colors.WHITE_OFF_WHITE }}>
                        Lernen Sie MediSystem anhand einer Simulation einfach, schnell und kostenlos kennen und werden
                        Sie teil der Revolution der Medizin und Diagnosestellung.
                    </Text>

                    <Button buttonType="primary" onClickHandle={handleGoToDemoPageDemoPage}>
                        Start Demo
                    </Button>
                </Container>
            </Row>

            {/* Software-Architecture */}

            <LandingSection
                title="Architecture"
                contentLeft={
                    <>
                        <Text>
                            MediSystem consists of 3 modules.
                            <br />
                            The core of it all is the <b>smart contract</b> on the Ethereum blockchain, written in the
                            Solidity programming language. The smart contract replaces the traditional, centralized
                            server, which has several key disadvantages compared to the decentralized solution.
                        </Text>
                        <Text>
                            A frontend web-application serves as the interface between the user and the system. Future
                            users interact with it to contribute datasets and manage their MediCoin balances. The
                            application pre-processes the dataset and sends the relevant data to the smart contract via
                            a contract call. To see how this works, and how manipulation and safety is guaranteed, see
                            the section about <b>Data evaluation Algorithm</b> below.
                        </Text>
                        <Text>
                            The last piece in the puzzle is a traditional <b>server</b>. Despite the safety, privacy and
                            transparency advantages of the smart contracts and blockchain, a traditional server is still
                            needed for supporting processes and tasks. For one, storing all user data, like physical
                            addresses, profile pictures etc would be to expensive to store on the blockchain.
                            <br />
                            The server, which just like the current servers (ML-servers), that are dedicated to the
                            machine-learning algorithms training the medicalvalues-knowledge-graph, can be set up
                            locally inside the boundaries of the customers facilities. It also is responsible for
                            transferring the dataset-file from the customers computer, to the aforementioned ML-server.
                        </Text>
                    </>
                }
                contentRight={
                    <img
                        style={{
                            width: "100%",
                            boxShadow: "rgb(50 50 50 / 16%) 0px 5px 20px 0px, rgb(0 0 30 / 15%) 0px 0px 30px 10px",
                        }}
                        src={ArchitectureImage}
                        alt={"Architecture"}
                    />
                }
            />

            {/* Evaluation-Algorithm */}

            <LandingSection
                title="Dataset Evaluation Algorithm"
                backgroundColor="dark"
                content={
                    <Row
                        styleProps={{
                            maxWidth: 1500,
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 40,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        <DemoPageIntroPageInfoCard icon={Coins} iconAlt="down arrow" title="Transaction Fee Optimized">
                            Datasets can be thousands of lines long. Letting the smart-contract algorithm evaluate files
                            of this size would result in extremely high fees. Therefore, the MediSystem web-application
                            parses your dataset, before sending only the most important information to the smart
                            contract.
                        </DemoPageIntroPageInfoCard>

                        <DemoPageIntroPageInfoCard icon={Eyes} iconAlt="down arrow" title="Fairness and Transparency">
                            Located in the smart contract, every user of the blockchain can check, by which standards
                            and measurements datasets are being assessed. Everyone can be assured, that no other user is
                            being (dis-)favoured.
                        </DemoPageIntroPageInfoCard>

                        <DemoPageIntroPageInfoCard icon={PieChart} iconAlt="down arrow" title="Dynamic Reward System">
                            Contributions are especially valuable when data about the disease is rare. The algorithm
                            rewards earlier contributions by paying them with more MediCoins. This is achieved by a
                            final percentage, ranging between 0% and 5%, which represent the percentage of the budget,
                            which will be rewarded for the contribution.
                        </DemoPageIntroPageInfoCard>

                        <DemoPageIntroPageInfoCard icon={LightBulb} iconAlt="down arrow" title="Easy to Comprehend">
                            The algorithm is <b>pure</b>, which means, that its calculated output for a specific dataset
                            is always the same value, ranging from 0 - 1000. Afterwards, this score is projected onto a
                            percentage scale, ranging from 0% - 5, which is the share of the diseases budget, the user
                            will receive.
                        </DemoPageIntroPageInfoCard>

                        <DemoPageIntroPageInfoCard
                            icon={Dart}
                            iconAlt="down arrow"
                            title="Most Important Quality Attributes"
                        >
                            <>
                                The most relevant information for improving the knowledge-graph and therefore increasing
                                the precision of it are about <b>Age</b>, <b>Gender</b>, <b>SNOMED</b>, <b>RadLex</b>,{" "}
                                <b>Loinc</b>. The algorithm calculates a normed score between 0 and 100 for each, of
                                which the most important ones are double-weighted.
                            </>
                        </DemoPageIntroPageInfoCard>

                        <DemoPageIntroPageInfoCard icon={Budget} iconAlt="down arrow" title="Dynamic Budgets">
                            Datasets vary in value, depending on which disease they contain information about. Using
                            adjustable budgets, Medicalvalues can drive focus on specific diseases, and thus direct the
                            development of the reasoning system.
                        </DemoPageIntroPageInfoCard>
                    </Row>
                }
            />
        </Container>
    );
};
