import React from "react";
import { useEthers } from "@usedapp/core";
import ParticlesBg from "particles-bg";

import { Button } from "BaseComponents/Button/button";
import { LandingPageSection } from "Pages/LandingPage/Components/landingPageSection";
import LandingPicture from "Illustrations/Drawkit-Vector-Illustration-Medical-16.png";
import { Colors } from "Utils/globalStyles";
import { useConnectWallet } from "Utils/hooks";

export const LandingPage = () => {
    // -- STATE --

    const { account } = useEthers();

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

    const connectWallet = useConnectWallet();

    // -- STYLES --

    const imageStyle = {
        width: "300px",
        height: "500px",
        objectFit: "cover" as "cover",
    };

    // -- RENDER --

    return (
        <>
            <ParticlesBg type="cobweb" color={Colors.PRIMARY_ACCENT} num={550} bg={true} />

            <LandingPageSection color="transparent">
                {!account && (
                    <Button buttonType="primary" onClickHandle={connectWallet}>
                        Login Using Metamask
                    </Button>
                )}
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
        </>
    );
};
