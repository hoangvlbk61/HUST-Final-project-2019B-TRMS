/** @format */

import { Input, Table, Button, Space } from "antd";
import Highlighter from 'react-highlight-words';
import PropTypes from "prop-types";
import { DataTableFrame } from "../styles/DataTable";
import { Trash, Edit } from "react-feather";
import { SearchOutlined } from "@ant-design/icons";
import "../styles/tableStyle.less";
import { useState, useRef } from "react";

const defaultIconSize = 20;
const defaultIconColor = "white";
const defaultActionBtnSize = "default";

const InfoTable = ({ showEditAction, showDeleteAction, dataSource }) => {
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
				},
				{
					title: "Tuổi",
					dataIndex: "age",
					key: "age",
					...getColumnSearchProps("age"),
				},
				{
					title: "Địa chỉ",
					dataIndex: "address",
					key: "address",
					...getColumnSearchProps("address"),
				},
				{
					title: "Trang thái cuộc hẹn",
					dataIndex: "apmStatus",
					key: "apmStatus",
					...getColumnSearchProps("apmStatus"),
				},
				{
					title: "Thao tác",
					key: "action",
					render: (text, record) => (
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
