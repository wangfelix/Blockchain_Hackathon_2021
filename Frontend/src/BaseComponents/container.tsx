import React, { ReactNode } from "react";

type ContainerProps = {
    children?: ReactNode;
    styleProps?: React.CSSProperties;
};

const defaultContainerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
};

export const Container = ({ children, styleProps }: ContainerProps) => (
    <div className="column" style={{ ...defaultContainerStyle, ...styleProps }}>
        {children}
    </div>
);
