import React from "react";

import { Text } from "BaseComponents/text";
import { Button } from "BaseComponents/Button/button";
import { Colors } from "Utils/globalStyles";
import cross from "Illustrations/crossing.png";
import { Row } from "BaseComponents/row";

type UserPanelContributionModalTopBarProps = {
    userIndex: number | undefined;
    handleModalClose: () => void;
};
export const UserPanelContributionModalTopBar = ({
    userIndex,
    handleModalClose,
}: UserPanelContributionModalTopBarProps) => (
    <Row
        styleProps={{
            width: "100%",
            justifyContent: "flex-start",
            flexShrink: 0,
            alignItems: "center",
            marginBottom: 10,
        }}
    >
        <Text
            styleProps={{
                fontWeight: 500,
            }}
        >
            User {userIndex}
        </Text>

        <Button
            buttonType="secondary"
            onClickHandle={handleModalClose}
            styleProps={{
                position: "absolute",
                top: 15,
                right: 15,
                borderRadius: 50,
                borderStyle: "none",
                background: Colors.TRANSPARENT,
                width: 40,
                height: 40,
                padding: 0,
            }}
        >
            <img src={cross} style={{ width: 30, height: 30 }} alt="cross" />
        </Button>
    </Row>
);
