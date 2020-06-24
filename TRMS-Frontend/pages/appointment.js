/** @format */

import Appointment from "../components/Appointment";
import withData from "../lib/withData";
import { withAuthSync } from "../unities/auth";

const AppointmentPage = withData(() => <Appointment />);

export default withAuthSync(AppointmentPage);
