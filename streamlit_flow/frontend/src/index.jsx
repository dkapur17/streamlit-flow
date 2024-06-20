import React from "react";
import ReactFlowComponent from "./ReactFlowComponent";
import {createRoot} from 'react-dom/client';

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ReactFlowComponent />
    </React.StrictMode>
);