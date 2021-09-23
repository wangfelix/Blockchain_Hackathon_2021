import React, { ReactNode } from "react";

import { Colors } from "Utils/globalStyles";

type TextProps = {
    children: ReactNode;
    textType: "text" | "nudge";
    styleProps?: React.CSSProperties;
};

export const Text = ({ children, textType, styleProps }: TextProps) => {
    // -- STYLES --

    const textStyle = {
        color: textType === "text" ? Colors.BLACK : Colors.GREY_DARK,
        fontSize: textType === "text" ? "15px" : "14px",
        fontWeight: textType === "text" ? ("normal" as "normal") : ("lighter" as "lighter"),
        textAlign: "justify" as "justify",
        hyphens: "auto" as "auto",

        ...styleProps,
    };

    // -- RENDER --

    return <p style={{ ...textStyle, ...styleProps }}>{children}</p>;
};
