import React, { useEffect, useState } from "react";

import { Button } from "BaseComponents/Button/button";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Row } from "BaseComponents/row";
import { Page } from "BaseComponents/page";
import wallet from "Illustrations/wallet.png";
import { Container } from "BaseComponents/container";
import { Text } from "BaseComponents/text";

export const ContributeDataPage = () => {
    // -- CALLBACKS --

    const handleMoveToValuePage = () => {};

    // -- RENDER --

    return <FileUploader ctaLabel="Calculate Value" onCta={handleMoveToValuePage} acceptedFileType="csv" />;
};

type FileUploaderProps = {
    label?: string;
    ctaLabel: string;
    onCta: (...args: any[]) => any;
    acceptedFileType: "csv" | "image";
};

export const FileUploader = ({ label, ctaLabel, onCta }: FileUploaderProps) => {
    // -- STATE --

    const [selectedFile, setSelectedFile] = useState({ name: null });

    // -- CALLBACKS --

    const handleSelectFile = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (selectedFile) {
            console.log(selectedFile);
        }
    }, [selectedFile]);

    // -- RENDER --

    return (
        <Page heading="Contribute-Data" icon={wallet}>
            <Container styleProps={{ display: "grid", gridTemplateColumns: "1fr 50% 1fr", gridGap: "10px" }}>
                <Container styleProps={{ gridColumn: "2" }}>
                    <Row
                        styleProps={{
                            background: Colors.GREY_LIGHT,
                            borderRadius: BORDER_RADIUS,
                            height: "46px",
                            width: "80%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            alignSelf: "center",
                            padding: "0 0 0 20px",
                            margin: "50px 0 20px 0",
                        }}
                    >
                        <div style={{ color: Colors.GREY_DARK }}>
                            {selectedFile.name ? selectedFile.name : "...no file selected"}
                        </div>

                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="inputfile"
                            onChange={handleSelectFile}
                            style={{ display: "none" }}
                        />

                        <label
                            htmlFor="file"
                            style={{
                                cursor: "pointer",
                                background: Colors.PRIMARY_ACCENT,
                                borderRadius: BORDER_RADIUS,
                                borderStyle: "solid",
                                borderColor: Colors.PRIMARY_ACCENT,
                                display: "block",
                                padding: "0 20px",
                                color: Colors.WHITE,
                                lineHeight: "34px",
                                fontSize: "15px",
                                marginRight: "3px",
                            }}
                        >
                            {label ? label : "Select file"}
                        </label>
                    </Row>

                    {selectedFile.name && (
                        <Button buttonType="primary" onClickHandle={onCta} styleProps={{ alignSelf: "flex-end" }}>
                            {ctaLabel}
                        </Button>
                    )}
                </Container>

                <Text textType="nudge" styleProps={{ width: "75%", margin: "0 auto 0 0" }}>
                    Help us improve our platform and facilitate the process of diagnosis, ultimatively helping patients
                    getting the best medical resources possible! By contributing high quality datasets, you will be
                    given Medicalvalues-Coins, with which you can access our products at a discounted price.
                    <br />
                    <br />
                    Help us improve our platform and facilitate the process of diagnosis, ultimatively helping patients
                    getting the best medical resources possible! By contributing high quality datasets, you will be
                    given Medicalvalues-Coins, with which you can access our products at a discounted price. Help us
                    improve our platform and facilitate the process of diagnosis, ultimatively helping patients getting
                    the best medical resources possible! By contributing high quality datasets, you will be given
                    Medicalvalues-Coins, with which you can access our products at a discounted price.
                </Text>
            </Container>
        </Page>
    );
};
