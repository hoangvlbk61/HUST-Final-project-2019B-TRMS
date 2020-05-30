/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Calendar, Timeline } from "antd";

const { Item } = Timeline;

const CalendarGrid = (props) => {
	return (
		<div className="grid-calendar">
			<div className="calendar-area">
				<Calendar fullscreen={false} />
			</div>
			<div className="timeline-area">
				<Timeline>
					<Item color="green">Gặp bệnh nhân X lúc 16h20 ngày 2020-28-04 tại bệnh viện Y </Item>
					<Item color="green">Gặp bệnh nhân X lúc 15h20 ngày 2020-28-04 tại bệnh viện Y </Item>
					<Item color="red">Gặp bệnh nhân X lúc 14h20 ngày 2020-28-04 tại bệnh viện Y </Item>
					<Item color="gray">Gặp bệnh nhân X lúc 13h20 ngày 2020-28-04 tại bệnh viện Y </Item>
					<Item color="gray">Gặp bệnh nhân X lúc 10h20 ngày 2020-28-04 tại bệnh viện Y </Item>
					<Item color="gray">Gặp bệnh nhân X lúc 9h20 ngày 2020-28-04 tại bệnh viện Y </Item>
				</Timeline>
			</div>
		</div>
	);
};

CalendarGrid.propTypes = {};

export default CalendarGrid;
