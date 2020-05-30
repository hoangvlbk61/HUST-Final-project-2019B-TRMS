/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Card, Table, Button } from "antd";
import { DataTableFrame, DataTableFrameActionBtnFrame } from "../styles/DataTable";
import columns from "./coumnDefine";

RecordManagement.propTypes = {};
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
];

function RecordManagement(props) {
	return (
		<Card title="Quản lý bệnh án" extra={<a href="#">Thêm</a>}>
			<DataTableFrame>
				<Table dataSource={dataSource} columns={columns} />
			</DataTableFrame>
		</Card>
	);
}

export default RecordManagement;
