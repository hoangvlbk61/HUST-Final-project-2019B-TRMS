/** @format */

import { MEDICATION_REDUX_TYPE } from "../../const/redux-type";

const medicationReducer = (state = {}, action) => {
	switch (action.type) {
		case MEDICATION_REDUX_TYPE.RECV_DATA:
            return {
                ...state, 
                [action.payload.type]: action.payload.data
            }
		default:
			return state;
	}
};

export default medicationReducer;
