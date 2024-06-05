import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <h1>Hello, world!</h1>
    </React.StrictMode>
);


export function Test() {
    return <h1>Hello</h1>;
}