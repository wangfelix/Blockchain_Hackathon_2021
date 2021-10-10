import React from "react";

import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Text } from "BaseComponents/text";
import { Container } from "BaseComponents/container";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import { useGetAllUnapprovedDoctors, useMediSysMethod } from "Utils/hooks";
import { MediSys_Functions } from "Utils/smartContractUtils";

export const AdminPageApproveDoctorsTable = () => {
    // -- STATE --

    const { state: approveDoctorState, send: approveDoctor } = useMediSysMethod(MediSys_Functions.APPROVE_DOCTOR);

    const unapprovedDoctors = useGetAllUnapprovedDoctors();

    // -- CALLBACKS --

    const handleApproveDoctor = (address: string) => {
        approveDoctor(address).then(() => console.log("Doctor now has allowance"));
    };

    // -- RENDER --

    return (
        <Container
            styleProps={{
                height: "100%",
                width: 700,
                borderRadius: BORDER_RADIUS,
                marginLeft: 20,
            }}
        >
            <Text textType="text" styleProps={{ marginBottom: 10 }}>
                Unapproved Doctors:
            </Text>

            <Container
                styleProps={{
                    height: "90%",
                    background: Colors.PRIMARY_ACCENT_HUE,
                    overflow: "auto",
                    paddingTop: 10,
                    border: "solid 2px",
                    borderRadius: BORDER_RADIUS,
                    borderColor: Colors.PRIMARY_ACCENT_HUE_DARKER,
                    boxShadow: "0 5px 10px 2px rgba(80, 50, 80, 0.3)",
                }}
            >
                {unapprovedDoctors?.map((doctorsAddress) => (
                    <Row
                        styleProps={{
                            alignSelf: "center",
                            width: "97%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            border: "solid 2px",
                            borderRadius: BORDER_RADIUS,
                            borderColor: Colors.GREY,
                            background: Colors.GREY_LIGHT,
                            paddingLeft: 10,
                        }}
                    >
                        <Text textType="text">{doctorsAddress}</Text>

                        <Button buttonType="secondary" onClickHandle={() => handleApproveDoctor(doctorsAddress)}>
                            Approve
                        </Button>
                    </Row>
                ))}
            </Container>
        </Container>
    );
};
