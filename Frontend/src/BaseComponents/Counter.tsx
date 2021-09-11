import React from "react";

export const Counter = () => {
    return (
        <>
            <h2>Counter: </h2>
            <h3>5</h3>

            <IncrementForm />
        </>
    );
};

const IncrementForm = () => {
    return (
        <form>
            <label>Increment</label>
            <button>Clicke hier</button>
        </form>
    );
};
