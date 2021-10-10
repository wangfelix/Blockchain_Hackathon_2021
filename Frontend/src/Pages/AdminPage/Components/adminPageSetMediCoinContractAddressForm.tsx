import React, { useState } from "react";

import { Text } from "BaseComponents/text";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import { useSetMediCoinAddress } from "Utils/hooks";

export const AdminPageSetMediCoinContractAddressForm = () => {
    // -- STATE --

    const [medCoinAddressInput, setMediCoinAddressInput] = useState("");
    const { state: setMediCoinAdressStatus, send: setMediCoinAdress } = useSetMediCoinAddress();

    // -- CALLBACKS --

    const handleSetMediCoinAddress = () => {
        setMediCoinAdress(medCoinAddressInput).then((r) => console.log(r));
    };

    // -- RENDER --

    return (
        <>
            <Text textType="text">
                Set the address of the MediCoin smart contract: (Only needs to be set once, or when a second version of
                the MediCoin contract gets deployed)
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
        </>
    );
};
