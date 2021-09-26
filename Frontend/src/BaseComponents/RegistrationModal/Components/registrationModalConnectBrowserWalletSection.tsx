import React from "react";
import { Text } from "BaseComponents/text";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import { useConnectWallet } from "Utils/hooks";

export const RegistrationModalConnectBrowserWalletSection = () => {
    // -- CALLBACKS --

    const connectWallet = useConnectWallet();

    return (
        <>
            <Text textType="modal" styleProps={{ marginBottom: "24px" }}>
                Please connect your Ethereum account to Medi-System, using your browser wallet (e.g. Metamask). If this
                is your first time logging in, we will let you register after your connection has succeeded.
            </Text>

            <Row>
                <Button buttonType="primary" styleProps={{ flexGrow: 1 }} onClickHandle={connectWallet}>
                    Connect to Metamask
                </Button>
            </Row>
        </>
    );
};
