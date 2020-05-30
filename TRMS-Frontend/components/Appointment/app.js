/** @format */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, Modal, Button } from "antd";
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

import {CALENDAR_MODE} from "./const";
const { confirm } = Modal;
const dataSource = [
	{
		key: "1",
		id: "",
		doctorId: 32142,
		patientId: 32142,
		time: 1587313683907,
		address: "Phòng 502 Nhà B BV Đa Khoa Thái Nguyên",
		status: 0,
		treatmentId: 102948,
	},
	{
		key: "2",
		id: "",
		doctorId: 32142,
		patientId: 32142,
		time: 1587313683907,
		address: "Phòng 503 Nhà B BV Đa Khoa Thái Nguyên",
		status: 1,
		treatmentId: 221424221,
	},
	{
		key: "3",
		id: "",
		doctorId: 32142,
		patientId: 32142,
		time: 1587313683907,
		address: "Phòng 504 Nhà B BV Đa Khoa Thái Nguyên",
		status: 2,
		treatmentId: 12314212,
	},
];

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
	const [calendarMode, setCalendarMode ] = useState(CALENDAR_MODE.LIST);
	console.log("mode : ", calendarMode);
	
	const handleChangeMode = useCallback((mode) => { 
		setCalendarMode(mode);
	}, [calendarMode]);

	// useEffect(() => {
	// 	appointmentFetch();
	// }, [appointmentFetch]);

	const showDeleteModal = () => {
		confirm({
			title: "Xác nhận?",
			icon: <ExclamationCircleOutlined />,
			content: "Bạn có chắc muốn xóa loại thuốc này",
			okText: "Có",
			okType: "danger",
			cancelText: "Hủy",
			onOk() {
				appointmentDelete(model.id);
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
		<Card
			title={
				<div className="card-title">
					Quản lý cuộc hẹn
					<div className="icon-area">
						<Button
							type={calendarMode === CALENDAR_MODE.LIST ? "primary" : "default"}
							shape="round"
							icon={
								<UnorderedListOutlined className="icon-btn" />
							}
							className="button-action"
							onClick={() => handleChangeMode(CALENDAR_MODE.LIST)}
						/>
						<Button
							type={calendarMode === CALENDAR_MODE.GRID ? "primary" : "default"}
							shape="round"
							icon={<CalendarOutlined className="icon-btn" />}
							className="button-action"
							onClick={() => handleChangeMode(CALENDAR_MODE.GRID)}
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
			/>
			<DataTableFrame>
				{calendarMode === CALENDAR_MODE.LIST && <InforTable
					showEditAction={showUpdateForm}
					showDeleteAction={showDeleteForm}
					dataSource={dataSource}
				/>}
				{
					calendarMode === CALENDAR_MODE.GRID && <CalendarGrid />
				}
			</DataTableFrame>
		</Card>
	);
}

AppointmentManagement.propTypes = {};

export default AppointmentManagement;
