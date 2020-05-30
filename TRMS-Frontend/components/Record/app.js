/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Modal } from "antd";
import { DataTableFrame } from "../styles/DataTable";
import RecordForm from "./form";
import { FORM_MODE } from "../../const/componentConst";
import InforTable from "./infoTable";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import InputPanel from "../shared/InputPanel";
const { confirm } = Modal;

const dataSource = [
	{
		key: "1",
		name: "Mike",
		age: 32,
		address: "10 Downing Street",
		apmStatus: "default",
	},
	{
		key: "2",
		name: "John",
		age: 42,
		address: "10 Downing Street",
		apmStatus: "danger",
	},
	{
		key: "3",
		name: "Gif cungx dc",
		age: 23,
		address: "Dia chi",
		apmStatus: "De dai",
	},
];

const defaultModel = {
	name: "",
	age: "",
	gender: "",
	occupation: "",
	address: "",
	infomation: "",
};

function RecordManagement({
	recordCreate,
	recordDelete,
	recordDetail,
	recordFetch,
	recordUpdate,
}) {
	const [formMode, setFormMode] = useState(FORM_MODE.NONE);
	const [model, setModel] = useState(defaultModel);

	// useEffect(() => {
	// 	recordFetch();
	// }, [recordFetch]);

	const showDeleteModal = () => {
		confirm({
			title: "Xác nhận?",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn xóa loại thuốc này",
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				recordDelete(model.id);
				console.log("OK");
			},
			onCancel() {
				console.log("Cancel");
			},
		});
	};

	const hideForm = () => {
		setModel(defaultModel);
		setFormMode(FORM_MODE.NONE);
	};

	const showRegisterForm = () => {
		setModel(defaultModel);
		setFormMode(FORM_MODE.REGISTER);
	};
	const showUpdateForm = (record) => {
		console.log("click Edit ");

		setFormMode(FORM_MODE.UPDATE);
		setModel(record);
	};
	const showDeleteForm = (record) => {
		console.log("LOGGGGGGGGGGG: ", record);
		showDeleteModal();
		// setFormMode(FORM_MODE.DELETE);
		// setModel(record);
	};

	const handleSubmit = (formValues) => {
		// process formValues
		switch (formMode) {
			case FORM_MODE.REGISTER:
				recordCreate(formValues);
				break;
			case FORM_MODE.UPDATE:
				recordUpdate(formValues);
				break;
			default:
				break;
		}
	};
	return (
		<Card
			title="Quản lý bệnh án "
			extra={<a onClick={() => showRegisterForm()}>Khám mới</a>}
		>
			<RecordForm
				mode={formMode}
				model={model}
				onCancel={hideForm}
				onSubmit={handleSubmit}
			/>
			<DataTableFrame>
				<InforTable
					showEditAction={showUpdateForm}
					showDeleteAction={showDeleteForm}
					dataSource={dataSource}
				/>
			</DataTableFrame>
		</Card>
	);
}

RecordManagement.propTypes = {};

export default RecordManagement;
