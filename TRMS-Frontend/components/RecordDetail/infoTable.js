/** @format */

import { Input, Table, Button, Space } from "antd";
import Highlighter from 'react-highlight-words';
import PropTypes from "prop-types";
import { SearchOutlined } from "@ant-design/icons";
import { Trash, Edit } from "react-feather";
import { useState, useRef } from "react";

import { DataTableFrame } from "../styles/DataTable";
import "../styles/tableStyle.less";
import moment from "moment";

const defaultIconSize = 20;
const defaultIconColor = "white";
const defaultActionBtnSize = "default";

const InfoTable = 	({ showEditAction, showDeleteAction, dataSource }) => {
	var searchInput = React.createRef(null);
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");

	const handleClickEdit = (examination) => () => {
		showEditAction(examination);
	};
	const handleClickDelete = (examination) => () => {
		showDeleteAction(examination);
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
					title: "Thời gian khám",
					dataIndex: "time",
					key: "time",
					...getColumnSearchProps("time"),
					render: (text, examination) => {
						return moment(text).locale("vi").format("HH giờ mm - Do MM YYYY")
					}
				},
				{
					title: "Trang thái khám",
					dataIndex: "status",
					key: "status",
					...getColumnSearchProps("status"),
				},
				{
					title: "Thao tác",
					key: "action",
					render: (text, examination) => (
						<span>
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
								onClick={handleClickEdit(examination)}
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
								onClick={handleClickDelete(examination)}
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
