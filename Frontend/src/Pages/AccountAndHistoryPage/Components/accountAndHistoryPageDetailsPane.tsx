import React from "react";

import { Container } from "BaseComponents/container";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Text } from "BaseComponents/text";
import { Row } from "BaseComponents/row";

export const AccountAndHistoryPageDetailsPane = () => (
    <Container
        styleProps={{
            background: Colors.PRIMARY_ACCENT_HUE,
            width: "95%",
            height: "95%",
            justifySelf: "center",
            alignSelf: "center",
            margin: "auto",
            borderRadius: BORDER_RADIUS,
            boxShadow: "0 5px 20px 2px rgba(20, 0, 20, 0.3)",
            padding: "30px",
        }}
    >
        <Container styleProps={{ alignItems: "center" }}>
            <Text textType="text">Contributed Dataset</Text>
        </Container>

        {/* -- Header -- */}

        <Row
            styleProps={{
                justifySelf: "center",
                width: "98%",
                height: "80px",
                alignItems: "flex-end",
                padding: "0 10px 10px 10px",
                justifyContent: "space-between",
                borderBottom: `solid 2px ${Colors.WHITE_OFF_WHITE}`,
            }}
        >
            <Text textType="text" styleProps={{ fontWeight: "bold", fontSize: "20px" }}>
                Lungenkrebs
            </Text>

            <Text textType="text">24.08.2020</Text>
        </Row>
    </Container>
);
