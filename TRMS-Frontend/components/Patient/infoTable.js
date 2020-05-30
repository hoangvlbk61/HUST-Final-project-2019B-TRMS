/** @format */

import { Card, Table, Button } from "antd";
import PropTypes from "prop-types";
import { DataTableFrame } from "../styles/DataTable";
import { Trash, Edit } from "react-feather";
import "../styles/tableStyle.less";
import { useCallback } from "react";

const defaultIconSize = 20;
const defaultIconColor = "white";
const defaultActionBtnSize = "default";

const InfoTable = ({ showEditAction, showDeleteAction, dataSource }) => {
	const handleClickEdit = (record) => () => {
		console.log("somethings");
		showEditAction(record);
	};
	const handleClickDelete = useCallback((record) => () =>
		showDeleteAction(record)
	);

	return (
		<Table
			dataSource={dataSource}
			columns={[
				{
					title: "Bệnh nhân",
					dataIndex: "name",
					key: "name",
				},
				{
					title: "Tuổi",
					dataIndex: "age",
					key: "age",
				},
				{
					title: "Giới tính",
					dataIndex: "gender",
					key: "gender",
				},
				{
					title: "Nghề nghiệp",
					dataIndex: "occupation",
					key: "occupation",
				},
				{
					title: "Địa chỉ",
					dataIndex: "address",
					key: "address",
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
								onClick={handleClickDelete}
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
