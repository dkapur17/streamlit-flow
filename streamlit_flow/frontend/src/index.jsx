import React from "react"
import ReactDOM from "react-dom"
import { StreamlitProvider } from "streamlit-component-lib-react-hooks"
import ReactFlowComponent from "./ReactFlowComponent"

ReactDOM.render(
    <React.StrictMode>
        <StreamlitProvider>
            <ReactFlowComponent />
        </StreamlitProvider>
    </React.StrictMode>,
    document.getElementById("root")
)
