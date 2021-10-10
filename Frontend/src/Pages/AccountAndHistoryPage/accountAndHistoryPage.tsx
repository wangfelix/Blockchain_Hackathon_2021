import React, { useEffect } from "react";

import { Page } from "BaseComponents/page";
import Wallet from "Illustrations/wallet.png";
import { Text } from "BaseComponents/text";
import { AccountAndHistoryPageHistoryTable } from "Pages/AccountAndHistoryPage/Components/HistoryTable/accountAndHistoryPageHistoryTable";
import { AccountAndHistoryPageDetailsPane } from "Pages/AccountAndHistoryPage/Components/accountAndHistoryPageDetailsPane";
import { Container } from "BaseComponents/container";
import { Button } from "BaseComponents/Button/button";
import { useGetMediCoinAddress, useGetMyMediCoinBalance } from "Utils/hooks";
import { useEthers } from "@usedapp/core";

export const AccountAndHistoryPage = () => {
    // -- STATE --

    const { account } = useEthers();

    const mediCoinAddress = useGetMediCoinAddress();

    const mediCoinBalance = useGetMyMediCoinBalance(account);

    // -- RENDER --

    return (
        <Page
            layout="double-row"
            icon={Wallet}
            heading="Account & History"
            headingContent={
                <Container>
                    <Text textType="text" styleProps={{ fontSize: "20px" }}>
                        Balance: {mediCoinBalance ?? "Fehler"} MDC
                    </Text>
                </Container>
            }
            childrenLeft={AccountAndHistoryPageHistoryTable()}
            childrenRight={AccountAndHistoryPageDetailsPane()}
        />
    );
};
