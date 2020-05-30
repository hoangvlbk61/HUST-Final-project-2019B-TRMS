/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Button, Modal } from "antd";
import { FORM_MODE } from "../../const/componentConst";

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

const form = ({ mode = "NONE", model, onSubmit, onCancel }) => {
	const onFinish = (values) => {
		console.log("Form Values: ", values);
		onCancel();
	};

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
			width={800}
		>
			<Form
				{...layout}
				name="nest-messages"
				onFinish={onFinish}
				validateMessages={validateMessages}
				initialValues={model}
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
					<Input />
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
					<InputNumber />
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
					<Input />
				</Form.Item>
				<Form.Item name={"address"} label="Địa chỉ cuộc hen">
					<Input.TextArea />
				</Form.Item>
				<Form.Item name={"status"} label="Trạng thái">
					<Input.TextArea />
				</Form.Item>
				<Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
					<Button type="primary" htmlType="submit">
						Lưu
					</Button>
				</Form.Item>
			</Form>
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
