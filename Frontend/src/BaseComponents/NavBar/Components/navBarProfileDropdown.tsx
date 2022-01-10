import React, { useState } from "react";
import { useEthers } from "@usedapp/core";
import { ClickAwayListener } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import { Row } from "BaseComponents/row";
import { Text } from "BaseComponents/text";
import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";
import DownArrow from "Illustrations/downArrow.png";
import ProfilePicture from "Illustrations/ProfilePicture.png";
import { useMyName } from "Utils/hooks";
import { Container } from "BaseComponents/container";

export const NavBarProfileDropdown = () => {
    // -- STATE --

    const { account } = useEthers();

    const myName = useMyName(account);

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const [isTooltipHovered, setIsTooltipHovered] = useState(false);

    // -- CALLBACKS --

    const handleCloseTooltip = () => setIsTooltipOpen(false);

    const handleOpenTooltip = () => setIsTooltipOpen(true);

    // -- RENDER --

    return (
        <Row
            styleProps={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: "10px",
                justifySelf: "flex-end",
                alignItems: "center",
            }}
        >
            <ClickAwayListener onClickAway={handleCloseTooltip}>
                <div>
                    <Tooltip
                        disableHoverListener
                        open={isTooltipOpen}
                        title={
                            <>
                                <Container
                                    styleProps={{
                                        background: Colors.WHITE,
                                        borderRadius: BORDER_RADIUS,
                                        color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                        fontFamily: "Work Sans",
                                        fontSize: 16,
                                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                        position: "relative",
                                        maxHeight: 500,
                                        width: 300,
                                        gap: 5,
                                        padding: 20,
                                        zIndex: Z_INDEX.DEMO_PAGE,
                                    }}
                                >
                                    Work in Progress.
                                </Container>
                            </>
                        }
                        placement="bottom-end"
                    >
                        <div>
                            <Row
                                styleProps={{
                                    height: "100%",
                                    cursor: "pointer",
                                    borderRadius: BORDER_RADIUS,
                                    alignItems: "center",
                                    background: isTooltipOpen
                                        ? "rgba(104,178,255,0.25)"
                                        : isTooltipHovered
                                        ? "rgba(104,178,255,0.1)"
                                        : Colors.TRANSPARENT,
                                    transition: "background 0.3s",
                                    padding: "5px 20px",
                                }}
                                onMouseEnter={() => setIsTooltipHovered(true)}
                                onMouseLeave={() => setIsTooltipHovered(false)}
                                onClick={handleOpenTooltip}
                            >
                                <Text
                                    textType="text"
                                    styleProps={{ color: Colors.WHITE_OFF_WHITE, fontFamily: "Work Sans" }}
                                >
                                    {myName}
                                </Text>

                                <img src={DownArrow} style={{ height: "24px", margin: "0 10px" }} alt="down arrow" />

                                <img src={ProfilePicture} style={{ height: "40px", alignSelf: "center" }} />
                            </Row>
                        </div>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </Row>
    );
};
