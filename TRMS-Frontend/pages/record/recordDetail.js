/** @format */

import RecordDetail from "../../components/RecordDetail";
import withData from "../../lib/withData";
import { withAuthSync } from "../../unities/auth";

const RecordDetailPage = withData(() => <RecordDetail />);

export default withAuthSync(RecordDetailPage);
