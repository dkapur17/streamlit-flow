import React from "react";
import StreamlitFlowApp from "./StreamlitFlowApp";
import {createRoot} from 'react-dom/client';

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StreamlitFlowApp />
    </React.StrictMode>
);