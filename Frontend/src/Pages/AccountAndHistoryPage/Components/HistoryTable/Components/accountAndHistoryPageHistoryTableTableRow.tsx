import React from "react";

import { Row } from "BaseComponents/row";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Container } from "BaseComponents/container";

type TableRowProps = {
    type: "contribute-data" | "payment";
    date: string;
    amountMDC: number;
    disease: string;
};

export const AccountAndHistoryPageHistoryTableTableRow = ({ type, date, amountMDC, disease }: TableRowProps) => (
    <Row
        styleProps={{
            display: "grid",
            gridTemplateColumns: "150px 200px 150px 1fr",
            flexShrink: 0,
            height: "70px",
            marginBottom: "10px",
            background: Colors.WHITE,
            border: `solid 2px ${Colors.GREY_LIGHT}`,
            borderRadius: BORDER_RADIUS,
            width: "97%",
            cursor: "pointer",
        }}
    >
        <Container styleProps={{ height: "100%", justifyContent: "center", padding: "0 20px" }}>{date}</Container>
        <Container
            styleProps={{ height: "100%", justifyContent: "center", padding: "0 20px", background: Colors.GREY_LIGHT }}
        >
            Contribute Data
        </Container>
        <Container styleProps={{ height: "100%", justifyContent: "center", padding: "0 20px" }}>
            {amountMDC} MDC
        </Container>
        <Container
            styleProps={{ height: "100%", justifyContent: "center", padding: "0 20px", background: Colors.GREY_LIGHT }}
        >
            {disease}
        </Container>
    </Row>
);
