/** @format */

import React from "react";
import PropTypes from "prop-types";
import InputPanel from "../../shared/InputPanel";

const TreatmentForm = (props) => {
	return (
		<div style={{ height: "400px", overflow: "auto"}}>
			<InputPanel
				title="Thuốc"
				childlist={[
					{
						name: "med1",
						content: "Penicillin",
						type: "number",
					},
					{
						name: "med2",
						content: "Kháng sinh",
						type: "number",
					},
					{
						name: "med3",
						content: "Giảm đau",
						type: "number",
					},
					{
						name: "med4",
						content: "Panacetamol",
						type: "number",
					},
					{
						name: "med5",
						content: "Vitamin C",
						type: "number",
					},
					{
						name: "med6",
						content: "Vitamin B",
						type: "number",
					},
					{
						name: "med7",
						content: "Vitamin A",
						type: "number",
					},
					{
						name: "med8",
						content: "Vitamin B1",
						type: "number",
					},
				]}
			/>
			<div style={{ display: "flex" }}>
				<div style={{ width: "140px", padding: "0px 30px" }}>
					{" "}
					Điều trị{" "}
				</div>
				<textarea
					width={300}
					style={{ borderRadius: "5px", width: "100%", resize: "vertical", maxHeight: "200px" }}
				/>
			</div>
		</div>
	);
};

TreatmentForm.propTypes = {};

export default TreatmentForm;
