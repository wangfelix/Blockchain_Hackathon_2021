import React from "react";

import { Colors } from "Utils/globalStyles";
import { FOOTER_HEIGHT } from "Utils/globalStyles";

const footerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: FOOTER_HEIGHT,
    background: Colors.PRIMARY_ACCENT_BLUE_HUE,
    color: Colors.WHITE_OFF_WHITE,
    boxShadow: "inset 0 8px 10px rgba(50, 10, 50, 0.2)",
};

export const Footer = () => <footer style={footerStyle}>2021</footer>;
