import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

import { NavBar } from "BaseComponents/NavBar/navBar";
import { Footer } from "BaseComponents/footer";
import { Colors, NAVBAR_HEIGHT, Z_INDEX } from "Utils/globalStyles";
import { useViewportDimensions } from "Utils/hooks";
import { Container } from "BaseComponents/container";
import { RegistrationModal } from "BaseComponents/RegistrationModal/registrationModal";
import { RootState } from "State/Reducers";
import { AccountNotApprovedModal } from "BaseComponents/accountNotApprovedModal";

type BasePageProps = {
    children: ReactNode;
};

/**
 * This HOC takes a component (mostly "top-level page components") and handles it's positioning
 * and inserts the navigation-bar and footer.
 */
export const BasePage = ({ children }: BasePageProps) => {
    // -- STATE --

    const { viewportHeight } = useViewportDimensions();

    const minBaseContentHeight = viewportHeight - Number(NAVBAR_HEIGHT.replace('"', "").replace("px", ""));

    const isRegistrationModalOpen = useSelector<RootState, boolean>((state) => state.modals.isRegistrationModalOpen);

    // -- STYLES --

    const globalStyles = {
        color: Colors.BLACK,
        fontFamily: "Work Sans",
        zIndex: Z_INDEX.PAGE,
    };

    const contentStyle = {
        position: "relative" as "relative",
        width: "100%",
        minHeight: minBaseContentHeight,
        marginTop: NAVBAR_HEIGHT,
        overflow: "auto",
    };

    // -- RENDER --

    return (
        <Container styleProps={globalStyles}>
            <NavBar />

            <Container styleProps={contentStyle}>{children}</Container>

            <Footer />

            <RegistrationModal isOpen={isRegistrationModalOpen} />
            <AccountNotApprovedModal />
        </Container>
    );
};
