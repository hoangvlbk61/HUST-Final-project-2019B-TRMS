/** @format */

import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Card, Modal, message } from "antd";
import {
	ExclamationCircleOutlined,
	QuestionCircleOutlined,
} from "@ant-design/icons";
import { useQuery, useMutation } from "@apollo/react-hooks";
import moment from "moment";

import { DataTableFrame } from "../styles/DataTable";
import RecordForm from "./Form/form";
import { FORM_MODE } from "../../const/componentConst";
import InforTable from "./infoTable";
import InputPanel from "../shared/InputPanel";
import {
	FETCH_AS_PATIENT,
	CREATE,
	UPDATE,
	DELETE,
} from "../../const/gql/examination";
const { confirm } = Modal;

const defaultModel = {
	status: "",
	time: new Date(Date.now()).toISOString(),
	testcase: [],
	preDiagnosis: "",
	impDiagnosis: "",
};

function RecordDetail({
	recordCreate,
	recordDelete,
	recordDetail,
	recordFetch,
	recordUpdate,
}) {
	const router = useRouter();
	const [formMode, setFormMode] = useState(FORM_MODE.NONE);
	const [model, setModel] = useState(defaultModel);
	const [recordId, setRecordId] = useState(null);
	

	useEffect(() => {
		setRecordId(router.query.recordId);
	}, []);

	const [
		createExamination,
		{ loading: createLoading, error: createError },
	] = useMutation(CREATE);

	const [
		deleteExamination,
		{ loading: deleteLoading, error: deleteError },
	] = useMutation(DELETE);
	const {
		data = {},
		error: fetchingError,
		loading: fetchingLoading,
		refetch,
	} = useQuery(FETCH_AS_PATIENT, {
		variables: {
			patientId: parseInt(router.query.recordId),
		},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});

	useEffect(() => {
		let fetchErr = fetchingError ? `${fetchingError.message}` : null;
		let createErr = createError ? `${createError.message}` : null;
		let deleteErr = deleteError ? `${deleteError.message}` : null;

		if (fetchErr) {
			message.error(fetchErr);
			fetchErr = null;
		}
		if (createErr) {
			message.error(createErr);
			createErr = null;
		}
		if (deleteErr) {
			message.error(deleteErr);
			deleteErr = null;
		}
	}, [createError, fetchingError, deleteError]);

	const dataSource = ((data && data.examinationListAllPatient) || []).map(
		(e) => ({
			...e,
			key: e.id,
		})
	);

	const showCreateConfirmModal = () => {
		confirm({
			title: "Xác nhận?",
			icon: <QuestionCircleOutlined />,
			content: `Bạn muốn khám mới cho bệnh nhân mã ${recordId} ?`,
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				createExamination({
					variables: {
						examinationInfo: {
							recordId: parseInt(recordId),
							time: new Date(Date.now()).toISOString(),
							status: "Đang khám",
						},
					},
					update: (proxy, mutationResult) => {
						console.log(
							"mutationResultmutationResult: ",
							mutationResult
						);

						if (
							mutationResult.data &&
							mutationResult.data.createExamination.ok
						) {
							setModel(
								mutationResult.data.createExamination
									.examination
							);
							message.success("Tạo mới lần khám thành công!");
						} else
							message.error(
								"Đã có lỗi xảy ra khi tạo mới lần khám!"
							);
						refetch();
					},
				});
				showRegisterForm();
			},
			onCancel() {
				return;
			},
		});
	};

	const showDeleteModal = (examination) => {
		const { time } = examination;
		const tm = moment(time).locale("vi").format("HH giờ mm");
		const dt = moment(time).locale("vi").format("Do MM YYYY");
		confirm({
			title: "Xác nhận?",
			icon: <ExclamationCircleOutlined />,
			content: `Bạn có chắc muốn xóa lần khám lúc ${tm} ngày ${dt}?`,
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				deleteExamination({
					variables: { examinationId: parseInt(examination.id) },
					update: (proxy, mutationResult) => {
						if (
							mutationResult.data &&
							mutationResult.data.deleteExamination.ok
						)
							message.success("Xóa lần khám thành công!");
						else
							message.error("Đã có lỗi xảy ra khi xóa lần khám!");
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
	const showUpdateForm = (examination) => {
		setFormMode(FORM_MODE.UPDATE);
		setModel(examination);
	};
	const showDeleteForm = (examination) => {
		showDeleteModal(examination);
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
			title={`Chi tiết bệnh án mã ${recordId}`}
			extra={<a onClick={() => showCreateConfirmModal()}>Khám mới</a>}
		>
			<RecordForm
				mode={formMode}
				model={model}
				onCancel={hideForm}
				onSubmit={handleSubmit}
				dataRefresh={refetch}
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

RecordDetail.propTypes = {};

export default RecordDetail;
