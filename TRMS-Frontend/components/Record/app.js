/** @format */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { DataTableFrame } from "../styles/DataTable";
import RecordForm from "./form";
import { FORM_MODE } from "../../const/componentConst";
import InforTable from "./infoTable";
import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../../const/gql/record";
const { confirm } = Modal;

const defaultModel = {
	name: "",
	age: "",
	gender: "",
	address: "",
	infomation: "",
	ssid: 0
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
	const [
		createRecord,
		{ loading: createLoading, error: createError },
	] = useMutation(CREATE);
	const [
		updateRecord,
		{ loading: updateLoading, error: updateError },
	] = useMutation(UPDATE);
	const [
		deleteRecord,
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

	const dataSource = ((data && data.patientList) || []).map((e) => ({
		...e,
		key: e.id,
	}));
	console.log("dataSource: ", dataSource);
	
	const showDeleteModal = (record) => {
		confirm({
			title: "Xác nhận?",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn xóa bệnh án này ?",
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				deleteRecord({
					variables: { patientId: record.id },
					update: (proxy, mutationResult) => {
						message.success("Xóa bệnh án thành công!");
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
				createRecord({
					variables: { patientInfo: formValues },
					update: (proxy, mutationResult) => {
						console.log("Create result: ", mutationResult);
						
						message.success("Thêm mới bệnh nhân thành công!");
						refetch();
					},
				});
				break;
			case FORM_MODE.UPDATE:
				updateRecord({
					variables: {
						patientId: formValues.patientId,
						patientInfo: {
							...formValues,
							patientId: undefined,
						},
					},
					update: (proxy, mutationResult) => {
						message.success("Sửa thông tin bệnh nhân thành công!");
						refetch();
					},
				});
				break;
			default:
				break;
		}
	};
	return (
		<Card
			title="Quản lý bệnh án "
			extra={<a onClick={() => showRegisterForm()}>Thêm bệnh án</a>}
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
