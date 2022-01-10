import React, { HTMLAttributes, ReactNode } from "react";

type RowProps = {
    children: ReactNode;
    styleProps?: React.CSSProperties;
} & HTMLAttributes<HTMLDivElement>;

const defaultRowStyle = {
    display: "flex",
};

export const Row = ({ children, styleProps, ...rest }: RowProps) => (
    <div style={{ ...defaultRowStyle, ...styleProps }} {...rest}>
        {children}
    </div>
);
