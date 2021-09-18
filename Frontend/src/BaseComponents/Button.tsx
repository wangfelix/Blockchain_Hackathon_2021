import React from "react";

import { primaryButtonStyle, secondaryButtonStyle } from "Styles/buttonStyles";

type ButtonProps = {
    buttonType: "primary" | "secondary";
    children?: string;
    onClickHandle?: (...args: any[]) => any;
    stylesProp?: Object;
};

export const Button = ({ children, stylesProp, buttonType, onClickHandle }: ButtonProps) => {
    // -- STYLES --

    let buttonStyle =
        buttonType === "primary"
            ? { ...stylesProp, ...primaryButtonStyle }
            : { ...stylesProp, ...secondaryButtonStyle };

    // -- RENDER --

    return (
        <button style={buttonStyle} onClick={onClickHandle}>
            {children}
        </button>
    );
};
