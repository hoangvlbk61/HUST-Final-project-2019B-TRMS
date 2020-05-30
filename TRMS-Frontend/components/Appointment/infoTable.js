/** @format */

import { Table, Button } from "antd";
import PropTypes from "prop-types";
import { Trash, Edit } from "react-feather";
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
					title: "Bác sĩ",
					dataIndex: "doctorId",
					key: "doctorId",
				},
				{
					title: "Bệnh nhân",
					dataIndex: "patientId",
					key: "patientId",
				},
				{
					title: "Thời gian hẹn",
					dataIndex: "time",
					key: "time",
				},
				{
					title: "Địa chỉ",
					dataIndex: "address",
					key: "address",
				},
				{
					title: "Trạng thái",
					dataIndex: "status",
					key: "status",
				},
				{
					title: "Điều trị",
					dataIndex: "treatmentId",
					key: "treatmentId",
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
