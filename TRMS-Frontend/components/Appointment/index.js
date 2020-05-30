/** @format */

import { connect } from "react-redux";
import AppointmentManagement from "./app";
import {
	appointmentCreate,
	appointmentDelete,
	appointmentDetail,
	appointmentFetch,
	appointmentUpdate
} from "./action";

const mapActionToProps = () => ({
	appointmentCreate,
	appointmentDelete,
	appointmentDetail,
	appointmentFetch,
	appointmentUpdate,
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapActionToProps)(AppointmentManagement);
