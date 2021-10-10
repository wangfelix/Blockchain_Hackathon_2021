import React from "react";

import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Text } from "BaseComponents/text";
import { Container } from "BaseComponents/container";
import { Row } from "BaseComponents/row";
import { Button } from "BaseComponents/Button/button";
import { useGetAllUnapprovedDoctors } from "Utils/hooks";

export const AdminPageApproveDoctorsTable = () => {
    // -- STATE --

    const unapprovedDoctors = useGetAllUnapprovedDoctors();

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
            <Text textType="text" styleProps={{ marginLeft: 10, marginBottom: 10 }}>
                Unapproved Doctors:
            </Text>

            <Container
                styleProps={{
                    height: "80%",
                    overflow: "auto",
                    paddingTop: 10,
                    border: "solid 2px",
                    borderRadius: BORDER_RADIUS,
                    borderColor: Colors.GREY,
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
                        <Button buttonType="secondary">Approve</Button>
                    </Row>
                ))}
            </Container>
        </Container>
    );
};
