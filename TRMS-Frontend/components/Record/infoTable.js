/** @format */

import { Input, Table, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import Link from "next/link";
import moment from "moment";
import { Trash, Edit, Camera } from "react-feather";
import { SearchOutlined } from "@ant-design/icons";

import { DataTableFrame } from "../styles/DataTable";
import "../styles/tableStyle.less";
import { APM_STATUS } from "../../const/componentConst";
const defaultIconSize = 20;
const defaultIconColor = "white";
const defaultActionBtnSize = "default";

const checkStatus = (apmArray) => {
	if (apmArray.length === 0) return APM_STATUS.NONE;
	const latestApm = apmArray[0];
	if (latestApm.status === "END") return APM_STATUS.END;
	return `${APM_STATUS.WAITING} ${moment(latestApm.time)
		.locale("vi")
		.fromNow()}`;
};

const InfoTable = ({ showEditAction, showDeleteAction, dataSource, showWebcam }) => {
	var searchInput = React.createRef(null);
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");

	const handleClickEdit = (record) => () => {
		console.log("somethings");
		showEditAction(record);
	};
	const handleClickDelete = (record) => () => {
		showDeleteAction(record);
	};

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys, confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
					>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{ color: filtered ? "#1890ff" : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.select());
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			),
	});

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText("");
	};

	return (
		<Table
			dataSource={dataSource}
			columns={[
				{
					title: "Bệnh nhân",
					dataIndex: "name",
					key: "name",
					...getColumnSearchProps("name"),
					render: (text, record) => (
						<Link
							href={{
								pathname: "/record/recordDetail",
								query: { recordId: record.key },
							}}
						>
							<a>{text}</a>
						</Link>
					),
				},
				{
					title: "SSID",
					dataIndex: "ssid",
					key: "ssid",
					...getColumnSearchProps("ssid"),
				},
				{
					title: "Địa chỉ",
					dataIndex: "address",
					key: "address",
					...getColumnSearchProps("address"),
				},
				{
					title: "Trang thái cuộc hẹn",
					key: "appointment",
					render: (text, record) => checkStatus(record.appointment),
					// ...getColumnSearchProps("appointment"),
				},
				{
					title: "Thao tác",
					key: "action",
					render: (text, record) => (
						<span>
							<Button
								type={"primary"}
								icon={
									<Camera
										color={defaultIconColor}
										size={defaultIconSize}
									/>
								}
								size={defaultActionBtnSize}
								className={"btn-action-style"}
								onClick={showWebcam(record.id)}
							/>
							<Button
								type={"primary"}
								icon={
									<Edit
										color={defaultIconColor}
										size={defaultIconSize}
									/>
								}
								size={defaultActionBtnSize}
								className={"btn-action-style"}
								onClick={handleClickEdit(record)}
							/>
							<Button
								type={"danger"}
								icon={
									<Trash
										color={defaultIconColor}
										size={defaultIconSize}
									/>
								}
								size={defaultActionBtnSize}
								className={"btn-action-style"}
								onClick={handleClickDelete(record)}
							/>
						</span>
					),
				},
			]}
		/>
	);
};

InfoTable.propTypes = {
	showEditAction: PropTypes.func,
	showDeleteAction: PropTypes.func,
	dataSource: PropTypes.array,
	columns: PropTypes.array,
};

export default InfoTable;
