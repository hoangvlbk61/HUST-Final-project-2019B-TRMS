/** @format */

import { connect } from "react-redux";
import RecordDetail from "./app";
import {
	recordCreate,
	recordDelete,
	recordDetail,
	recordFetch,
	recordUpdate,
} from "./action";

const mapActionToProps = () => ({
	recordCreate,
	recordDelete,
	recordDetail,
	recordFetch,
	recordUpdate,
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapActionToProps)(RecordDetail);
