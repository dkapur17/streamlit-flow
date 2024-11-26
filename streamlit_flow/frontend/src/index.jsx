import React from "react";
import { createRoot } from "react-dom/client";
import StreamlitFlowApp from "./StreamlitFlowApp";

// dotenv.config({ path: path.join(__dirname, "../.env") });
// webpack.config.js
const dotEnv = require("dotenv-webpack");
module.exports = {
	plugins: [new dotEnv()],
};

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StreamlitFlowApp />
	</React.StrictMode>
);
