/** @format */

import { MEDICATION_REDUX_TYPE } from "../../const/redux-type";

export const medicationFetch = () => ({
	type: MEDICATION_REDUX_TYPE.FETCH,
});

export const medicationCreate = (payload) => ({
	type: MEDICATION_REDUX_TYPE.CREATE,
	payload: payload,
});

export const medicationUpdate = (payload) => ({
	type: MEDICATION_REDUX_TYPE.UPDATE,
	payload: payload,
});

export const medicationDelete = (id) => ({
	type: MEDICATION_REDUX_TYPE.DELETE,
	payload: {
		id,
	},
});

export const medicationDetail = (id) => ({
	type: MEDICATION_REDUX_TYPE.DELETE,
	payload: {
		id,
	},
});
