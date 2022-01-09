import React, { ReactNode } from "react";

import { Colors } from "Utils/globalStyles";

type TextProps = {
    children: ReactNode;
    textType?: "text" | "nudge" | "modal";
    styleProps?: React.CSSProperties;
};

export const Text = ({ children, textType: textTypeProp, styleProps }: TextProps) => {
    const textType = textTypeProp ?? "text";
    // -- STYLES --

    const textStyle = {
        color: textType === "text" || "modal" ? Colors.PRIMARY_ACCENT_BLUE_HUE : Colors.GREY_DARK,
        fontSize: textType === "text" ? 16 : 15,
        fontWeight: textType === "text" ? 400 : 300,
        textAlign: "left" as "left",
        hyphens: "auto" as "auto",
        fontFamily: "Inter",
        justifySelf: "center",
        lineHeight: 1.75,

        ...styleProps,
    };

    // -- RENDER --

    return <p style={textStyle}>{children}</p>;
};
