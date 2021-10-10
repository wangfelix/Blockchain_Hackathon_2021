import React, { useState } from "react";

import { Text } from "BaseComponents/text";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import { useMediSysMethod, useSetMediCoinAddress } from "Utils/hooks";
import { MediSys_Functions } from "Utils/smartContractUtils";

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
            <Text textType="text" styleProps={{ marginBottom: "6px", marginLeft: 20 }}>
                Set the address of the MediCoin smart contract<sup>1</sup>:
            </Text>
            <Row>
                <input
                    type="text"
                    onChange={(e) => setMediCoinAddressInput(e.target.value)}
                    style={{
                        marginRight: "5px",
                        borderRadius: "5px",
                        marginLeft: 20,
                        borderColor: "lightgrey",
                        width: "333px",
                    }}
                />
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
