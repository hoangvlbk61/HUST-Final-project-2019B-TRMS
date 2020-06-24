/** @format */

import Record from "../../components/Record";
import withData from "../../lib/withData";
import { withAuthSync } from "../../unities/auth";

const RecordPage = withData(() => <Record />);

export default withAuthSync(RecordPage);
