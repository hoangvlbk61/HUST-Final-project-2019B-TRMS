/** @format */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
	Form,
	Input,
	InputNumber,
	Button,
	Modal,
	Spin,
	message,
	Select,
	DatePicker,
} from "antd";
import { FORM_MODE } from "../../const/componentConst";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_ALL as FETCH_ALL_DOCTOR } from "../../const/gql/doctor";
import { FETCH_ALL as FETCH_ALL_PATIENT } from "../../const/gql/patient";
import { CREATE, UPDATE, DELETE } from "../../const/gql/appointment";
import moment from "moment";
const FORM_NAME = {
	REGISTER: "Thêm mới cuộc hẹn",
	UPDATE: "Sửa thông tin cuộc hẹn",
	DELETE: "Xóa cuộc hẹn",
	DETAIL: "Thông tin cuộc hẹn",
	NONE: "",
};

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not validate email!",
		number: "${label} is not a validate number!",
	},
	number: {
		range: "${label} must be between ${min} and ${max}",
	},
};

const form = ({
	mode = FORM_MODE.NONE,
	model,
	onSubmit,
	onCancel,
	refetch,
	refetchByDay,
}) => {
	const [
		createAppointment,
		{ loading: createLoading, error: createError },
	] = useMutation(CREATE);
	const [
		updateAppointment,
		{ loading: updateLoading, error: updateError },
	] = useMutation(UPDATE);

	const {
		data: doctorData = { doctorList: [] },
		error: doctorError,
		loading: doctorLoading,
		refetch: refetchDoctor,
	} = useQuery(FETCH_ALL_DOCTOR, {
		variables: {},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});

	const {
		data: patientData = { patientList: [] },
		error: patientError,
		loading: patientLoading,
		refetch: refetchPatient,
	} = useQuery(FETCH_ALL_PATIENT, {
		variables: {},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});

	useEffect(() => {
		let fetchErr = doctorError ? `${doctorError.message}` : null;
		let createErr = patientError ? `${patientError.message}` : null;

		if (fetchErr) {
			message.error(fetchErr);
			fetchErr = null;
		}
		if (createErr) {
			message.error(createErr);
			createErr = null;
		}
	}, [doctorError, patientError]);

	const onFinish = (values) => {
		const validFormValues = {
			...values,
			time: values.time.toISOString(),
			doctorId: parseInt(values.doctorId),
			patientId: parseInt(values.patientId),
		};
		switch (mode) {
			case FORM_MODE.REGISTER:
				createAppointment({
					variables: { appointmentInfo: validFormValues },
					update: (proxy, mutationResult) => {
						if (
							mutationResult.data.createAppointment &&
							mutationResult.data.createAppointment.ok
						) {
							message.success("Thêm mới cuộc hẹn thành công!");
						} else {
							message.error(mutationResult.errors[0].message);
						}
						refetch();
						refetchByDay();
					},
				});
				break;
			case FORM_MODE.UPDATE:
				updateAppointment({
					variables: {
						appointmentId: parseInt(model.id),
						appointmentInfo: validFormValues,
					},
					update: (proxy, mutationResult) => {
						if (
							mutationResult.data.editAppointment &&
							mutationResult.data.editAppointment.ok
						) {
							message.success(
								"Sửa thông tin cuộc hẹn thành công!"
							);
						} else {
							message.error(mutationResult.errors[0].message);
						}
						refetch();
						refetchByDay();
					},
				});
				break;
			default:
				break;
		}
		onCancel();
	};

	const doctorSrc = (doctorData ? doctorData.doctorList : []).map((e) => ({
		...e,
		key: e.id,
	}));
	const patientSrc = (patientData
		? patientData.patientList
		: []
	).map((e) => ({ ...e, key: e.id }));

	const handleOk = (e) => {
		// console.log(e);
	};

	const handleCancel = (e) => {
		onCancel();
	};

	const handleSubmit = (formValues) => {
		onSubmit(formValues);
	};

	return (
		<Spin
			tip="Loading..."
			size="large"
			spinning={doctorLoading || patientLoading}
		>
			<Modal
				title={FORM_NAME[mode]}
				visible={mode !== FORM_MODE.NONE}
				onOk={handleOk}
				onCancel={handleCancel}
				destroyOnClose
				footer={null}
				width={800}
			>
				<Form
					{...layout}
					name="nest-messages"
					onFinish={onFinish}
					validateMessages={validateMessages}
					initialValues={{
						...model,
						time: model.time ? moment(model.time) : moment(),
						doctorId: model.doctor ? model.doctor.id : "",
						patientId: model.patient ? model.patient.id : "",
					}}
					style={{ overflow: "auto", height: "480px" }}
					onSubmit={handleSubmit}
				>
					<Form.Item
						name={"doctorId"}
						label="Bác sĩ"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select>
							{doctorSrc.map((e) => (
								<Select.Option value={e.id} key={e.id}>
									{e.position} {e.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name={"patientId"}
						label="Bệnh nhân"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select>
							{patientSrc.map((e) => (
								<Select.Option value={e.id} key={e.id}>
									{e.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name={"time"}
						label="Thời gian hẹn"
						rules={[
							{
								required: true,
							},
						]}
					>
						<DatePicker showTime />
					</Form.Item>
					<Form.Item name={"address"} label="Địa chỉ cuộc hen">
						<Input.TextArea />
					</Form.Item>
					<Form.Item name={"status"} label="Trạng thái">
						<Select>
							<Select.Option value={"WAITING"} key={"WAITING"}>
								Đang đợi
							</Select.Option>
							<Select.Option
								value={"HAPPENING"}
								key={"HAPPENING"}
							>
								Đang thực hiện
							</Select.Option>
							<Select.Option value={"END"} key={"END"}>
								Đã kết thúc
							</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
						<Button type="primary" htmlType="submit">
							Lưu
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</Spin>
	);
};

form.propTypes = {
	mode: PropTypes.string,
	model: PropTypes.object,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

export default form;
