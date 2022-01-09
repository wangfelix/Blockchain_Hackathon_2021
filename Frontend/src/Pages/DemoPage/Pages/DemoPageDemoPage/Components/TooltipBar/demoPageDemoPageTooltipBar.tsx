import React, { useState } from "react";

import { Row } from "BaseComponents/row";
import { BORDER_RADIUS } from "Utils/globalStyles";
import { DemoPageDemoPageDiseaseTooltip } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/TooltipBar/Components/demoPageDemoPageDiseaseTooltip";
import { Container } from "BaseComponents/container";
import { DemoPageDemoPageTooltipBarBlockchainEventLogTooltip } from "Pages/DemoPage/Pages/DemoPageDemoPage/Components/TooltipBar/Components/demoPageDemoPageTooltipBarBlockchainEventLogTooltip";

export const DemoPageDemoPageTooltipBar = () => {
    // -- STATE --

    const [isOnePanelOpen, setIsOnePanelOpen] = useState(false);

    // -- RENDER --

    return (
        <Row
            styleProps={{
                background: "rgba(104,178,255,0.25)",
                backdropFilter: "blur(10px)",
                top: 50,
                margin: "0 auto",
                position: "absolute",
                padding: 5,
                borderRadius: 10,
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <DemoPageDemoPageDiseaseTooltip isOtherPanelOpen={isOnePanelOpen} setIsOtherPanelOpen={setIsOnePanelOpen} />

            <Container
                style={{ width: 2, background: "rgba(104,178,255,0.5)", borderRadius: BORDER_RADIUS, height: 25 }}
            />

            <DemoPageDemoPageTooltipBarBlockchainEventLogTooltip
                isOtherPanelOpen={isOnePanelOpen}
                setIsOtherPanelOpen={setIsOnePanelOpen}
            />
        </Row>
    );
};
