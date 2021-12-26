import React from "react";
import Select, { StylesConfig } from "react-select";

import { Colors } from "Utils/globalStyles";

export type SelectorOption =
    | {
          readonly value: string;
          readonly label: string;
          readonly isDisabled?: boolean;
      }
    | undefined;

type SelectorProps = {
    options: SelectorOption[];
    onChange?: (newValue: string) => void;
};

export const Selector = ({ options, onChange }: SelectorProps) => {
    // -- STYLES --

    const selectorStyles: StylesConfig<SelectorOption> = {
        control: (styles) => ({ ...styles, backgroundColor: Colors.WHITE }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                    ? `${Colors.LAVENDER}88`
                    : isFocused
                    ? `${Colors.LAVENDER}22`
                    : Colors.WHITE,
                color: Colors.BLACK,
                borderRadius: 4,
                cursor: isDisabled ? "not-allowed" : "default",
                margin: "0 auto",
                width: "calc(100% - 8px)",

                ":active": {
                    ...styles[":active"],
                    backgroundColor: !isDisabled ? (isSelected ? "white" : undefined) : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles }),
        placeholder: (styles) => ({ ...styles }),
        singleValue: (styles, { data }) => ({ ...styles }),
    };

    // -- HELPERS --

    const isSelectOption = (v: any): v is SelectorOption => {
        // @ts-ignore
        if (v && (v as SelectorOption).value !== undefined) return v.value;

        return false;
    };

    // -- RENDER --

    return (
        <Select
            onChange={(v) => {
                // TODO Wie funktionieren hier die Types ???
                if (v && isSelectOption(v)) {
                    console.log(v);

                    if (onChange) {
                        // @ts-ignore
                        onChange((v as SelectorOption).value);
                    }
                }
            }}
            defaultValue={options[0]}
            options={options}
            styles={selectorStyles}
        />
    );
};
