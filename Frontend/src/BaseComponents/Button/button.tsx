import React, { ReactNode } from "react";

import { primaryButtonStyle, secondaryButtonStyle, textButtonStyle } from "BaseComponents/Button/buttonStyles";

type ButtonProps = {
    buttonType: "primary" | "secondary" | "text";
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
            : { ...textButtonStyle, ...styleProps };

    // -- RENDER --

    return (
        <button id={id ? id : ""} style={buttonStyle} onClick={onClickHandle}>
            {children}
        </button>
    );
};
