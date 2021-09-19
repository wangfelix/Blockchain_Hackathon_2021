import React from "react";
import { Colors } from "Utils/globalStyles";

const footerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100px",
    background: Colors.PRIMARY_ACCENT_BLUE_HUE,
    color: Colors.WHITE_OFF_WHITE,
};

export const Footer = () => <footer style={footerStyle}>2021</footer>;
