import React, { ReactNode } from "react";

import { Colors } from "Utils/globalStyles";

type LandingPageSectionProps = {
    children?: ReactNode;
    sectionTitle?: string;
    color?: "primary" | "secondary" | "transparent";
    styleProps?: React.CSSProperties;
};

export const LandingPageSection = ({ children, sectionTitle, color, styleProps }: LandingPageSectionProps) => {
    // -- STYLES --

    const sectionStyle = {
        display: "flex",
        flexDirection: "column" as "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: color === "transparent" ? "700px" : "automatic",
        padding: "50px 100px",
        background:
            color && color === "primary"
                ? Colors.WHITE
                : color === "secondary"
                ? Colors.PRIMARY_ACCENT_HUE
                : Colors.TRANSPARENT,

        ...styleProps,
    };

    const headingStyle = {
        marginBottom: "50px",
    };

    // -- RENDER --

    return (
        <section style={sectionStyle}>
            {sectionTitle && <h2 style={headingStyle}>{sectionTitle}</h2>}
            {children}
        </section>
    );
};
