/** @format */

import { RECORD_DETAIL_REDUX_TYPE } from "../../const/redux-type";

export const recordFetch = () => ({
	type: RECORD_DETAIL_REDUX_TYPE.FETCH,
});

export const recordCreate = (payload) => ({
	type: RECORD_DETAIL_REDUX_TYPE.CREATE,
	payload: payload,
});

export const recordUpdate = (payload) => ({
	type: RECORD_DETAIL_REDUX_TYPE.UPDATE,
	payload: payload,
});

export const recordDelete = (id) => ({
	type: RECORD_DETAIL_REDUX_TYPE.DELETE,
	payload: {
		id,
	},
});

export const recordDetail = (id) => ({
	type: RECORD_DETAIL_REDUX_TYPE.DELETE,
	payload: {
		id,
	},
});
