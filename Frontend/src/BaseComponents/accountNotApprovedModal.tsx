import React from "react";
import { useEthers } from "@usedapp/core";

import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";
import { Container } from "BaseComponents/container";
import Modal from "react-modal";
import { Text } from "BaseComponents/text";
import { useGetAmIApproved } from "Utils/hooks";

export const AccountNotApprovedModal = () => {
    // -- STATE --

    const { account } = useEthers();
    const amIApproved = useGetAmIApproved(account);

    // -- RENDER --

    return (
        <Modal
            isOpen={!amIApproved}
            contentLabel="Example Modal"
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
                <h3 style={{ fontFamily: "Work Sans", marginBottom: "16px" }}>{"Account not approved yet"}</h3>

                <>
                    <Text textType="modal" styleProps={{ marginBottom: "24px" }}>
                        Your Account has not been approved yet. Approval of your account can take up to 5 days.
                        <br />
                        <br />
                        If you have any questions, please contact us at +49 234 3512435 or via email at
                        support@medisystems.de
                    </Text>
                </>
            </Container>
        </Modal>
    );
};
