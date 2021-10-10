import React from "react";

import { Row } from "BaseComponents/row";
import { Container } from "BaseComponents/container";
import { Colors, Z_INDEX } from "Utils/globalStyles";
import { Text } from "BaseComponents/text";
import { AccountAndHistoryPageHistoryTableTableRow } from "Pages/AccountAndHistoryPage/Components/HistoryTable/Components/accountAndHistoryPageHistoryTableTableRow";

export const AccountAndHistoryPageHistoryTable = () => {
    // -- HELPER --

    const tableTitles = ["Date", "Type of Transaction", "MediCoin", "Disease"];

    // -- RENDER --

    return (
        <>
            {/* Table Header */}

            <Row
                styleProps={{
                    width: "100%",
                    zIndex: Z_INDEX.CARD,
                    boxShadow: "0 5px 5px -5px #777",
                    height: "60px",
                    justifyContent: "center",
                }}
            >
                <Row
                    styleProps={{
                        alignSelf: "center",
                        width: "93%",
                        display: "grid",
                        gridTemplateColumns: "150px 200px 150px 1fr",
                        margin: "25px 0",
                        position: "relative",
                        right: "10px",
                    }}
                >
                    {tableTitles.map((title) => (
                        <Text textType="text" styleProps={{ fontSize: "15px", color: Colors.PRIMARY_ACCENT_BLUE_HUE }}>
                            {title}
                        </Text>
                    ))}
                </Row>
            </Row>

            {/* Table Rows */}

            <Container
                styleProps={{
                    width: "97%",
                    alignSelf: "flex-end",
                    overflowY: "auto",
                    padding: "20px 0",
                    margin: "0 5px 10px 0",
                    position: "absolute",
                    top: 60,
                    bottom: 0,
                }}
            >
                {testData.map((data) => (
                    <AccountAndHistoryPageHistoryTableTableRow
                        type="contribute-data"
                        date={data.date}
                        amountMDC={data.amountMDC}
                        disease={data.disease}
                    />
                ))}
            </Container>
        </>
    );
};

// Test Data
const testData = [
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
    { date: "16.12.2017", amountMDC: 185, disease: "Morbus Juckreiz" },
];
