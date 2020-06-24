/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Modal, message, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { DataTableFrame } from "../styles/DataTable";
import MedicationForm from "./form";
import { FORM_MODE } from "../../const/componentConst";
import InforTable from "./infoTable";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../../const/gql/medication";
const { confirm } = Modal;

const defaultModel = {
	companyName: "",
	description: "",
	isFinedMedication: false,
	isFreeBuy: true,
	medicationGuide: "",
	medicationType: "",
	name: "",
	notion: "",
	quantity: 0,
};

function MedicationManagement() {
	const [formMode, setFormMode] = useState(FORM_MODE.NONE);
	const [model, setModel] = useState(defaultModel);
	const [
		createMedication,
		{ loading: createLoading, error: createError },
	] = useMutation(CREATE);
	const [
		updateMedication,
		{ loading: updateLoading, error: updateError },
	] = useMutation(UPDATE);
	const [
		deleteMedication,
		{ loading: deleteLoading, error: deleteError },
	] = useMutation(DELETE);

	const {
		data = {},
		error: fetchingError,
		loading: fetchingLoading,
		refetch,
	} = useQuery(FETCH_ALL, {
		variables: {},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});
	useEffect(() => {
		let fetchErr = fetchingError ? `${fetchingError.message}` : null;
		let createErr = createError ? `${createError.message}` : null;
		let updateErr = updateError ? `${updateError.message}` : null;
		let deleteErr = deleteError ? `${deleteError.message}` : null;

		if (fetchErr) {
			message.error(fetchErr);
			fetchErr = null;
		}
		if (createErr) {
			message.error(createErr);
			createErr = null;
		}
		if (updateErr) {
			message.error(updateErr);
			updateErr = null;
		}
		if (deleteErr) {
			message.error(deleteErr);
			deleteErr = null;
		}
	}, [createError, fetchingError, updateError, deleteError]);

	const dataSource = ((data && data.medicationList) || []).map((e) => ({
		...e,
		key: e.id,
	}));

	const showDeleteModal = (record) => {
		confirm({
			title: "Xác nhận?",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn xóa loại thuốc này",
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				deleteMedication({
					variables: { medicationId: record.id },
					update: (proxy, mutationResult) => {
						message.success("Xóa thuốc thành công!");
						refetch();
					},
				});
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
		setFormMode(FORM_MODE.UPDATE);
		setModel(record);
	};
	const showDeleteForm = (record) => {
		showDeleteModal(record);
	};

	const handleSubmit = (formValues) => {
		// process formValues
		switch (formMode) {
			case FORM_MODE.REGISTER:
				createMedication({
					variables: { medicationInfo: formValues },
					update: (proxy, mutationResult) => {
						message.success("Thêm mới thuốc thành công!");
						refetch();
					},
				});
				break;
			case FORM_MODE.UPDATE:
				updateMedication({
					variables: {
						medicationId: formValues.medicationId,
						medicationInfo: {
							...formValues,
							medicationId: undefined,
						},
					},
					update: (proxy, mutationResult) => {
						message.success("Sửa thuốc thành công!");
						refetch();
					},
				});
				break;
			default:
				break;
		}
	};
	return (
		<Spin
			tip="Loading..."
			size="large"
			spinning={createLoading || fetchingLoading}
		>
			<Card
				title="Quản lý thuốc"
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
		</Spin>
	);
}

MedicationManagement.propTypes = {};

export default MedicationManagement;
