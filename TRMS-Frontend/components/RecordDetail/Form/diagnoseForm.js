/** @format */

import React, { useState } from "react";
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

const DiagnoseForm = ({ model, onChange }) => {
	const [preDiagnosis, setPre] = useState(model.preDiagnosis);
	const [impDiagnosis, setImp] = useState(model.impDiagnosis);

	const onChangePre = (e) => {
		setPre(e.target.value);
		if (onChange) {
			onChange({
				preDiagnosis: e.target.value,
				impDiagnosis,
			});
		}
	};
	const onChangeImp = (e) => {
		setImp(e.target.value);
		if (onChange) {
			onChange({
				preDiagnosis,
				impDiagnosis: e.target.value,
			});
		}
	};

	return (
		<Form
			{...layout}
			name="nest-messages"
			validateMessages={validateMessages}
			initialValues={model}
		>
			<Form.Item name={"preDiagnosis"} label="Chẩn đoán sơ bộ">
				<Input.TextArea
					style={{ maxHeight: "180px", margin: "5px" }}
					onChange={onChangePre}
				/>
			</Form.Item>
			<Form.Item name={"impDiagnosis"} label="Chẩn đoán xác định">
				<Input.TextArea
					style={{ maxHeight: "180px", margin: "5px" }}
					onChange={onChangeImp}
				/>
			</Form.Item>
		</Form>
	);
};

DiagnoseForm.propTypes = {};

export default DiagnoseForm;
