/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Button, Modal, Select } from "antd";
import { FORM_MODE } from "../../const/componentConst";
import "./formStyle.less";

const FORM_NAME = {
	REGISTER: "Thêm mới bệnh nhân",
	UPDATE: "Sửa thông tin bệnh nhân",
	DELETE: "Xóa bệnh nhân",
	DETAIL: "Thông tin bệnh nhân",
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
	required: "${label} không được để trống!",
	types: {
		email: "${label} không là email hợp lệ!",
		number: "${label} không là số hợp lệ!",
	},
	number: {
		range: "${label} phải nằm trong khoảng ${min} và ${max}",
	},
};

const form = ({ mode = "NONE", model, onSubmit, onCancel }) => {
	console.log("modelmodel: ", model);

	const onFinish = (values) => {
		if (mode === FORM_MODE.REGISTER)
			onSubmit({
				...values,
				ssid: values.ssid.toString(),
			});
		else if (mode === FORM_MODE.UPDATE)
			onSubmit({
				...values,
				ssid: values.ssid.toString(),
				patientId: parseInt(model.id),
			});

		onCancel();
	};

	const handleOk = (e) => {
		// console.log(e);
	};

	const handleCancel = (e) => {
		onCancel();
	};
	return (
		<Modal
			title={FORM_NAME[mode]}
			visible={mode !== FORM_MODE.NONE}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose
			footer={null}
			className
		>
			<Form
				{...layout}
				name="nest-messages"
				onFinish={onFinish}
				validateMessages={validateMessages}
				initialValues={{ ...model, ssid: parseInt(model.ssid) }}
				className={"form-input"}
			>
				<Form.Item
					name={"name"}
					label="Tên"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name={"gender"} label="Giới tính">
					<Select>
						<Select.Option value="Nam" key="male">
							{" "}
							Nam{" "}
						</Select.Option>
						<Select.Option value="Nữ" key="femail">
							{" "}
							Nữ{" "}
						</Select.Option>
						<Select.Option value="Khác" key="ohter">
							{" "}
							Khác{" "}
						</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					name={"ssid"}
					label="CMT / CCCD"
					rules={[
						{
							required: true,
							type: "number",
							min: 0,
							max: 999999999999,
						},
					]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item
					name={"age"}
					label="Tuổi"
					rules={[
						{
							type: "number",
							min: 0,
							max: 160,
						},
					]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item name={"address"} label="Địa chỉ">
					<Input />
				</Form.Item>
				<Form.Item name={"contact"} label="Liên lạc người thân">
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
