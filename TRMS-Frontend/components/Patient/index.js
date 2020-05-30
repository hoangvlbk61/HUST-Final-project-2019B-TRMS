/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Table, Button } from "antd";
import { DataTableFrame } from "../styles/DataTable";
import PatientForm from "./form";
import { FORM_MODE } from "../../const/componentConst";
import InforTable from "./infoTable";

const dataSource = [
	{
		key: "1",
		name: "Mike",
		age: 32,
		gender: "Male",
		occupation: "Worker",
		address: "10 Downing Street",
		infomation: "infomation of user1",
		apmStatus: "default",
	},
	{
		key: "2",
		name: "Mike2",
		age: 23,
		gender: "Female",
		occupation: "Engineer",
		address: "10 Downing Street",
		infomation: "infomation of user2",
		apmStatus: "default",
	},
	{
		key: "3",
		name: "Tyson",
		age: 55,
		gender: "Undefined",
		occupation: "Fighter",
		address: "10 Downing Street",
		infomation: "infomation of user3",
		apmStatus: "default",
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

function PatientManagement(props) {
	const [formMode, setFormMode] = useState(FORM_MODE.NONE);
	const [model, setModel] = useState(defaultModel);

	const hideForm = () => { 
		setModel(defaultModel);
		setFormMode(FORM_MODE.NONE);
	}

	const showRegisterForm = () => {
		setModel(defaultModel);
		setFormMode(FORM_MODE.REGISTER)
	};
	const showUpdateForm = (record) => {
		console.log("click Edit ");
		
		setFormMode(FORM_MODE.UPDATE);
		setModel(record);
	};
	const showDeleteForm = (record) => {
		setFormMode(FORM_MODE.DELETE);
		setModel(record);
	};
	return (
		<Card
			title="Quản lý bệnh nhân"
			extra={<a onClick={() => showRegisterForm()}>Thêm</a>}
		>
			<PatientForm mode={formMode} model={model} onCancel={hideForm}/>
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

PatientManagement.propTypes = {};

export default PatientManagement;
