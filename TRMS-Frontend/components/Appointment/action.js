/** @format */

import { APPOINTMENT_REDUX_TYPE } from "../../const/redux-type";

export const appointmentFetch = () => ({
	type: APPOINTMENT_REDUX_TYPE.FETCH,
});

export const appointmentCreate = (payload) => ({
	type: APPOINTMENT_REDUX_TYPE.CREATE,
	payload: payload,
});

export const appointmentUpdate = (payload) => ({
	type: APPOINTMENT_REDUX_TYPE.UPDATE,
	payload: payload,
});

export const appointmentDelete = (id) => ({
	type: APPOINTMENT_REDUX_TYPE.DELETE,
	payload: {
		id,
	},
});

export const appointmentDetail = (id) => ({
	type: APPOINTMENT_REDUX_TYPE.DELETE,
	payload: {
		id,
	},
});
