// components/VizNode.jsx
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Handle } from "reactflow";
import { withStreamlitConnection } from "streamlit-component-lib";

const FETCH_IMAGE_API_URL = process.env.REACT_APP_FETCH_IMAGE_API_URL;
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;


const VizNode = ({ args }) => {
    const nodes = args.nodes;
	const inputId = nodes[nodes.length - 1].data.vizId;
	console.log(args);
	console.log(inputId);
	const [imageSrc, setImageSrc] = useState(null); // Changed from imageUrl to imageSrc
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
    console.log("loading viz node!");

	const handleFetchImage = async () => {
		if (!inputId) {
			setError("Please enter a valid ID.");
			return;
		}
		console.log("fetching images");
		setLoading(true);
		setError(null);
		setImageSrc(null); // Reset previous image
		try {
			const data = {
				metadata_identifier: inputId,
				file_format: "PNG",
			};
			// Replace this URL with your actual API endpoint
			const response = await axios.post(
				`${FETCH_IMAGE_API_URL}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${BEARER_TOKEN}`,
						"Content-Type": "application/json",
					},
					responseType: "blob",
				}
			);
			// Check if the response is of type image
			if (
				response.headers["content-type"].startsWith(
					"application/octet-stream"
				)
			) {
				// Create a local URL for the image blob
				const imageBlob = response.data;
				const imageURL = URL.createObjectURL(imageBlob);
				setImageSrc(imageURL);
				// Optionally, send the image data back to Streamlit
				// Note: You cannot send binary data directly; consider sending a base64 string if needed
				const reader = new FileReader();
				reader.readAsDataURL(imageBlob);
			} else {
				setError("Received data is not an image.");
			}
		} catch (err) {
			console.error(err);
			setError("Failed to fetch image. Please try again.");
		} finally {
			setLoading(false);
		}
	};

    useEffect(() => {
        console.log("broooo");
		handleFetchImage();
        console.log("heyyy");
	}, []);

    return (
		<div
			className="image-fetch-node"
			style={{
				padding: "10px",
				border: "1px solid #ddd",
				borderRadius: "5px",
				background: "#fff",
			}}
		>
			<Handle type="target" position="top" />
			<div>
				{error && (
					<div style={{ color: "red", marginTop: "5px" }}>
						{error}
					</div>
				)}
				{imageSrc && (
					<img
						src={imageSrc}
						alt="Fetched"
						style={{ width: "100%", marginTop: "10px" }}
					/>
				)}
			</div>
			<Handle type="source" position="bottom" />
		</div>
	);
};
VizNode.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};
export default withStreamlitConnection(VizNode);
