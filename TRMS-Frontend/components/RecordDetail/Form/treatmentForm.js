/** @format */

import React from "react";
import PropTypes from "prop-types";
import InputPanel from "../../shared/InputPanel";

const TreatmentForm = ({
	model,
	onChangeMedGuide,
	onChangeMedForm,
	medicationList,
}) => {
	const medicationData = medicationList.map((e) => ({
		name: e.id,
		content: e.name,
		type: "number",
	}));

	return (
		<div style={{ height: "400px", overflow: "auto" }}>
			<div style={{ display: "flex" }}>
				<div style={{ width: "140px", padding: "0px 30px" }}>
					{" "}
					Điều trị{" "}
				</div>
				<textarea
					width={300}
					style={{
						borderRadius: "5px",
						width: "100%",
						resize: "vertical",
						maxHeight: "200px",
					}}
					onChange={(e) => {
						onChangeMedGuide(e.target.value);
					}}
					defaultValue={
						model && model.treatmentGuide
							? model.treatmentGuide
							: ""
					}
				/>
			</div>
			<InputPanel
				onChange={onChangeMedForm}
				title="Thuốc"
				childlist={medicationData}
				initialValues={
					model && model.prescription
						? model.prescription.medicationList.map((e) => ({
								name: e.medication.id,
								content: e.medication.name,
								value: e.quantity,
								type: "number",
						  }))
						: []
				}
			/>
		</div>
	);
};

TreatmentForm.propTypes = {};

export default TreatmentForm;
