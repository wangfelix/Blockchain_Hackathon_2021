import React from "react";

import { Container } from "BaseComponents/container";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";

type UserPanelContributionModalBottomBarProps = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    handleGoToNextStep: () => void;
    ctaLabel: string;
};
export const UserPanelContributionModalBottomBar = ({
    value,
    setValue,
    handleGoToNextStep,
    ctaLabel,
}: UserPanelContributionModalBottomBarProps) => (
    <Container styleProps={{ height: 40, position: "static", width: "100%" }}>
        <Row styleProps={{ left: 0, right: 0, flexShrink: 0, position: "absolute", bottom: 20 }}>
            <Button
                buttonType="text"
                styleProps={{ marginLeft: "auto", marginRight: 20 }}
                onClickHandle={() => setValue(value - 1)}
            >
                Back
            </Button>

            <Button buttonType="primary" onClickHandle={handleGoToNextStep} styleProps={{ marginRight: 20 }}>
                {ctaLabel}
            </Button>
        </Row>
    </Container>
);
