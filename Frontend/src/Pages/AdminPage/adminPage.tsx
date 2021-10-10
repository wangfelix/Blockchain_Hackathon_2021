import React from "react";

import { Page } from "BaseComponents/page";
import { Container } from "BaseComponents/container";
import { AdminPageApproveDoctorsTable } from "Pages/AdminPage/Components/adminPageApproveDoctorsTable";
import { AdminPageSetMediCoinContractAddressForm } from "Pages/AdminPage/Components/adminPageSetMediCoinContractAddressForm";

export const AdminPage = () => {
    // -- RENDER --

    return (
        <Page heading="Admin Panel">
            <Container styleProps={{ gap: 10, height: "100%" }}>
                <AdminPageSetMediCoinContractAddressForm />

                <Container styleProps={{ marginLeft: 20, height: "100%" }}>
                    <AdminPageApproveDoctorsTable />
                </Container>
            </Container>
        </Page>
    );
};
