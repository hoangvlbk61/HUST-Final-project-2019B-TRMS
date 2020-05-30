/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Modal } from "antd";
import { DataTableFrame } from "../styles/DataTable";
import MedicationForm from "./form";
import { FORM_MODE } from "../../const/componentConst";
import InforTable from "./infoTable";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const dataSource = [
	{
		key: "1",
		name: "Thuốc an thân 1",
		quantity: 32142,
		companyName: "Cong ty dược 1",
		description: "Mô tả thuốc 1",
		medicationGuide: "uống sau bữa sáng",
		typeId: "Thuốc an thần",
		notion:
			"Không sử dụng cho trẻ em dưới 6 tuổi, phụ nữ có thai hoặc cho con bú",
		isFreeBuy: true,
		isFinedMedication: false,
	},
	{
		key: "2",
		name: "Thuốc an thân 2",
		quantity: 3224,
		companyName: "Công ty dược 2",
		description: "Mô tả thuốc 2",
		medicationGuide: "Uống sau bữa ăn",
		typeId: "Thuốc an thần",
		notion:
			"Không sử dụng cho trẻ em dưới 6 tuổi, phụ nữ có thai hoặc cho con bú",
		isFreeBuy: true,
		isFinedMedication: false,
	},
	{
		key: "3",
		name: "Thuốc an thân 3",
		quantity: 32122,
		companyName: "Dược HP",
		description: "Mô tả thuốc 3",
		medicationGuide: "Uống sau bữa tối ",
		typeId: "Thuốc an thần",
		notion:
			"Không sử dụng cho trẻ em dưới 6 tuổi, phụ nữ có thai hoặc cho con bú",
		isFreeBuy: true,
		isFinedMedication: false,
	},
	{
		key: "4",
		name: "Thuốc an thân 4",
		quantity: 32412,
		companyName: "Dược Yn",
		description: "Mô tả thuốc 4",
		medicationGuide: "UỐng khi đau bụng",
		typeId: "Thuốc an thần",
		notion:
			"Không sử dụng cho trẻ em dưới 6 tuổi, phụ nữ có thai hoặc cho con bú",
		isFreeBuy: true,
		isFinedMedication: false,
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

function MedicationManagement({
	medicationCreate,
	medicationDelete,
	medicationDetail,
	medicationFetch,
	medicationUpdate,
}) {
	const [formMode, setFormMode] = useState(FORM_MODE.NONE);
	const [model, setModel] = useState(defaultModel);

	// useEffect(() => {
	// 	medicationFetch();
	// }, [medicationFetch]);

	const showDeleteModal = () => {
		confirm({
			title: "Xác nhận?",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn xóa loại thuốc này",
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				medicationDelete(model.id);
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
				medicationCreate(formValues);
				break;
			case FORM_MODE.UPDATE:
				medicationUpdate(formValues);
				break;
			default:
				break;
		}
	};
	return (
		<Card
			title="Quản lý bệnh nhân"
			extra={<a onClick={() => showRegisterForm()}>Thêm</a>}
		>
			<MedicationForm
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

MedicationManagement.propTypes = {};

export default MedicationManagement;
