import React, { useState } from "react";
import MaterialButton from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import { ClickAwayListener } from "@mui/material";

import { Container } from "BaseComponents/container";
import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";
import { Row } from "BaseComponents/row";
import { RootState } from "State/Reducers";
import { Event } from "State/Reducers/demoPageReducer";
import DownArrow from "Illustrations/downArrow.png";
import { Text } from "BaseComponents/text";

type DemoPageDemoPageTooltipBarBlockchainEventLogTooltipProps = {
    isOtherPanelOpen: boolean;
    setIsOtherPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DemoPageDemoPageTooltipBarBlockchainEventLogTooltip = ({
    isOtherPanelOpen,
    setIsOtherPanelOpen,
}: DemoPageDemoPageTooltipBarBlockchainEventLogTooltipProps) => {
    // -- STATE --

    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const events = useSelector<RootState, Event[]>((state) => state.demoPage.events);

    // -- CALLBACKS --

    const handleCloseTooltip = () => {
        setIsTooltipOpen(false);
        setIsOtherPanelOpen(false);
    };

    // -- RENDER --

    return (
        <Container
            styleProps={{
                margin: "0 auto",
                zIndex: Z_INDEX.DEMO_PAGE_MODAL,
                background: isHovered || isTooltipOpen ? "rgba(104,178,255,0.25)" : Colors.TRANSPARENT,
                borderRadius: BORDER_RADIUS,
                padding: "0 10px",
                transition: "background 0.3s",
            }}
            onMouseEnter={() => {
                if (!isOtherPanelOpen) {
                    setIsHovered(true);
                    setIsTooltipOpen(true);
                    setIsOtherPanelOpen(true);
                }
            }}
            onMouseLeave={() => setIsHovered(false)}
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
                                        padding: "10px 0",
                                        color: Colors.PRIMARY_ACCENT_BLUE_HUE,
                                        fontFamily: "Work Sans",
                                        fontSize: 16,
                                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                        position: "relative",

                                        gap: 5,
                                    }}
                                >
                                    <Row
                                        styleProps={{
                                            flexShrink: 0,
                                            justifyContent: "center",
                                            width: "100%",
                                            borderBottom: "solid 2px",
                                            borderColor: Colors.GREY_LIGHT,
                                            padding: "10px 0",
                                        }}
                                    >
                                        <b>Emitted Events</b>
                                    </Row>

                                    <Container
                                        styleProps={{
                                            alignItems: "center",
                                            margin: "0 auto",
                                            width: 500,
                                            overflow: "auto",
                                            display: "flex",
                                            padding: "20px",
                                            gap: 20,
                                            flexShrink: 0,
                                            maxHeight: "70vh",
                                        }}
                                    >
                                        {events.map((event) => (
                                            <Container
                                                styleProps={{
                                                    justifyContent: "space-between",
                                                    width: "100%",
                                                    padding: "10px",
                                                    background: Colors.PRIMARY_ACCENT_HUE,
                                                    borderRadius: BORDER_RADIUS,
                                                }}
                                            >
                                                <Row
                                                    styleProps={{
                                                        width: "100%",
                                                        borderBottom: `1px solid ${Colors.GREY}`,
                                                        padding: "5px 0",
                                                    }}
                                                >
                                                    <Container
                                                        styleProps={{
                                                            width: "50%",
                                                            borderRight: `1px solid ${Colors.GREY}`,
                                                            padding: "0 10px",
                                                        }}
                                                    >
                                                        <label style={{ fontWeight: "bold" }}>Date</label>
                                                        <Text>{event.date}</Text>
                                                    </Container>

                                                    <Container styleProps={{ width: "50%", padding: "0 10px" }}>
                                                        <label style={{ fontWeight: "bold" }}>Event Type</label>
                                                        <Text>Contribution</Text>
                                                    </Container>
                                                </Row>

                                                <Row
                                                    styleProps={{
                                                        width: "100%",
                                                        borderBottom: `1px solid ${Colors.GREY}`,
                                                        padding: "5px 0",
                                                    }}
                                                >
                                                    <Container
                                                        styleProps={{
                                                            width: "50%",
                                                            borderRight: `1px solid ${Colors.GREY}`,
                                                            padding: "0 10px",
                                                        }}
                                                    >
                                                        <label style={{ fontWeight: "bold" }}>Disease</label>
                                                        <Text>{event.diseaseName}</Text>
                                                    </Container>

                                                    <Container styleProps={{ width: "50%", padding: "0 10px" }}>
                                                        <label style={{ fontWeight: "bold" }}>
                                                            Transferred MediCoins
                                                        </label>
                                                        <Text>{event.transferredMediCoins}</Text>
                                                    </Container>
                                                </Row>

                                                <Row
                                                    styleProps={{
                                                        width: "100%",
                                                        borderBottom: `1px solid ${Colors.GREY}`,
                                                        padding: "5px 0",
                                                    }}
                                                >
                                                    <Container styleProps={{ width: "100%", padding: "0 10px" }}>
                                                        <label style={{ fontWeight: "bold" }}>User Address</label>
                                                        <Text>{event.userAddress}</Text>
                                                    </Container>
                                                </Row>

                                                <Row
                                                    styleProps={{
                                                        width: "100%",
                                                        padding: "5px 0",
                                                    }}
                                                >
                                                    <Container styleProps={{ width: "100%", padding: "0 10px" }}>
                                                        <label style={{ fontWeight: "bold" }}>
                                                            Hash of Contributed Dataset
                                                        </label>
                                                        <Text>{event.datasetHash}</Text>
                                                    </Container>
                                                </Row>
                                            </Container>
                                        ))}

                                        {events.length === 0 && <Text>No Events were emitted yet!</Text>}
                                    </Container>
                                </Container>
                            </>
                        }
                        placement="bottom"
                    >
                        <div>
                            <Row styleProps={{ justifyContent: "center", alignItems: "center", cursor: "pointer" }}>
                                <MaterialButton
                                    style={{
                                        color:
                                            isHovered || isTooltipOpen ? Colors.WHITE_OFF_WHITE : "rgba(104,178,255,1)",
                                    }}
                                >
                                    Blockchain Event Logs
                                </MaterialButton>
                                <img src={DownArrow} style={{ height: "22px" }} />
                            </Row>
                        </div>
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </Container>
    );
};
