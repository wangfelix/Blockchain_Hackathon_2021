import React from "react";
import { Link } from "react-router-dom";

import { Colors } from "Utils/globalStyles";

export type NavBarItemProps = {
    title: string;
    to?: string;
    selected: boolean;
};

export const NavBarItem = ({ title, selected, to: propsTo }: NavBarItemProps) => {
    // -- STYLES --

    const navBarItemStyle = {
        marginRight: "50px",
        display: "flex",
        height: "100%",
        position: "relative" as "relative",
        fontFamily: "Work Sans",
    };

    const anchorStyle = {
        fontWeight: selected ? ("bold" as "bold") : ("lighter" as "lighter"),
        color: selected ? Colors.WHITE : Colors.WHITE_OFF_WHITE,
        cursor: "pointer",
        padding: "10px",
        textDecoration: "none",
    };

    const indicatorStyle = {
        position: "absolute" as "absolute",
        bottom: "0",
        right: "0",
        height: selected ? "5px" : 0,
        width: "100%",
        borderStyle: "none",
        background: selected ? Colors.LAVENDER : Colors.TRANSPARENT,
        transition: "background .3s, height .3s",
    };

    // -- HELPER --

    const to = propsTo ?? "/error-404";

    // -- RENDER --

    return (
        <li style={navBarItemStyle}>
            <div style={{ alignSelf: "center" }}>
                <Link style={anchorStyle} to={to}>
                    {title}
                </Link>
            </div>

            <div style={indicatorStyle} />
        </li>
    );
};
