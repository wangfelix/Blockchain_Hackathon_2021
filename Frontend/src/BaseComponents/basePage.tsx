import React, { ReactNode } from "react";

import { NavBar } from "BaseComponents/NavBar/navBar";
import { Footer } from "BaseComponents/footer";
import { Colors, NAVBAR_HEIGHT, Z_INDEX } from "Utils/globalStyles";
import { useViewportDimensions } from "Utils/hooks";

type BasePageProps = {
    children: ReactNode;
};

export const BasePage = ({ children }: BasePageProps) => {
    // -- STATE --

    const { viewportHeight } = useViewportDimensions();

    const minBaseContentHeight = viewportHeight + 100 - Number(NAVBAR_HEIGHT.replace('"', "").replace("px", ""));

    // -- STYLES --

    const globalStyles = {
        display: "flex",
        flexDirection: "column" as "column",
        color: Colors.BLACK,
        fontFamily: "Work Sans",
        zIndex: Z_INDEX.PAGE,
    };

    const contentStyle = {
        width: "100%",
        minHeight: minBaseContentHeight,
        position: "absolute" as "absolute",
        top: NAVBAR_HEIGHT,
    };

    // -- RENDER --

    return (
        <div style={globalStyles}>
            <NavBar />

            <div style={contentStyle}>
                {children}
                <Footer />
            </div>
        </div>
    );
};
