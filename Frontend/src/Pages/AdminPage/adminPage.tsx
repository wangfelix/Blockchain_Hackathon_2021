import React, { useState } from "react";

import { Page } from "BaseComponents/page";
import { useSetMediCoinAddress } from "Utils/hooks";
import { Row } from "BaseComponents/row";
import { Text } from "BaseComponents/text";
import { Container } from "BaseComponents/container";
import { Button } from "BaseComponents/Button/button";

export const AdminPage = () => {
    // -- STATE --

    const [medCoinAddressInput, setMediCoinAddressInput] = useState("");
    const { state: setMediCoinAdressStatus, send: setMediCoinAdress } = useSetMediCoinAddress();

    // -- CALLBACKS --

    const handleSetMediCoinAddress = () => {
        setMediCoinAdress(medCoinAddressInput).then((r) => console.log(r));
    };

    // -- RENDER --
    return (
        <Page>
            <Container styleProps={{ gap: 10 }}>
                <Text textType="text">
                    Set the address of the MediCoin smart contract: (Only needs to be set once, or when a second version
                    of the MediCoin contract gets deployed)
                </Text>
                <Row>
                    <input type="text" onChange={(e) => setMediCoinAddressInput(e.target.value)} />
                    <Button
                        onClickHandle={handleSetMediCoinAddress}
                        buttonType={medCoinAddressInput ? "primary" : "primaryGreyedOut"}
                    >
                        Set Address
                    </Button>
                </Row>
            </Container>
        </Page>
    );
};
