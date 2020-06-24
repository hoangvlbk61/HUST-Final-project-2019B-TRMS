/** @format */

import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Modal, Button, Spin, message } from "antd";
import { DataTableFrame } from "../styles/DataTable";
import AppointmentForm from "./form";
import { FORM_MODE } from "../../const/componentConst";
import InforTable from "./infoTable";
import {
	ExclamationCircleOutlined,
	UnorderedListOutlined,
	CalendarOutlined,
} from "@ant-design/icons";
import CalendarGrid from "./calendarGrid";
// CSS
import "./style.less";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CALENDAR_MODE } from "./const";
import {
	FETCH_ALL_AS_DOCTOR,
	FETCH_ALL_AS_DOCTOR_BY_DAY,
	DELETE,
} from "../../const/gql/appointment";
import moment from "moment";

const { confirm } = Modal;

const defaultModel = {
	id: "",
	doctorId: "",
	patientId: "",
	time: "",
	address: "",
	status: "",
	treatmentId: "",
};

function AppointmentManagement({
	appointmentCreate,
	appointmentDelete,
	appointmentDetail,
	appointmentFetch,
	appointmentUpdate,
}) {
	const [model, setModel] = useState(defaultModel);
	const [formMode, setFormMode] = useState(FORM_MODE.NONE);
	const [calendarMode, setCalendarMode] = useState(CALENDAR_MODE.LIST);
	const [dayPicker, setDayPicker] = useState(
		moment().locale("vi").format("YYYY-MM-DD")
	);

	const [
		deleteAppointment,
		{ loading: deleteLoading, error: deleteError },
	] = useMutation(DELETE);

	const handleChangeMode = useCallback(
		(mode) => {
			setCalendarMode(mode);
		},
		[calendarMode]
	);

	const user =
		typeof localStorage == "undefined"
			? { doctors: { id: 0 } }
			: JSON.parse(localStorage.getItem("user"));

	const {
		data = { appointmentListAllDoctor: [] },
		error: fetchingError,
		loading,
		refetch,
	} = useQuery(FETCH_ALL_AS_DOCTOR, {
		variables: {
			doctorId: user.doctors.id,
		},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});

	const {
		data: appointmentListDoctorByDayData = {
			appointmentListAllDoctorByDay: [],
		},
		error: fetchingAllDoctorByDayError,
		loading: loadingAllDoctorByDay,
		refetch: refetchByDay,
	} = useQuery(FETCH_ALL_AS_DOCTOR_BY_DAY, {
		variables: {
			doctorId: user.doctors.id,
			fromDate: moment(dayPicker).startOf("day").format("YYYY-MM-DD"),
			toDate: moment(dayPicker)
				.add(1, "days")
				.startOf("day")
				.format("YYYY-MM-DD"),
		},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});

	useEffect(() => {
		refetchByDay();
	}, [dayPicker]);

	const dataSource = data.appointmentListAllDoctor.map((e) => ({
		...e,
		key: e.id,
	}));

	const showDeleteModal = (apm) => {
		
		confirm({
			title: "Xác nhận?",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn xóa loại thuốc này",
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				deleteAppointment({
					variables: { appointmentId: parseInt(apm.id) },
					update: (proxy, mutationResult) => {
						if (
							mutationResult.data.createAppointment &&
							mutationResult.data.createAppointment.ok
						) {
							message.success(
								`Xóa cuộc hẹn lúc ${moment(apm.time)
									.locale("vi")
									.format("HH:MM")} ngày ${moment(apm.time)
									.locale("vi")
									.format("YYYY-MM-DD")} thành công!`
							);
						} else {
							message.error(mutationResult.errors[0].message);
						}
						refetch();
						refetchByDay();
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
		console.log("click Edit ");

		setFormMode(FORM_MODE.UPDATE);
		setModel(record);
	};
	const showDeleteForm = (record) => {
		showDeleteModal(record);
		// setFormMode(FORM_MODE.DELETE);
		// setModel(record);
	};

	const handleSubmit = (formValues) => {
		// process formValues
		switch (formMode) {
			case FORM_MODE.REGISTER:
				appointmentCreate(formValues);
				break;
			case FORM_MODE.UPDATE:
				appointmentUpdate(formValues);
				break;
			default:
				break;
		}
	};
	return (
		<Spin
			tip="Loading..."
			size="large"
			spinning={loading || loadingAllDoctorByDay || deleteLoading}
		>
			<Card
				title={
					<div className="card-title">
						Quản lý cuộc hẹn
						<div className="icon-area">
							<Button
								type={
									calendarMode === CALENDAR_MODE.LIST
										? "primary"
										: "default"
								}
								shape="round"
								icon={
									<UnorderedListOutlined className="icon-btn" />
								}
								className="button-action"
								onClick={() =>
									handleChangeMode(CALENDAR_MODE.LIST)
								}
							/>
							<Button
								type={
									calendarMode === CALENDAR_MODE.GRID
										? "primary"
										: "default"
								}
								shape="round"
								icon={<CalendarOutlined className="icon-btn" />}
								className="button-action"
								onClick={() =>
									handleChangeMode(CALENDAR_MODE.GRID)
								}
							/>
						</div>
					</div>
				}
				extra={<a onClick={() => showRegisterForm()}>Thêm</a>}
			>
				<AppointmentForm
					mode={formMode}
					model={model}
					onCancel={hideForm}
					onSubmit={handleSubmit}
					refetch={refetch}
					refetchByDay={refetchByDay}
				/>
				<DataTableFrame>
					{calendarMode === CALENDAR_MODE.LIST && (
						<InforTable
							showEditAction={showUpdateForm}
							showDeleteAction={showDeleteForm}
							dataSource={dataSource}
						/>
					)}
					{calendarMode === CALENDAR_MODE.GRID && (
						<CalendarGrid
							onChangeDayPicker={setDayPicker}
							appointmentList={
								appointmentListDoctorByDayData.appointmentListAllDoctorByDay
							}
						/>
					)}
				</DataTableFrame>
			</Card>
		</Spin>
	);
}

AppointmentManagement.propTypes = {};

export default AppointmentManagement;
