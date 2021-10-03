import React, { ReactNode } from "react";

import {
    primaryButtonStyle,
    primaryButtonStyleGreyedOut,
    secondaryButtonStyle,
    textButtonStyle,
} from "BaseComponents/Button/buttonStyles";

type ButtonProps = {
    buttonType: "primary" | "secondary" | "text" | "primaryGreyedOut";
    children?: ReactNode;
    onClickHandle?: (...args: any[]) => any;
    styleProps?: React.CSSProperties;
    id?: string;
};

export const Button = ({ children, styleProps, buttonType, onClickHandle, id }: ButtonProps) => {
    // -- STYLES --

    let buttonStyle =
        buttonType === "primary"
            ? { ...primaryButtonStyle, ...styleProps }
            : buttonType === "secondary"
            ? { ...secondaryButtonStyle, ...styleProps }
            : buttonType === "text"
            ? { ...textButtonStyle, ...styleProps }
            : { ...primaryButtonStyleGreyedOut, ...styleProps };

    // -- HELPERS --

    const isGreyedOut = buttonType === "primaryGreyedOut";

    // -- RENDER --

    return (
        <button id={id ? id : ""} style={buttonStyle} onClick={isGreyedOut ? undefined : onClickHandle}>
            {children}
        </button>
    );
};
