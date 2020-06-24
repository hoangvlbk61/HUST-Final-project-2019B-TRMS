/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Form, Input } from "antd";

const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 16,
	},
};
const validateMessages = {
	required: "${label} cần được điền!",
	types: {
		email: "${label} không phải email hợp lệ!",
		number: "${label} không phải số hợp lệ!",
	},
	number: {
		range: "${label} phải nằm trong khoản ${min} và ${max}",
	},
};

const DiagnoseForm = ({ model }) => {
	const handleSubmit = (formValues) => {
		console.log("submitting ... ");
		console.log("submitting ... ", formValues);
		onSubmit(formValues);
	};
	return (
		<Form
			{...layout}
			name="nest-messages"
			validateMessages={validateMessages}
			initialValues={model}
		>
			<Form.Item name={"sobo"} label="Chẩn đoán sơ bộ">
				<Input.TextArea style={{ maxHeight: "180px", margin: "5px" }} />
			</Form.Item>
			<Form.Item name={"detail"} label="Chẩn đoán xác định">
				<Input.TextArea style={{ maxHeight: "180px", margin: "5px"}} />
			</Form.Item>
		</Form>
	);
};

DiagnoseForm.propTypes = {};

export default DiagnoseForm;
