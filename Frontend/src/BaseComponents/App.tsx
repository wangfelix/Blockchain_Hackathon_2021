import React from "react";
import { Counter } from "BaseComponents/Counter";
import "BaseComponents/appStyle.css";

export const App = () => {
    // -- RENDER --
    return (
        <>
            <div id={"webpack-test"}>App Test Render</div>

            <Counter />
        </>
    );
};
