import React from "react";

import { BORDER_RADIUS, Colors, Z_INDEX } from "Utils/globalStyles";
import { Container } from "BaseComponents/container";
import { FormItem, FormItemProps } from "BaseComponents/Form/Components/formItem";
import { Row } from "BaseComponents/row";
import { Text } from "BaseComponents/text";
import { isEven } from "Utils/utils";

type InsetFormProps = {
    formStyleProps?: { form?: React.CSSProperties; item?: React.CSSProperties };
    id?: string;
    title: string;
    content?: FormItemProps[];
};

export const InsetForm = ({ formStyleProps, title, content }: InsetFormProps) => (
    <Container
        styleProps={{
            width: "auto",
            height: "auto",
            position: "relative",
        }}
    >
        <Container
            styleProps={{
                width: "100%",
                height: "100%",
                border: `solid 1px ${Colors.GREY}`,
                padding: "0 15px 15px 15px",
                borderRadius: BORDER_RADIUS,
                alignItems: "center",

                ...formStyleProps?.form,
            }}
        >
            <Row
                styleProps={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "-15px",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: Z_INDEX.DEMO_PAGE_MODAL - 1,
                }}
            >
                <Text
                    styleProps={{
                        background: Colors.WHITE_OFF_WHITE,
                        borderRadius: BORDER_RADIUS,
                        padding: "5px 20px",
                    }}
                >
                    {title}
                </Text>
            </Row>

            {content &&
                content.map((item, index) => (
                    <FormItem
                        type={item.type}
                        label={item.label}
                        onChange={item.onChange}
                        selectorOptions={item.selectorOptions}
                        defaultIsChecked={item.defaultIsChecked}
                        defaultValueSlider={item.defaultValueSlider}
                        isSliderDisabled={item.isSliderDisabled}
                        sliderValue={item.sliderValue}
                        styleProps={{
                            background: isEven(index) ? `${Colors.WHITE_OFF_WHITE}66` : Colors.WHITE,
                            marginTop: index !== 0 ? 0 : title ? 30 : 0,
                            marginBottom: 5,
                        }}
                    />
                ))}
        </Container>
    </Container>
);
