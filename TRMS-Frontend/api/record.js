/** @format */

import { RECORD_URL } from "../const/url";
import { errorHandler } from "../utils/apiHandler";
import axios from "axios";

const FETCH = "Fetch records ";
const CREATE = "Create new record ";
const UPDATE = "Update record ";
const DELETE = "Delete record ";
const DETAIL = "Get detail record ";

export const _fetch = () => {
	axios(RECORD_URL.FETCH)
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				return res.data;
			} else {
				return errorHandler(FETCH, res.code);
			}
		})
		.catch((err) => {
			throw new Error(err);
		});
};
export const _create = () => {
	axios(RECORD_URL.CREATE)
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				return res.data;
			} else {
				return errorHandler(CREATE, res.code);
			}
		})
		.catch((err) => {
			throw new Error(err);
		});
};
export const _update = () => {
	axios(RECORD_URL.UPDATE)
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				return res.data;
			} else {
				return errorHandler(UPDATE, res.code);
			}
		})
		.catch((err) => {
			throw new Error(err);
		});
};
export const _delete = () => {
	axios(RECORD_URL.DELETE)
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				return res.data;
			} else {
				return errorHandler(DELETE, res.code);
			}
		})
		.catch((err) => {
			throw new Error(err);
		});
};
export const _detail = () => {
	axios(RECORD_URL.DETAIL)
		.then((res) => res.json())
		.then((res) => {
			if (res.status) {
				return res.data;
			} else {
				return errorHandler(DETAIL, res.code);
			}
		})
		.catch((err) => {
			throw new Error(err);
		});
};
