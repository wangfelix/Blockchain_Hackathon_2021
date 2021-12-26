import React from "react";
import Slider from "@mui/material/Slider";
import { OnChangeValue } from "react-select/dist/declarations/src/types";
import Checkbox from "@mui/material/Checkbox";

import { Row } from "BaseComponents/row";
import { Text } from "BaseComponents/text";
import { Container } from "BaseComponents/container";
import { BORDER_RADIUS, Colors } from "Utils/globalStyles";
import { Selector, SelectorOption } from "BaseComponents/Selector";

export type FormEventTypes =
    | React.ChangeEvent<HTMLInputElement>
    | Event
    | OnChangeValue<SelectorOption, false>
    | string
    | undefined;

export type FormItemProps = {
    type: "Selector" | "Slider" | "Checkbox";
    inputProps?: object;
    label: string;
    onChange: (prop: FormEventTypes) => void;
    selectorOptions?: SelectorOption[];
    styleProps?: React.CSSProperties;
    defaultIsChecked?: boolean;
    defaultValueSlider?: number;
    isSliderDisabled?: boolean;
    sliderValue?: number;
};

export const FormItem = ({
    type,
    label,
    styleProps,
    onChange,
    inputProps,
    selectorOptions,
    defaultIsChecked,
    defaultValueSlider,
    isSliderDisabled,
    sliderValue,
}: FormItemProps) => {
    const sliderDefaultValue = defaultValueSlider !== undefined ? defaultValueSlider : 0;

    // -- RENDER --

    let Input = <></>;

    switch (type) {
        case "Checkbox":
            Input = <Checkbox defaultChecked={!!defaultIsChecked} disableRipple onChange={onChange} />;
            break;

        case "Slider":
            Input = (
                <Slider
                    aria-label="Custom marks"
                    defaultValue={sliderDefaultValue}
                    valueLabelDisplay="auto"
                    step={25}
                    min={0}
                    max={100}
                    marks
                    disabled={isSliderDisabled}
                    onChange={onChange}
                    value={sliderValue}
                    {...inputProps}
                />
            );
            break;
        case "Selector":
            Input = (
                <Container styleProps={{ width: "100%" }}>
                    <Selector options={selectorOptions ? selectorOptions : []} onChange={onChange} {...inputProps} />
                </Container>
            );
            break;
    }

    return (
        <Row
            styleProps={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px",
                paddingTop: type === "Slider" ? 10 : type === "Selector" ? 5 : 0,
                paddingBottom: type === "Slider" ? 10 : type === "Selector" ? 5 : 0,
                position: "relative",
                borderRadius: BORDER_RADIUS,
                gap: 15,

                ...styleProps,
            }}
        >
            <Text
                styleProps={{
                    fontSize: 16,
                    width: "50%",
                    flexShrink: 2,
                    ...(isSliderDisabled ? { color: Colors.GREY } : {}),
                    transition: "color 0.3s",
                }}
            >
                {label}
            </Text>

            <Container
                styleProps={{
                    width: "50%",
                    flexShrink: 0,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    paddingLeft: type === "Checkbox" ? 0 : type === "Slider" ? 20 : 9,
                    paddingRight: type === "Slider" ? 10 : 0,
                }}
            >
                {Input}
            </Container>
        </Row>
    );
};
