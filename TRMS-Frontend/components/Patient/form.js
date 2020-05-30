/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber, Button, Modal } from "antd";
import { FORM_MODE } from "../../const/componentConst";

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
		console.log(values);
	};

	const handleOk = (e) => {
		// console.log(e);
	};

	const handleCancel = (e) => {
		onCancel();
		// console.log(e);
	};

	console.log("recv model is : ", model);

	return (
		<Modal
			title={FORM_NAME[mode]}
			visible={mode !== FORM_MODE.NONE}
			onOk={handleOk}
			onCancel={handleCancel}
			destroyOnClose
			footer={null}
		>
			<Form
				{...layout}
				name="nest-messages"
				onFinish={onFinish}
				validateMessages={validateMessages}
				initialValues={model}
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
				<Form.Item
					name={"gender"}
					label="Giới tính"
					rules={[
						{
							type: "email",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name={"age"}
					label="Tuổi"
					rules={[
						{
							type: "number",
							min: 0,
							max: 99,
						},
					]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item name={"occupation"} label="Nghề nghiệp">
					<Input />
				</Form.Item>
				<Form.Item name={"address"} label="Địa chỉ">
					<Input />
				</Form.Item>
				<Form.Item name={"infomation"} label="Liên lạc người thân">
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
