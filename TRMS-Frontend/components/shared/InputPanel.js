/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import {
	Form,
	Input,
	Select,
	InputNumber,
	Button,
	Modal,
	Steps,
	Divider,
} from "antd";
import "../styles/input-panel-form.less";
const { Option } = Select;
const layout = {
	labelCol: {
		span: 12,
	},
	wrapperCol: {
		span: 24,
	},
};
const validateMessages = {
	required: "${label} cần được điền!",
	types: {
		email: "${label} không phải email hợp lệ!",
		number: "${label} không phải số hợp lệ!",
	},
	number: {
		range: "${label} phải nằm trong khoản ${min} và ${max}",
	},
};
const InputPanel = ({ title, childlist, onChange, initialValues }) => {

	const optionList = childlist.map((e) => ({
		name: e.name,
		content: e.content,
		value: "",
		type: e.type,
	}));

	const [inputList, setInputList] = useState(
		initialValues ? initialValues : []
	);
	
	const handleAddElm = () => {
		if (inputList.length < optionList.length)
			setInputList(
				[...inputList, { name: optionList[0].name, value: "" }].map(
					(e, i) => ({
						...e,
						key: i,
					})
				)
			);
	};

	const handleRemoveElm = (indx) => {
		const newInpElms = [
			...inputList.slice(0, indx),
			...inputList.slice(indx + 1),
		];
		setInputList(newInpElms);
		if (typeof onChange === "function") {
			onChange(newInpElms);
		}
	};

	const onChooseType = (type, indx) => {
		const newElements = { ...inputList[indx], name: type };
		const newInpElms = [
			...inputList.slice(0, indx),
			newElements,
			...inputList.slice(indx + 1),
		];
		setInputList(newInpElms);
		if (typeof onChange === "function") {
			onChange(newInpElms);
		}
	};

	const onChangeValue = (value, indx) => {
		const newElements = { ...inputList[indx], value };
		const newInpElms = [
			...inputList.slice(0, indx),
			newElements,
			...inputList.slice(indx + 1),
		].map((e, idx) => ({ ...e, key: idx }));
		setInputList(newInpElms);
		if (typeof onChange === "function") {
			onChange(newInpElms);
		}
	};
	return (
		<Form
			{...layout}
			name="nest-messages"
			validateMessages={validateMessages}
			// initialValues={model}
			style={{ overflow: "auto", height: "480px" }}
			className="input-panel-in-form"
			style={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				flexFlow: "row wrap",
			}}
		>
			<div
				style={{
					fontSize: "18px",
					fontWeight: 600,
					marginLeft: "24px",
					marginBottom: "24px",
					width: "100%",
				}}
			>
				{title}{" "}
				<Button
					onClick={handleAddElm}
					icon={<PlusCircleFilled style={{ marginBottom: "5px" }} />}
				/>{" "}
			</div>
			{inputList.map((e, idx) => (
				<Form.Item
					name={"name"}
					key={idx}
					label={
						<Select
							value={inputList[idx].name || optionList[0].name}
							onChange={(changedVal) =>
								onChooseType(changedVal, idx)
							}
						>
							{optionList.map((opt) => (
								<Option value={opt.name} key={opt.name}>
									{" "}
									{opt.content}
								</Option>
							))}
						</Select>
					}
					rules={[
						{
							required: true,
						},
					]}
				>
					<div style={{ display: "flex" }}>
						<Input
							type=""
							onChange={(inputVal) =>
								onChangeValue(inputVal.target.value, idx)
							}
							value={inputList[idx].value || ""}
						/>
						<Button
							icon={
								<MinusCircleFilled
									style={{ marginBottom: "5px" }}
								/>
							}
							style={{ marginLeft: "5px" }}
							onClick={() => handleRemoveElm(idx)}
						/>{" "}
					</div>
				</Form.Item>
			))}
		</Form>
	);
};

InputPanel.propTypes = {
	title: PropTypes.string,
	childlist: PropTypes.array,
};

export default InputPanel;