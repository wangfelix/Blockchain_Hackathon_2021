import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Text } from "BaseComponents/text";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import { setRegistrationModalOpen } from "State/Actions/actionCreators";
import { useMediSysMethod } from "Utils/hooks";

export const RegistrationModalRegisterNameSection = () => {
    const dispatch = useDispatch();

    // -- STATE --

    const [name, setName] = useState("");

    const { state: registerMeState, send: registerMe } = useMediSysMethod("registerDoctor");

    // -- CALLBACKS --

    // Calls the smart contract and saves the input name as the name corresponding to my ethereum account address.
    const handleRegistration = () => {
        registerMe(name)
            .then(() => dispatch(setRegistrationModalOpen(false)))
            .catch((e) => {
                console.log("Name konnte nicht registriert werden"); // TODO
            });
    };

    // -- RENDER --

    return (
        <>
            <Text textType="modal" styleProps={{ marginBottom: "24px" }}>
                Please complete your registration by telling us your Name!
            </Text>

            <label
                style={{
                    fontFamily: "Work Sans",
                    fontSize: "13px",
                    marginBottom: "8px",
                    color: Colors.GREY_DARKER,
                    fontWeight: "bolder",
                }}
            >
                Name:
            </label>

            <input
                style={{
                    fontSize: "13px",
                    marginBottom: "24px",
                    height: "40px",
                    width: "100%",
                    padding: "0 10px",
                    border: `solid 2px ${Colors.GREY_DARK}`,
                    borderRadius: BORDER_RADIUS,
                    fontFamily: "Work Sans",
                }}
                onChange={(e) => setName(e.target.value)}
                placeholder="...first name  last name"
            />

            <Row>
                <Button
                    buttonType={!name ? "primaryGreyedOut" : "primary"}
                    styleProps={{ flexGrow: 1 }}
                    onClickHandle={handleRegistration}
                >
                    Register
                </Button>
            </Row>
        </>
    );
};
