import React, { ReactNode, useState } from "react";

import {
    primaryButtonStyle,
    primaryButtonStyleGreyedOut,
    secondaryButtonStyle,
    textButtonStyle,
} from "BaseComponents/Button/buttonStyles";
import { Colors } from "Utils/globalStyles";

type ButtonProps = {
    buttonType: "primary" | "secondary" | "text" | "primaryGreyedOut";
    children?: ReactNode;
    onClickHandle?: (...args: any[]) => any;
    styleProps?: React.CSSProperties;
    id?: string;
};

export const Button = ({ children, styleProps, buttonType, onClickHandle, id }: ButtonProps) => {
    // -- STATE --

    const [isHovered, setIsHovered] = useState(false);

    // -- STYLES --

    let buttonStyle =
        buttonType === "primary"
            ? {
                  ...primaryButtonStyle,
                  ...(isHovered
                      ? { background: `${Colors.PRIMARY_ACCENT}dd`, borderColor: `${Colors.PRIMARY_ACCENT}dd` }
                      : {}),
                  ...styleProps,
              }
            : buttonType === "secondary"
            ? {
                  ...secondaryButtonStyle,
                  ...(isHovered
                      ? {
                            color: `${Colors.PRIMARY_ACCENT_BLUE_HUE}`,
                            borderColor: `${Colors.PRIMARY_ACCENT_BLUE_HUE}`,
                        }
                      : {}),
                  ...styleProps,
              }
            : buttonType === "text"
            ? { ...textButtonStyle, ...(isHovered ? { color: `${Colors.PRIMARY_ACCENT}dd` } : {}), ...styleProps }
            : { ...primaryButtonStyleGreyedOut, ...styleProps };

    // -- HELPERS --

    const isGreyedOut = buttonType === "primaryGreyedOut";

    // -- RENDER --

    return (
        <button
            id={id ? id : ""}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={buttonStyle}
            onClick={isGreyedOut ? undefined : onClickHandle}
        >
            {children}
        </button>
    );
};
