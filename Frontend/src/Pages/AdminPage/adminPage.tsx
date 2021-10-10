import React from "react";

import { Page } from "BaseComponents/page";
import { Container } from "BaseComponents/container";
import { AdminPageApproveDoctorsTable } from "Pages/AdminPage/Components/adminPageApproveDoctorsTable";
import admin from "Illustrations/admin.png";
import { Text } from "BaseComponents/text";

export const AdminPage = () => (
    <Page heading="Admin Panel" icon={admin}>
        <Container
            styleProps={{
                display: "grid",
                gridTemplateColumns: "1fr 50% 1fr",
                width: "100%",
            }}
        >
            <Text
                styleProps={{
                    gridColumn: "3",
                    width: "50%",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    borderStyle: "solid",
                    borderColor: "lightgrey",
                    borderRadius: "8px",
                }}
            >
                <sup>1</sup>Only needs to be set once, or when a second version of the MediCoin contract gets deployed.
            </Text>
            <Container styleProps={{ gridColumn: "2", marginLeft: "20px", height: "300px" }}>
                <AdminPageApproveDoctorsTable />
            </Container>
        </Container>
    </Page>
);
