// components/ImageFetchNode.jsx
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Handle } from "reactflow";
import { Streamlit, withStreamlitConnection } from "streamlit-component-lib";

const ImageFetchNode = ({ id, data }) => {
	const [inputId, setInputId] = useState("");
	const [imageSrc, setImageSrc] = useState(null); // Changed from imageUrl to imageSrc
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleFetchImage = async () => {
		if (!inputId) {
			setError("Please enter a valid ID.");
			return;
		}

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
				`https://champagne-master-aws.thoughtspotstaging.cloud/api/rest/2.0/report/answer`,
				data,
				{
					headers: {
						Authorization: `Bearer `,
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
				reader.onloadend = () => {
					Streamlit.setComponentValue({
						nodeId: id,
						imageData: reader.result, // base64 encoded string
					});
				};
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

	// Cleanup the object URL when the component unmounts or imageSrc changes
	React.useEffect(() => {
		return () => {
			if (imageSrc) {
				URL.revokeObjectURL(imageSrc);
			}
		};
	}, [imageSrc]);

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
				<input
					type="text"
					placeholder="Enter Chart ID"
					value={inputId}
					onChange={(e) => setInputId(e.target.value)}
					style={{
						width: "100%",
						padding: "5px",
						marginBottom: "5px",
					}}
				/>
				<button
					onClick={handleFetchImage}
					disabled={loading}
					style={{ width: "100%", padding: "5px" }}
				>
					{loading ? "Fetching..." : "Fetch Chart"}
				</button>
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

ImageFetchNode.propTypes = {
	id: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
};

export default withStreamlitConnection(ImageFetchNode);
