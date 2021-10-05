import React from "react";

import { Page } from "BaseComponents/page";
import Wallet from "Illustrations/wallet.png";
import { Text } from "BaseComponents/text";
import { AccountAndHistoryPageHistoryTable } from "Pages/AccountAndHistoryPage/Components/HistoryTable/accountAndHistoryPageHistoryTable";
import { AccountAndHistoryPageDetailsPane } from "Pages/AccountAndHistoryPage/Components/accountAndHistoryPageDetailsPane";

export const AccountAndHistoryPage = () => {
    // -- STATE --

    const mediCoinBalance = 256;

    // -- RENDER --

    return (
        <Page
            layout="double-row"
            icon={Wallet}
            heading="Account & History"
            headingContent={
                <Text textType="text" styleProps={{ fontSize: "20px" }}>
                    Balance: {mediCoinBalance} MDC
                </Text>
            }
            childrenLeft={AccountAndHistoryPageHistoryTable()}
            childrenRight={AccountAndHistoryPageDetailsPane()}
        />
    );
};
