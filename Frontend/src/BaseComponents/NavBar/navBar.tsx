import React, { useEffect, useMemo } from "react";
import { useEthers } from "@usedapp/core";

import { NavBarItem } from "BaseComponents/NavBar/Components/navBarItem";
import { NAVBAR_HEIGHT, Colors, NavBarTabs, Z_INDEX } from "Utils/globalStyles";
import { Paths } from "Utils/paths";
import { useConnectWallet, usePage } from "Utils/hooks";
import { NavBarItemProps as navBarItem } from "BaseComponents/NavBar/Components/navBarItem";
import { Button } from "BaseComponents/Button/button";

export const NavBar = () => {
    // -- STATE --

    const page = usePage();
    const { account } = useEthers();

    // -- MEMOIZED DATA --

    const navBarItemsLeft: navBarItem[] = useMemo(
        () => [
            { title: NavBarTabs.HOME, to: Paths.LANDING_PAGE, selected: page === Paths.LANDING_PAGE },
            ...(account
                ? [
                      {
                          title: NavBarTabs.CONTRIBUTED_DATA,
                          to: Paths.CONTRIBUTE_DATA_PAGE,
                          selected: page === Paths.CONTRIBUTE_DATA_PAGE,
                      },
                      {
                          title: NavBarTabs.ACCOUNTS_AND_HISTORY,
                          to: Paths.ACCOUNT_AND_HISTORY,
                          selected: page === Paths.ACCOUNT_AND_HISTORY,
                      },
                  ]
                : []),
            { title: NavBarTabs.DEMO, to: Paths.DEMO, selected: page === Paths.DEMO },
        ],
        [page, account]
    );

    // -- CALLBACKS --

    const connectWallet = useConnectWallet();

    // -- STYLES --

    const navBarStyle = {
        height: NAVBAR_HEIGHT,
        width: "100%",
        position: "fixed" as "fixed",
        background: Colors.PRIMARY_ACCENT_BLUE_HUE,
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
        <nav style={navBarStyle}>
            {navBarItemsLeft.map((item, index) => (
                <NavBarItem title={item.title} key={index} selected={item.selected} to={item.to} />
            ))}
            {!account && (
                <div style={{ position: "absolute", right: "20px", justifySelf: "flex-end" }}>
                    <Button buttonType="text" onClickHandle={connectWallet}>
                        Login
                    </Button>
                </div>
            )}
        </nav>
    );
};
