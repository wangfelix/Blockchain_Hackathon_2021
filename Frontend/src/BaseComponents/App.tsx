import React from "react";
import { Counter } from "BaseComponents/Counter"
import "BaseComponents/appStyle.css"

export const App = () => {

    const b = "hallo"

    // -- RENDER --
    return (
        <>
            <div id={"webpack-test"}>
                App Test Render
            </div>


            <Counter />
        </>

    )
}