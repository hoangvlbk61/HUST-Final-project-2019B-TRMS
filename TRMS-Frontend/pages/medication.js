/** @format */
import withData from "../lib/withData";
import Medication from "../components/Medication";
import { withAuthSync } from "../unities/auth";

const MedicationPage = withData(() => {
	return <Medication />;
});

export default withAuthSync(MedicationPage);
