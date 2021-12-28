import React, { ReactNode } from "react";

type ContainerProps = {
    children?: ReactNode;
    styleProps?: React.CSSProperties;
    classNames?: string;
};

const defaultContainerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
};

export const Container = ({ children, styleProps, classNames }: ContainerProps) => (
    <div className={`column ${classNames}`} style={{ ...defaultContainerStyle, ...styleProps }}>
        {children}
    </div>
);
