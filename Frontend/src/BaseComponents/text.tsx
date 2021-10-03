import React, { ReactNode } from "react";

import { Colors } from "Utils/globalStyles";

type TextProps = {
    children: ReactNode;
    textType: "text" | "nudge" | "modal";
    styleProps?: React.CSSProperties;
};

export const Text = ({ children, textType, styleProps }: TextProps) => {
    // -- STYLES --

    const textStyle = {
        color: textType === "text" || "modal" ? Colors.BLACK : Colors.GREY_DARK,
        fontSize: textType === "text" ? "15px" : "13px",
        fontWeight: textType === "text" ? ("normal" as "normal") : ("lighter" as "lighter"),
        textAlign: "justify" as "justify",
        hyphens: "auto" as "auto",
        fontFamily: "Work Sans",

        ...styleProps,
    };

    // -- RENDER --

    return <p style={{ ...textStyle, ...styleProps }}>{children}</p>;
};
