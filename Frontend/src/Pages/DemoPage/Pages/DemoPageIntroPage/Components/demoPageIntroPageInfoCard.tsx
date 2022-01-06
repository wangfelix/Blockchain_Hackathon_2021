import React, { ReactNode, useState } from "react";
import { Colors } from "Utils/globalStyles";
import { Container } from "BaseComponents/container";
import { Text } from "BaseComponents/text";

type DemoPageIntroPageInfoCardProps = {
    icon: string;
    iconAlt: string;
    title: string;
    children: string | ReactNode;
};

export const DemoPageIntroPageInfoCard = ({ icon, iconAlt, title, children }: DemoPageIntroPageInfoCardProps) => {
    // --- STATE ---

    const [isHovered, setIsHovered] = useState(false);

    // -- RENDER --

    return (
        <Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                height: 470,
                width: 400,
                background: isHovered ? Colors.PRIMARY_ACCENT_HUE : Colors.PRIMARY_ACCENT_HUE_DARKER,
                borderRadius: 20,
                borderStyle: "solid",
                borderWidth: 5,
                borderColor: isHovered ? Colors.PRIMARY_ACCENT_HUE : Colors.PRIMARY_ACCENT_HUE_DARKER,
                boxShadow: isHovered ? "rgba(220, 220, 235, 0.5) 0 0 7px 7px" : "unset",
                padding: "40px 30px",
                ...(isHovered ? { transform: "scale(1.03)" } : {}),
                transition: "all .5s",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <img src={icon} alt={iconAlt} style={{ width: 70, marginBottom: 30 }} />

            <h3 style={{ marginBottom: 30, textAlign: "center" }}>{title}</h3>

            <Text styleProps={{ textAlign: "center", fontSize: 15, fontFamily: "Space Mono" }}>{children}</Text>
        </Container>
    );
};
