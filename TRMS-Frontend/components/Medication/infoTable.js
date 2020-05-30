/** @format */

import { Card, Table, Button } from "antd";
import PropTypes from "prop-types";
import { DataTableFrame } from "../styles/DataTable";
import { Trash, Edit, CheckCircle, XCircle } from "react-feather";
import "../styles/tableStyle.less";

const defaultIconSize = 20;
const defaultIconColor = "white";
const defaultActionBtnSize = "default";

const InfoTable = ({ showEditAction, showDeleteAction, dataSource }) => {
	const handleClickEdit = (record) => () => {
		console.log("somethings");
		showEditAction(record);
	};
	const handleClickDelete = (record) => () => {
    showDeleteAction(record);
  };
	return (
		<Table
			dataSource={dataSource}
			columns={[
				{
					title: "Tên thuốc",
					dataIndex: "name",
					key: "name",
				},
				{
					title: "Số lượng",
					dataIndex: "quantity",
					key: "quantity",
				},
				{
					title: "Tên công ty sản xuất",
					dataIndex: "companyName",
					key: "companyName",
				},
				{
					title: "Mô tả",
					dataIndex: "description",
					key: "description",
				},
				{
					title: "Loại thuốc",
					dataIndex: "typeId",
					key: "typeId",
				},
				{
					title: "Được mua tự do",
					dataIndex: "isFreeBuy",
					key: "isFreeBuy",
					align: "center",
					render: (text, record) => {
						if (record.isFreeBuy)
							return (
								<CheckCircle
									color={"#37d108"}
									size={defaultIconSize}
								/>
							);
						return (
							<AlertCircle
								color={"#ff3d44"}
								size={defaultIconSize}
							/>
						);
					},
				},
				{
					title: "Loại thuốc ổn định giá",
					dataIndex: "isFinedMedication",
					key: "isFinedMedication",
					align: "center",
					render: (text, record) => {
						if (record.isFinedMedication)
							return (
								<CheckCircle
									color={"#37d108"}
									size={defaultIconSize}
								/>
							);
						return (
							<XCircle color={"#ff3d44"} size={defaultIconSize} />
						);
					},
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
