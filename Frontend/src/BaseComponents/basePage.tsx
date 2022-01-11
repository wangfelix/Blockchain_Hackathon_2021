import React, { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { NavBar } from "BaseComponents/NavBar/navBar";
import { Footer } from "BaseComponents/footer";
import { Colors, NAVBAR_HEIGHT, Z_INDEX } from "Utils/globalStyles";
import { useIsLoggedIn, usePage, useViewportDimensions } from "Utils/hooks";
import { Container } from "BaseComponents/container";
import { RegistrationModal } from "BaseComponents/RegistrationModal/registrationModal";
import { RootState } from "State/Reducers";
import { AccountNotApprovedModal } from "BaseComponents/accountNotApprovedModal";
import { Paths } from "Utils/paths";

type BasePageProps = {
    children: ReactNode;
};

/**
 * This HOC takes a component (mostly "top-level page components") and handles it's positioning
 * and inserts the navigation-bar and footer.
 */
export const BasePage = ({ children }: BasePageProps) => {
    // -- STATE --

    const page = usePage();

    const history = useHistory();

    const isLoggedIn = useIsLoggedIn();

    const { viewportHeight } = useViewportDimensions();

    const minBaseContentHeight = viewportHeight - Number(NAVBAR_HEIGHT.replace('"', "").replace("px", ""));

    const isRegistrationModalOpen = useSelector<RootState, boolean>((state) => state.modals.isRegistrationModalOpen);

    // -- EFFECTS --

    useEffect(() => {
        // If the user is logged out but tries to navigate to any page other than the Landing page or the Demo page, he will be redirected to the Landing page.
        if (!isLoggedIn && page !== Paths.LANDING_PAGE && page !== Paths.DEMO_PAGE) {
            history.replace(Paths.LANDING_PAGE);
        }
    }, [isLoggedIn, page, history]);

    // -- STYLES --

    const globalStyles = {
        color: Colors.BLACK,
        fontFamily: "Inter",
        lineHeight: "1.5em",
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

            {isLoggedIn && <AccountNotApprovedModal />}
        </Container>
    );
};
