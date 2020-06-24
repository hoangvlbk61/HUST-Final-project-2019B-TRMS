/** @format */

import React from "react";
import PropTypes from "prop-types";
import InputPanel from "../../shared/InputPanel";
import { Form, Input, InputNumber, Button, Modal, Steps, Divider } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { TEST_TYPE } from "../../../const/componentConst";
import { FETCH_ALL } from "../../../const/gql/basictest";

const ClinicalForm = ({ testcase, onChangeBloodForm, onChangeOtherForm }) => {
	const bloodTC = testcase
		.filter((e) => e.basicTest.testType === TEST_TYPE.BLOOD)
		.map((e) => ({
			name: e.basicTest.id,
			content: e.basicTest.testName,
			type: "input",
			value: e.result,
		}));
	const otherTC = testcase
		.filter((e) => e.basicTest.testType === TEST_TYPE.OTHER)
		.map((e) => ({
			name: e.basicTest.id,
			content: e.basicTest.testName,
			type: "input",
			value: e.result,
		}));
	const {
		data = { basictestList: [] },
		error: fetchingError,
		loading: fetchingLoading,
		refetch,
	} = useQuery(FETCH_ALL, {
		variables: {},
		fetchPolicy: "no-cache",
		notifyOnNetworkStatusChange: true,
	});
	const bloodTest = data.basictestList
		.filter((e) => e.testType === TEST_TYPE.BLOOD)
		.map((e) => ({
			name: e.id,
			content: e.testName,
			type: "input",
		}));
	const otherTest = data.basictestList
		.filter((e) => e.testType === TEST_TYPE.OTHER)
		.map((e) => ({
			name: e.id,
			content: e.testName,
			type: "input",
		}));

	return (
		<div style={{ maxHeight: "400px", overflow: "auto" }}>
			<div className="treatment-step-title">
				<Divider>Khám sơ bộ</Divider>
			</div>
			<InputPanel
				onChange={onChangeBloodForm}
				title="Xét nghiệm máu"
				childlist={bloodTest}
				initialValues={bloodTC}
			/>
			<InputPanel
				onChange={onChangeOtherForm}
				title="Xét nghiệm khác"
				childlist={otherTest}
				initialValues={otherTC}
			/>
		</div>
	);
};

ClinicalForm.propTypes = {};

export default ClinicalForm;
