/** @format */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import { Form, Input, InputNumber, Button, Modal, Steps, Divider } from "antd";
import { FORM_MODE } from "../../../const/componentConst";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import InputPanel from "../../shared/InputPanel";
//css
import "../style.less";
import ClinicalForm from "./clinicalForm";
import DiagnoseForm from "./diagnoseForm";
import TreatmentForm from "./treatmentForm";
const { Step } = Steps;

const FORM_NAME = {
	REGISTER: "Khám mới",
	UPDATE: "Sửa thông tin khám bệnh",
	DELETE: "Xóa thông tin khám bệnh",
	DETAIL: "Thông tin khám bệnh chi tiết",
	NONE: "",
};
const DIAGNOSE_STEP = [
	{
		title: "Khám sơ bộ và xét nghiệm",
		content: "First-content",
	},
	{
		title: "Chẩn đoán",
		content: "Second-content",
	},
	{
		title: "Điều trị",
		content: "Last-content",
	},
];
const layout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
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

const form = ({ mode = "NONE", model, onSubmit, onCancel }) => {
	const [currentStepOfDiagnose, setCurrentStepOfDiagnose] = useState(0);
	const onFinish = (values) => {
		console.log("Form Values: ", values);
		onCancel();
	};
	const handleClickNextBtn = useCallback(() => {
		console.log("Next current: ", currentStepOfDiagnose);

		if (currentStepOfDiagnose < 2)
			setCurrentStepOfDiagnose(currentStepOfDiagnose + 1);
	});
	const handleClickPrevBtn = useCallback(() => {
		console.log("Prev current: ", currentStepOfDiagnose);
		if (currentStepOfDiagnose > 0)
			setCurrentStepOfDiagnose(currentStepOfDiagnose - 1);
	});
	const handleOk = (e) => {
		// console.log(e);
	};

	const handleCancel = (e) => {
		onCancel();
		// console.log(e);
	};

	const handleSubmit = (formValues) => {
		console.log("submitting ... ");
		console.log("submitting ... ", formValues);
		onSubmit(formValues);
	};

	return (
		<Modal
			title={FORM_NAME[mode]}
			visible={mode !== FORM_MODE.NONE}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose
			footer={null}
			width={600}
		>
			<div className="step-area">
				<Steps current={currentStepOfDiagnose}>
					{DIAGNOSE_STEP.map((item) => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
			</div>
			<div>
				{currentStepOfDiagnose === 0 && <ClinicalForm />}
				{currentStepOfDiagnose === 1 && <DiagnoseForm />}
				{currentStepOfDiagnose === 2 && <TreatmentForm model={model} />}

				<div className="footer-button-area">
					{currentStepOfDiagnose !== 0 && (
						<Button
							type="primary"
							icon={<ArrowLeftOutlined className="button-icon" />}
							className="button-action"
							onClick={handleClickPrevBtn}
						>
							{" "}
							Prev{" "}
						</Button>
					)}
					{currentStepOfDiagnose !== 2 && (
						<Button
							type="primary"
							icon={
								<ArrowRightOutlined className="button-icon" />
							}
							className="button-action"
							onClick={handleClickNextBtn}
						>
							{" "}
							Next{" "}
						</Button>
					)}
				</div>
			</div>
		</Modal>
	);
};

form.propTypes = {
	mode: PropTypes.string,
	model: PropTypes.object,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

export default form;
