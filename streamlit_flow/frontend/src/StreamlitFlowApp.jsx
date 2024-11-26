import { withStreamlitConnection } from "streamlit-component-lib";

import { useEffect } from "react";
import StreamlitFlowComponent from "./StreamlitFlowComponent";

import {
	AuthStatus,
	AuthType,
	init,
} from "@thoughtspot/visual-embed-sdk/react";

const TS_URL = process.env.TS_URL;

const registerAuthEvent = (aEE, { name }) => {
	aEE.on(AuthStatus.SUCCESS, () => {
		console.log("Success", name);
	});
	aEE.on(AuthStatus.SDK_SUCCESS, () => {
		console.log("SDK_SUCCESS", name);
	});
	aEE.on(AuthStatus.FAILURE, (e) => {
		console.log("Auth fail", e);
	});
};

const embeddedSSOInit = (tsHost, logLevel) => {
	console.log("EmbeddedSSO Init called");
	registerAuthEvent(
		init({
			thoughtSpotHost: tsHost,
			authType: AuthType.EmbeddedSSO,
			logLevel: logLevel,
			inPopup: false,
		}),
		{ name: AuthType.EmbeddedSSO }
	);
};

const StreamlitFlowApp = (props) => {
	useEffect(() => {
		embeddedSSOInit(TS_URL, "INFO");
	});
	return (
		<>
			{props.args.component === "streamlit_flow" && (
				<StreamlitFlowComponent {...props} />
			)}
		</>
	);
};

export default withStreamlitConnection(StreamlitFlowApp);
