import React from "react";
import { Counter } from "BaseComponents/Counter";
import ReactLogo from "Illustrations/documentIcon.svg";
import "Styles/test.css";
import { Test } from "Pages/Test";
import ProfilePicture from "../Illustrations/ProfilePicture.png";

export const App = () => {
    // -- RENDER --
    return (
        <>
            <div id={"webpack-test"}>App Test Render</div>
            <ReactLogo />
            <img src={ProfilePicture} />
            <Test />
            <Counter />
        </>
    );
};
