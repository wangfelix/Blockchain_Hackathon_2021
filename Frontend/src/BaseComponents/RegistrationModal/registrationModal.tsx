import React, { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { useEthers } from "@usedapp/core";

import { Row } from "BaseComponents/row";
import { Container } from "BaseComponents/container";
import { Button } from "BaseComponents/Button/button";
import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";
import { setRegistrationModalOpen } from "State/Actions/actionCreators";
import { useMyName } from "Utils/hooks";
import { RegistrationModalConnectBrowserWalletSection } from "BaseComponents/RegistrationModal/Components/registrationModalConnectBrowserWalletSection";
import { RegistrationModalRegisterNameSection } from "BaseComponents/RegistrationModal/Components/registrationModalRegisterNameSection";

type RegistrationModalProps = {
    isOpen: boolean;
};

export const RegistrationModal = ({ isOpen }: RegistrationModalProps) => {
    const dispatch = useDispatch();

    // -- STATE --

    const { account } = useEthers();

    // The name associated to the current account address in the MediCoins smart contract.
    const myName = useMyName(account);

    // -- EFFECTS --

    useEffect(() => {
        // Prevents the body content to shift to right, due to the scrollbar being removed.

        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = "15px";
        }

        if (!isOpen) {
            document.body.style.overflow = "unset";
            document.body.style.paddingRight = "0";
        }
    }, [isOpen]);

    useEffect(() => {
        // If the User is already registered, close the modal after connection to the browser wallet has
        // been successfully established.
        if (account && myName) {
            dispatch(setRegistrationModalOpen(false));
        }
    }, [dispatch, account, myName]);

    // -- RENDER --

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Example Modal"
            onRequestClose={!account ? () => dispatch(setRegistrationModalOpen(false)) : undefined}
            style={{
                content: {
                    background: Colors.WHITE,
                    border: "none",
                    borderRadius: BORDER_RADIUS,
                    margin: "16px",
                    maxWidth: "500px",
                    overflow: "auto",
                    padding: "24px",
                    position: "relative",
                    width: "100%",
                    boxShadow: "0 0 20px 10px rgba(180, 180, 180, 0.5)",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                },
                overlay: {
                    alignItems: "center",
                    background: "rgba(200, 195, 215, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "fixed",
                    zIndex: Z_INDEX.MODAL,
                },
            }}
        >
            <Container>
                {!account && (
                    <Row styleProps={{ position: "absolute", top: "5px", right: "5px", justifyContent: "flex-end" }}>
                        <Button
                            buttonType="text"
                            styleProps={{ color: Colors.GREY_DARK, fontWeight: "bold", fontSize: "20px" }}
                            onClickHandle={() => dispatch(setRegistrationModalOpen(false))}
                        >
                            x
                        </Button>
                    </Row>
                )}

                <h3 style={{ fontFamily: "Work Sans", marginBottom: "16px" }}>
                    {!account ? "LogIn / Register" : "Input Name"}
                </h3>

                {!account ? <RegistrationModalConnectBrowserWalletSection /> : <RegistrationModalRegisterNameSection />}
            </Container>
        </Modal>
    );
};
