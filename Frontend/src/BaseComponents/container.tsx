import React, { HTMLAttributes, ReactNode } from "react";

type ContainerProps = {
    children?: ReactNode;
    styleProps?: React.CSSProperties;
    classNames?: string;
} & HTMLAttributes<HTMLDivElement>;

const defaultContainerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
};

export const Container = ({ children, styleProps, classNames, ...rest }: ContainerProps) => (
    <div className={`column ${classNames}`} style={{ ...defaultContainerStyle, ...styleProps }} {...rest}>
        {children}
    </div>
);
