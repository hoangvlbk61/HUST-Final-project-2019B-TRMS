/** @format */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Calendar, Timeline } from "antd";
import moment from "moment";
import { APPOINTMENT_STATUS } from "../../const/componentConst";
const { Item } = Timeline;

const CalendarGrid = ({ onChangeDayPicker, appointmentList }) => {
	console.log("appointmentListappointmentList: ", appointmentList);
	const dateSource = appointmentList.map((e) => ({
		...e,
		key: e.id,
	}));

	const mappingApm = useCallback((apm) => {
		const { time } = apm;
		const viTime = moment(time).locale("vi");
		const tm = viTime.format("HH:mm");
		const dt = viTime.format("DD-MM-YYYY");
		let color = "green";
		if (moment(time) < moment()) {
			if (apm.status === "END") color = "gray";
			else if (apm.status === "WAITING") color = "red";
		}
		return (
			<Item color={color}>
				Gặp bệnh nhân {apm.patient.name} lúc {tm} ngày {dt} tại{" "}
				{apm.address} ({APPOINTMENT_STATUS[apm.status]})
			</Item>
		);
	}, []);
	return (
		<div className="grid-calendar">
			<div className="calendar-area">
				<Calendar fullscreen={false} onChange={onChangeDayPicker} />
			</div>
			<div className="timeline-area">
				<Timeline>{dateSource.map(mappingApm)}</Timeline>
			</div>
		</div>
	);
};

CalendarGrid.propTypes = {};

export default CalendarGrid;
