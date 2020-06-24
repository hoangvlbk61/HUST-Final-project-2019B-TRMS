/** @format */

import { put, takeLatest, call } from "redux-saga/effects";
import { MEDICATION_REDUX_TYPE } from "../../const/redux-type";
import { useLazyQuery } from "@apollo/react-hooks";
import { FETCH_ALL } from "../../const/gql/medication";


const _fetch = function* ({ payload }) {
	const { data, error, loading } = useLazyQuery(FETCH_ALL, {
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});
	console.log(" gql data", data);
	yield put({
		type: MEDICATION_REDUX_TYPE.RECV_DATA,
		payload: {
			type: "medications",
			data: ["med1 ", "med2 "],
		},
	});
};

export default function* () {
	yield takeLatest(MEDICATION_REDUX_TYPE.FETCH, _fetch);
}
