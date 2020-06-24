import { combineReducers } from "redux";
import medicationReducer from "./reducer/medication";
import loadingReducer from "./reducer/loading";

const reducer = combineReducers({
    medication: medicationReducer,
    loading: loadingReducer,
});

export default reducer;