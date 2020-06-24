/** @format */

import { all } from "redux-saga/effects";
import mediationSaga from "./saga/medication";

export default function* rootSaga() {
	yield all([mediationSaga()]);
}
