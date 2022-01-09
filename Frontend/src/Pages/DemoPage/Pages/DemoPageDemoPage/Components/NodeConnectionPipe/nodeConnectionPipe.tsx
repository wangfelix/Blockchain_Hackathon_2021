import React, { useEffect, useState } from "react";

import { Container } from "BaseComponents/container";
import "Pages/DemoPage/Pages/DemoPageDemoPage/Components/NodeConnectionPipe/Utils/nodeConnectionPipeStyles.css";
import { Colors } from "Utils/globalStyles";
import { getRandomElementFromArray } from "Utils/utils";

type NodeConnectionPipeProps = {
    height?: number;
    width?: number;
    background?: string;
    triggerAnimation: boolean;
    vertical?: boolean;
};
export const NodeConnectionPipe = ({
    height,
    width,
    background,
    triggerAnimation,
    vertical,
}: NodeConnectionPipeProps) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const orientation = vertical ? "vertical" : "horizontal";

    useEffect(() => {
        if (triggerAnimation) {
            setIsAnimating(triggerAnimation);
        }
    }, [triggerAnimation]);

    useEffect(() => {
        if (isAnimating) {
            setTimeout(() => setIsAnimating(false), 7000);
        }
    }, [isAnimating]);

    const animationsHorizontal = getRandomElementFromArray([
        "animate-loading-bar",
        "animate-loading-bar-2",
        "animate-loading-bar-3",
    ]);

    const animationsVertical = getRandomElementFromArray([
        "animate-loading-bar-vertical",
        "animate-loading-bar-vertical-2",
    ]);

    // -- RENDER --

    return orientation === "horizontal" ? (
        <Container
            styleProps={{
                width: "100%",
                height: height ? height : 10,
                background: background ? background : "rgba(104,178,255,0.25)",
                justifyContent: "center",
            }}
        >
            <Container
                styleProps={{ background: "#91f1f6", width: "0%", animationIterationCount: 2 }}
                classNames={isAnimating ? animationsHorizontal : ""}
            />
        </Container>
    ) : (
        <Container
            styleProps={{
                width: width ? width : 10,
                height: "100%",
                background: background ? background : "rgba(104,178,255,0.25)",
            }}
        >
            <Container
                styleProps={{ background: "#91f1f6", height: "0%", animationIterationCount: 2 }}
                classNames={isAnimating ? animationsVertical : ""}
            />
        </Container>
    );
};
