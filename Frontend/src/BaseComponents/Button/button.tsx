import React from "react";

import { primaryButtonStyle, secondaryButtonStyle, textButtonStyle } from "BaseComponents/Button/buttonStyles";

type ButtonProps = {
    buttonType: "primary" | "secondary" | "text";
    children?: string;
    onClickHandle?: (...args: any[]) => any;
    stylesProp?: Object;
};

export const Button = ({ children, stylesProp, buttonType, onClickHandle }: ButtonProps) => {
    // -- STYLES --

    let buttonStyle =
        buttonType === "primary"
            ? { ...stylesProp, ...primaryButtonStyle }
            : buttonType === "secondary"
            ? { ...stylesProp, ...secondaryButtonStyle }
            : { ...stylesProp, ...textButtonStyle };

    // -- RENDER --

    return (
        <button style={buttonStyle} onClick={onClickHandle}>
            {children}
        </button>
    );
};
