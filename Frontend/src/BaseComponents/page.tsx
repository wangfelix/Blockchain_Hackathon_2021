import React, { ReactNode } from "react";

import { Container } from "BaseComponents/container";
import { Row } from "BaseComponents/row";
import { MAX_PAGE_WIDTH } from "Utils/globalStyles";

type PageProps = {
    icon?: any;
    heading?: string;
    headingContent?: ReactNode;
    children?: ReactNode;
    childrenLeft?: ReactNode;
    childrenRight?: ReactNode;
    layout?: "single-row" | "double-row" | "landing";
};

/**
 * Takes a top-level page component and wraps it inside a page-layout.
 *
 * @param icon icon, shown in front of the heading. Only displayed when heading exists.
 * @param heading
 * @param headingContent Component displayed at the right end of the Heading-Bar.
 *      Should only be a small component, e.g. single line of information.
 * @param children
 * @param propsLayout
 */
export const Page = ({
    icon,
    heading,
    headingContent,
    children,
    childrenLeft,
    childrenRight,
    layout: propsLayout = "single-row",
}: PageProps) => {
    // -- RENDER --

    switch (propsLayout) {
        case "single-row":
            return (
                <Row styleProps={{ position: "absolute", inset: 0 }}>
                    <Container
                        styleProps={{
                            width: "100%",
                            maxWidth: MAX_PAGE_WIDTH,
                            margin: "0 auto",
                        }}
                    >
                        {heading && (
                            <Row
                                styleProps={{
                                    padding: "0 40px",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    height: "200px",
                                }}
                            >
                                <Row>
                                    {icon && <img src={icon} style={{ height: "28px", marginRight: "10px" }} />}
                                    <h2>{heading}</h2>
                                </Row>

                                {headingContent && <div>{headingContent}</div>}
                            </Row>
                        )}

                        <Container styleProps={{ height: "100%" }}>{children}</Container>
                    </Container>
                </Row>
            );

        case "landing":
            return <Container>{children}</Container>;

        case "double-row":
        default:
            return (
                <Row styleProps={{ position: "absolute", inset: 0 }}>
                    <Row
                        styleProps={{
                            width: "100%",
                            maxWidth: MAX_PAGE_WIDTH,
                            margin: "0 auto",
                            height: "100%",
                        }}
                    >
                        <Container
                            styleProps={{
                                width: "50%",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            {heading && (
                                <Row
                                    styleProps={{
                                        padding: "0 40px",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end",
                                        marginBottom: "20px",
                                        height: "110px",
                                    }}
                                >
                                    <Row>
                                        {icon && <img src={icon} style={{ height: "28px", marginRight: "10px" }} />}
                                        <h2>{heading}</h2>
                                    </Row>

                                    {headingContent && <div>{headingContent}</div>}
                                </Row>
                            )}

                            <Container
                                styleProps={{
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                }}
                            >
                                {childrenLeft}
                            </Container>
                        </Container>
                        <Container
                            styleProps={{
                                width: "50%",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            {childrenRight}
                        </Container>
                    </Row>
                </Row>
            );
    }
};
