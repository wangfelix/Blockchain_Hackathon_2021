import React, { ReactNode } from "react";

type RowProps = {
    children: ReactNode;
    styleProps?: React.CSSProperties;
};

const defaultRowStyle = {
    display: "flex",
    flexDirection: "row" as "row",
};

export const Row = ({ children, styleProps }: RowProps) => (
    <div style={{ ...defaultRowStyle, ...styleProps }}>{children}</div>
);
