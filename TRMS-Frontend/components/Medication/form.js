/** @format */

import React from "react";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import { Form, Input, InputNumber, Button, Modal, Switch } from "antd";
import { FORM_MODE } from "../../const/componentConst";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const FORM_NAME = {
	REGISTER: "Thêm mới thuốc",
	UPDATE: "Sửa thông tin thuốc",
	DELETE: "Xóa thuốc",
	DETAIL: "Thông tin thuốc",
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
					name={"name"}
					label="Tên thuốc"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name={"quantity"}
					label="Số lượng"
					rules={[
						{
							required: true,
						},
					]}
				>
					<InputNumber />
				</Form.Item>
				<Form.Item
					name={"companyName"}
					label="Công ty sản xuất"
					rules={[
						{
							required: true,
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item name={"description"} label="Mô tả">
					<Input.TextArea />
				</Form.Item>
				<Form.Item
					name={"medicationGuide"}
					label="Hướng dẫn sử dụng thuốc"
				>
					<Input.TextArea />
				</Form.Item>
				<Form.Item name={"typeId"} label="Loại thuốc">
					<Input />
				</Form.Item>
				<Form.Item name={"notion"} label="Lưu ý khi dùng">
					<Input.TextArea />
				</Form.Item>
				<Form.Item
					name={"isFreeBuy"}
					label="Được mua tự do"
					valuePropName="checked"
				>
					<Switch
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<CloseOutlined />}
					/>
				</Form.Item>
				<Form.Item
					name={"isFinedMedication"}
					label="Loại thuốc ổn định giá"
					valuePropName="checked"
				>
					<Switch
						checkedChildren={<CheckOutlined />}
						unCheckedChildren={<CloseOutlined />}
					/>
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
