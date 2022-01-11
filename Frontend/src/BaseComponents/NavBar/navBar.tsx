import React, { useMemo } from "react";
import { useEthers } from "@usedapp/core";
import { useDispatch } from "react-redux";

import { NavBarItem } from "BaseComponents/NavBar/Components/navBarItem";
import { NAVBAR_HEIGHT, Colors, NavBarTabs, Z_INDEX, MAX_PAGE_WIDTH } from "Utils/globalStyles";
import { ContributeDataPagePaths, Paths } from "Utils/paths";
import { useGetIsOwner, useIsLoggedIn, usePage } from "Utils/hooks";
import { NavBarItemProps as navBarItem } from "BaseComponents/NavBar/Components/navBarItem";
import { Button } from "BaseComponents/Button/button";
import { setRegistrationModalOpen } from "State/Actions/actionCreators";
import { Row } from "BaseComponents/row";
import Logo from "Illustrations/MediSystemLogo.svg";
import { Container } from "BaseComponents/container";
import { NavBarProfileDropdown } from "BaseComponents/NavBar/Components/navBarProfileDropdown";

export const NavBar = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const page = usePage();

    const { account } = useEthers();

    const isLoggedIn = useIsLoggedIn();

    const isOwner = useGetIsOwner(account);

    // -- MEMOIZED DATA --

    const navBarItemsLeft: navBarItem[] = useMemo(
        () => [
            { title: NavBarTabs.HOME, to: Paths.LANDING_PAGE, selected: page === Paths.LANDING_PAGE },
            { title: NavBarTabs.DEMO, to: Paths.DEMO_PAGE, selected: page === Paths.DEMO_PAGE },
            ...(isLoggedIn
                ? [
                      ...(isOwner
                          ? [{ title: NavBarTabs.ADMIN, to: Paths.ADMIN_PAGE, selected: page === Paths.ADMIN_PAGE }]
                          : []),
                      {
                          title: NavBarTabs.CONTRIBUTED_DATA,
                          to: `${Paths.CONTRIBUTE_DATA_PAGE}${ContributeDataPagePaths.FILE_UPLOADER}`,
                          selected: page === Paths.CONTRIBUTE_DATA_PAGE,
                      },
                      {
                          title: NavBarTabs.ACCOUNTS_AND_HISTORY,
                          to: Paths.ACCOUNT_AND_HISTORY_PAGE,
                          selected: page === Paths.ACCOUNT_AND_HISTORY_PAGE,
                      },
                  ]
                : []),
        ],
        [page, isLoggedIn, isOwner]
    );

    // -- CALLBACKS --

    const openRegistrationModal = () => dispatch(setRegistrationModalOpen(true));

    // -- STYLES --

    const navBarStyle = {
        height: NAVBAR_HEIGHT,
        width: "100%",
        position: "fixed" as "fixed",
        background: Colors.BLUE_DARKEST,
        boxShadow: "0 5px 20px 2px rgba(20, 0, 20, 0.3)",
        display: "flex",
        alignItems: "center",
        padding: "0 30px",
        color: Colors.WHITE_OFF_WHITE,
        listStyleType: "none",
        zIndex: Z_INDEX.NAVBAR,
    };

    // -- RENDER --

    return (
        <nav style={{ ...navBarStyle, justifyContent: "center" }}>
            <Row styleProps={{ ...navBarStyle, marginLeft: "auto", marginRight: "auto", maxWidth: MAX_PAGE_WIDTH }}>
                <Container
                    style={{
                        width: 120,
                        height: "80%",
                        display: "flex",
                    }}
                >
                    <Logo />
                </Container>

                <Row
                    styleProps={{
                        margin: "0 auto",
                        position: "absolute",
                        inset: 0,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {navBarItemsLeft.map((item, index) => (
                        <NavBarItem title={item.title} key={index} selected={item.selected} to={item.to} />
                    ))}
                </Row>

                {!isLoggedIn && (
                    <Row styleProps={{ position: "absolute", right: "20px", justifySelf: "flex-end" }}>
                        <Button
                            buttonType="primary"
                            onClickHandle={openRegistrationModal}
                            styleProps={{
                                borderRadius: 50,
                                padding: "0 20px",
                                fontSize: 14,
                            }}
                        >
                            Login
                        </Button>
                    </Row>
                )}

                {isLoggedIn && <NavBarProfileDropdown />}
            </Row>
        </nav>
    );
};
