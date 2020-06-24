/** @format */

import Patient from "../components/Patient";
import withData from "../lib/withData";
import { withAuthSync } from "../unities/auth";

const PatientPage = withData(() => <Patient />);

export default withAuthSync(PatientPage);
