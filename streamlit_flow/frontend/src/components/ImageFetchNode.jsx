// components/ImageFetchNode.jsx
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Handle } from "reactflow";
import { withStreamlitConnection } from "streamlit-component-lib";

const FETCH_IMAGE_API_URL = process.env.REACT_APP_FETCH_IMAGE_API_URL;
const FETCH_FILTER_API_URL = process.env.REACT_APP_FETCH_FILTER_API_URL;
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const ImageFetchNode = ({ args }) => {
	console.log(args)
	const [inputId, setInputId] = useState("");
	const [imageSrc, setImageSrc] = useState(null); // For image display
	const [metadataName, setMetadataName] = useState(""); // For node heading
	const [filters, setFilters] = useState([]); // Array of filter objects { name: string, values: array }
	const [selectedFilters, setSelectedFilters] = useState({}); // { filterName: selectedValue }
	const [loadingImage, setLoadingImage] = useState(false);
	const [loadingFilters, setLoadingFilters] = useState(false);
	const [error, setError] = useState(null);

	// Cleanup the object URL when the component unmounts or imageSrc changes
	useEffect(() => {
		return () => {
			if (imageSrc) {
				URL.revokeObjectURL(imageSrc);
			}
		};
	}, [imageSrc]);

	const handleFetchImageAndFilters = async () => {
		if (!inputId) {
			setError("Please enter a valid ID.");
			return;
		}

		setLoadingImage(true);
		setLoadingFilters(true);
		setError(null);
		setImageSrc(null); // Reset previous image
		setMetadataName(""); // Reset previous metadata name
		setFilters([]); // Reset previous filters
		setSelectedFilters({}); // Reset previous selections

		try {
			const img_req_data = {
				metadata_identifier: inputId,
				file_format: "PNG",
			};

			const filter_req_data = {
				metadata_identifier: inputId,
				data_format: "FULL",
			};

			// Replace this URL with your actual API endpoint
			const imageResponse = await axios.post(`${FETCH_IMAGE_API_URL}`, img_req_data, {
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
					"Content-Type": "application/json",
				},
				responseType: "blob",
			});

			const reader = new FileReader();

			// Check if the response is of type image
			if (
				imageResponse.headers["content-type"].startsWith(
					"application/octet-stream"
				)
			) {
				// Create a local URL for the image blob
				const imageBlob = imageResponse.data;
				const imageURL = URL.createObjectURL(imageBlob);
				setImageSrc(imageURL);

				reader.readAsDataURL(imageBlob);
			} else {
				setError("Received data is not an image.");
			}

			// Fetch the JSON data for filters
			const filtersResponse = await axios.post(`${FETCH_FILTER_API_URL}`, filter_req_data, {
				headers: {
					Authorization: `Bearer ${BEARER_TOKEN}`,
					"Content-Type": "application/json",
				},
				responseType: "json",
			});

			// Validate and process the JSON response
			if (
				filtersResponse.data &&
				typeof filtersResponse.data === "object" &&
				filtersResponse.data.metadata_name &&
				Array.isArray(filtersResponse.data.contents) &&
				filtersResponse.data.contents.length > 0
			) {
				const metadata = filtersResponse.data.metadata_name;
				setMetadataName(metadata);

				const content = filtersResponse.data.contents[0]; // Assuming we take the first content object
				const columnNames = content.column_names;
				const dataRows = content.data_rows;

				// Extract unique values for each column
				const extractedFilters = columnNames.map((col) => {
					const uniqueValues = Array.from(
						new Set(
							dataRows
								.map((row) => row[col])
								.filter(
									(val) => val !== undefined && val !== null
								)
						)
					);
					return {
						name: col,
						values: uniqueValues,
					};
				});

				setFilters(extractedFilters);

				// Initialize selectedFilters with the first value of each filter
				const initialSelected = {};
				extractedFilters.forEach((filter) => {
					initialSelected[filter.name] = filter.values[0] || "";
				});
				setSelectedFilters(initialSelected);

			}
		} catch (err) {
			console.error(err);
			setError("Failed to fetch image or filters. Please try again.");
		} finally {
			setLoadingImage(false);
			setLoadingFilters(false);
		}
	};

	const handleFilterChange = (filterName, selectedValue) => {
		const updatedFilters = {
			...selectedFilters,
			[filterName]: selectedValue,
		};
		setSelectedFilters(updatedFilters);
	};

	return (
		<div
			className="image-fetch-node"
			style={{
				width: "25rem",
				padding: "10px",
				border: "1px solid #ddd",
				borderRadius: "5px",
				background: "#fff",
			}}
		>
			<Handle type="target" position="top" />
			{metadataName && (
				<div
					style={{
						marginTop: "10px",
						fontWeight: "bold",
						fontSize: "16px",
					}}
				>
					{metadataName}
				</div>
			)}

			<div>
				<input
					type="text"
					placeholder="Enter Answer ID"
					value={inputId}
					onChange={(e) => setInputId(e.target.value)}
					style={{
						width: "100%",
						padding: "5px",
						marginBottom: "5px",
						boxSizing: "border-box",
					}}
				/>
				<button
					onClick={handleFetchImageAndFilters}
					disabled={loadingImage || loadingFilters}
					style={{ width: "100%", padding: "5px", cursor: "pointer" }}
				>
					{loadingImage || loadingFilters
						? "Fetching..."
						: "Fetch Chart & Filters"}
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
						style={{
							marginTop: "10px",
							borderRadius: "5px",
						}}
					/>
				)}
				{filters.length > 0 && (
					<div style={{ marginTop: "10px" }}>
						{filters.map((filter, index) => (
							<div key={index} style={{ marginBottom: "10px" }}>
								<label
									style={{
										display: "block",
										marginBottom: "5px",
									}}
								>
									{filter.name}
								</label>
								<select
									value={selectedFilters[filter.name] || ""}
									onChange={(e) =>
										handleFilterChange(
											filter.name,
											e.target.value
										)
									}
									style={{
										width: "100%",
										padding: "5px",
										boxSizing: "border-box",
									}}
								>
									{filter.values.map((value, idx) => (
										<option key={idx} value={value}>
											{value}
										</option>
									))}
								</select>
							</div>
						))}
					</div>
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
