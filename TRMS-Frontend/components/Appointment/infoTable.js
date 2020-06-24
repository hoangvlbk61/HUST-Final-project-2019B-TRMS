/** @format */

import { Table, Button } from "antd";
import PropTypes from "prop-types";
import { Trash, Edit } from "react-feather";
import { APPOINTMENT_STATUS } from "../../const/componentConst";
import "../styles/tableStyle.less";
import moment from "moment";

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
					// dataIndex: "doctorId",
					key: "doctor",
					render: (text, record) => record.doctor.name,
				},
				{
					title: "Bệnh nhân",
					dataIndex: "patient",
					key: "patient",
					render: (text, record) => record.patient.name,
				},
				{
					title: "Thời gian hẹn",
					dataIndex: "time",
					key: "time",
					render: (text) => {
						return moment(text).locale("vi").fromNow();
					},
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
					render: (text) => APPOINTMENT_STATUS[text],
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
