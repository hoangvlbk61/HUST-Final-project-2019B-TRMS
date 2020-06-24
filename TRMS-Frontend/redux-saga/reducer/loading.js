/** @format */

import { LOADING, LOADING_STATUS } from "../../const/redux-type";

const loadingReducer = (state = true, action) => {
	switch (action.type) {
		case LOADING_STATUS.LOADING:
            return true;
		case LOADING_STATUS.DONE:
            return false;
		default:
			return true;
	}
};

export default loadingReducer;
