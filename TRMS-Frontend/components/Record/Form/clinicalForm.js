/** @format */

import React from "react";
import PropTypes from "prop-types";
import InputPanel from "../../shared/InputPanel";
import { Form, Input, InputNumber, Button, Modal, Steps, Divider } from "antd";

const ClinicalForm = (props) => {
	return (
		<div style={{ maxHeight: "400px", overflow: "auto" }}>
			<div className="treatment-step-title">
				<Divider>Khám sơ bộ</Divider>
			</div>
			<InputPanel
				title="Xét nghiệm máu"
				childlist={[
					{
						name: "blood",
						content: "Công thức máu",
						type: "input",
					},
					{
						name: "blood2",
						content: "Chức năng thận",
						type: "input",
					},
					{
						name: "blood3",
						content: "Chức năng gan",
						type: "input",
					},
					{
						name: "blood4",
						content: "Mỡ máu",
						type: "input",
					},
					{
						name: "blood5",
						content: "Viêm gan ",
						type: "input",
					},
					{
						name: "blood6",
						content: "Điện giải đồ",
						type: "input",
					},
				]}
			/>
			<InputPanel
				title="Xét nghiệm khác"
				childlist={[
					{
						name: "blood",
						content: "Nước tiểu",
						type: "input",
					},
					{
						name: "blood2",
						content: "X quang tim phổi",
						type: "input",
					},
					{
						name: "blood3",
						content: "Siêu âm ổ bụng",
						type: "input",
					},
					{
						name: "blood4",
						content: "Siêu âm tuyến giáp",
						type: "input",
					},
					{
						name: "blood5",
						content: "Điện tim đồ",
						type: "input",
					},
					{
						name: "blood6",
						content: "Hóc môn",
						type: "input",
					},
					{
						name: "blood7",
						content: "Ung thư sớm",
						type: "input",
					},
					{
						name: "blood8",
						content: "Vô sinh",
						type: "input",
					},
				]}
			/>
		</div>
	);
};

ClinicalForm.propTypes = {};

export default ClinicalForm;
