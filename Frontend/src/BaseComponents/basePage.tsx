import React, { ReactNode } from "react";
import { NavBar } from "BaseComponents/NavBar/navBar";
import { Colors, NAVBAR_HEIGHT, Z_INDEX } from "Utils/globalStyles";

type BasePageProps = {
    children: ReactNode;
};

export const BasePage = ({ children }: BasePageProps) => {
    // -- STYLES --

    const globalStyles = {
        color: Colors.BLACK,
        fontFamily: "Work Sans",
        zIndex: Z_INDEX.PAGE,
    };

    const contentStyle = {
        position: "absolute" as "absolute",
        top: NAVBAR_HEIGHT,
    };

    return (
        <div style={globalStyles}>
            <NavBar />
            <div style={contentStyle}>{children}</div>

            {/* TODO: Footer */}
        </div>
    );
};
