/** @format */

import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import { Form, Input, InputNumber, Button, Modal, Steps, message } from "antd";
import { FORM_MODE, TEST_TYPE } from "../../../const/componentConst";
import {
	ArrowLeftOutlined,
	ArrowRightOutlined,
	SaveOutlined,
} from "@ant-design/icons";
import InputPanel from "../../shared/InputPanel";
//css
import "../style.less";
import ClinicalForm from "./clinicalForm";
import DiagnoseForm from "./diagnoseForm";
import TreatmentForm from "./treatmentForm";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE } from "../../../const/gql/examination";
import { FETCH_ALL } from "../../../const/gql/medication";
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

const form = ({ mode = "NONE", model, onSubmit, onCancel, dataRefresh }) => {
	console.log("model to form: ", model);

	const [bloodFormValues, setBloodFormValues] = useState(null);
	const [otherFormValues, setOtherFormValues] = useState(null);
	const [medFormValues, setMedFormValues] = useState(null);
	const [medGuideValues, setMedGuideValues] = useState(null);
	const [diagnoseFormValues, setDiagnoseFormValues] = useState(null);

	const [currentStepOfDiagnose, setCurrentStepOfDiagnose] = useState(0);
	const onFinish = (values) => {
		onCancel();
	};
	const handleClickNextBtn = useCallback(() => {
		if (currentStepOfDiagnose < 2)
			setCurrentStepOfDiagnose(currentStepOfDiagnose + 1);
	});
	const handleClickPrevBtn = useCallback(() => {
		if (currentStepOfDiagnose > 0)
			setCurrentStepOfDiagnose(currentStepOfDiagnose - 1);
	});
	const [
		updateExamination,
		{ loading: updateLoading, error: updateError },
	] = useMutation(UPDATE);

	const {
		data = { medicationList: [] },
		error: fetchingError,
		loading: fetchingLoading,
		refetch,
	} = useQuery(FETCH_ALL, {
		variables: {},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});

	const onSaveForm = useCallback(() => {
		const treatment = {
			prescription: {
				medicationList: medFormValues
					? medFormValues.map((e) => ({
							medicationId: parseInt(e.name),
							quantity: parseInt(e.value),
					  }))
					: model.treatment
					? model.treatment.prescription.medicationList.map((e) => ({
							medicationId: parseInt(e.medication.id),
							quantity: parseInt(e.quantity),
					  }))
					: [],
			},
			treatmentGuide: medGuideValues
				? medGuideValues
				: model.treatment
				? model.treatment.treatmentGuide
				: "",
		};
		const diagnoseFormValid = diagnoseFormValues
			? diagnoseFormValues
			: {
					preDiagnosis: model.preDiagnosis,
					impDiagnosis: model.impDiagnosis,
			  };

		const blFormValid = bloodFormValues
			? bloodFormValues
			: model.testcase
					.filter((e) => e.basicTest.testType === TEST_TYPE.BLOOD)
					.map((e) => ({
						name: e.basicTest.id,
						content: e.basicTest.testName,
						type: "input",
						value: e.result,
					}));

		const otherFormValid = otherFormValues
			? otherFormValues
			: model.testcase
					.filter((e) => e.basicTest.testType === TEST_TYPE.OTHER)
					.map((e) => ({
						name: e.basicTest.id,
						content: e.basicTest.testName,
						type: "input",
						value: e.result,
					}));
		const testcaseValues = [...blFormValid, ...otherFormValid].map((e) => ({
			result: e.value,
			basicTestId: parseInt(e.name),
		}));
		const vari = {
			examinationId: parseInt(model.id),
			examinationInfo: {
				testcase: testcaseValues,
				...diagnoseFormValid,
				treatment: treatment,
			},
			segmentId: currentStepOfDiagnose + 1,
		};
		console.log("variables sent to sv : ", {
			examinationId: parseInt(model.id),
			examinationInfo: {
				testcase: testcaseValues,
				...diagnoseFormValid,
				treatment: treatment,
			},
			segmentId: currentStepOfDiagnose + 1,
		});

		updateExamination({
			variables: {
				examinationId: parseInt(model.id),
				examinationInfo: {
					testcase: testcaseValues,
					...diagnoseFormValid,
					treatment: treatment,
				},
				segmentId: currentStepOfDiagnose + 1,
			},
			update: (proxy, mutationResult) => {
				if (mutationResult.errors) {
					message.error(mutationResult.errors[0].message);
				} else {
					switch (currentStepOfDiagnose) {
						case 0:
							message.success(
								"Sửa thông tin bệnh án phần xét nghiệm thành công!"
							);
							break;
						case 1:
							message.success(
								"Sửa thông tin bệnh án phần chẩn đoán thành công!"
							);
							break;
						case 2:
							message.success(
								"Sửa thông tin bệnh án phần điều trị thành công!"
							);
							break;
						default:
							message.success(
								"Sửa thông tin bệnh án thành công!"
							);
							break;
					}
				}
				dataRefresh();
			},
		});
	}, [
		bloodFormValues,
		otherFormValues,
		medFormValues,
		medGuideValues,
		diagnoseFormValues,
		currentStepOfDiagnose,
	]);

	const handleSubmit = (formValues) => {
		onSubmit(formValues);
	};

	return (
		<Modal
			title={FORM_NAME[mode]}
			visible={mode !== FORM_MODE.NONE}
			destroyOnClose
			footer={null}
			width={600}
			onCancel={onCancel}
		>
			<div className="step-area">
				<Steps current={currentStepOfDiagnose}>
					{DIAGNOSE_STEP.map((item) => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
			</div>
			<div>
				{currentStepOfDiagnose === 0 && (
					<ClinicalForm
						testcase={model.testcase}
						onChangeBloodForm={setBloodFormValues}
						onChangeOtherForm={setOtherFormValues}
					/>
				)}
				{currentStepOfDiagnose === 1 && (
					<DiagnoseForm
						model={model}
						onChange={setDiagnoseFormValues}
					/>
				)}
				{currentStepOfDiagnose === 2 && (
					<TreatmentForm
						model={model.treatment}
						onChangeMedForm={setMedFormValues}
						onChangeMedGuide={setMedGuideValues}
						medicationList={data.medicationList}
					/>
				)}

				<div className="footer-button-area">
					<div>{/* <Button>
							Left
						</Button> */}</div>
					<div>
						{currentStepOfDiagnose !== 0 && (
							<Button
								type="primary"
								icon={
									<ArrowLeftOutlined className="button-icon" />
								}
								className="button-action"
								onClick={handleClickPrevBtn}
							>
								{" "}
								Trước{" "}
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
								Tiếp{" "}
							</Button>
						)}
					</div>
					<div>
						<Button
							type="primary"
							icon={<SaveOutlined className="button-icon" />}
							className="button-action"
							onClick={onSaveForm}
						>
							{" "}
							Save{" "}
						</Button>
					</div>
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
