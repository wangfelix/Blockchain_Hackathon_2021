import React from "react";

import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";

export const getUserPanelContributionModalStyle = (contentType: "Carousel" | "SuccessPart") =>
    <{ content: React.CSSProperties; overlay: React.CSSProperties }>{
        content: {
            background: contentType === "Carousel" ? Colors.WHITE : "#16162e",
            border: "none",
            borderRadius: BORDER_RADIUS,
            maxWidth: 900,
            overflow: "hidden",
            padding: "20px 25px",
            position: "relative",
            maxHeight: "600px",
            alignItems: "center",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            transition: "background 0.5s",
            fontFamily: "Work Sans",
        },
        overlay: {
            padding: 16,
            alignItems: "center",
            background: `${Colors.PRIMARY_ACCENT_BLUE_HUE}bb`,
            backdropFilter: "blur(5px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "fixed",
            zIndex: Z_INDEX.DEMO_PAGE_MODAL,
        },
    };
