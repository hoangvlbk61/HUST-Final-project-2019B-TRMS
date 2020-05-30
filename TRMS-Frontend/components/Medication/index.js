/** @format */

import { connect } from "react-redux";
import MedicationManagement from "./app";
import {
	medicationCreate,
	medicationDelete,
	medicationDetail,
	medicationFetch,
	medicationUpdate,
} from "./action";

const mapActionToProps = () => ({
	medicationCreate,
	medicationDelete,
	medicationDetail,
	medicationFetch,
	medicationUpdate,
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapActionToProps)(MedicationManagement);
