/** @format */

import { Camera, Save, RefreshCcw } from "react-feather";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, Modal, message, Spin } from "antd";
import Webcam from "react-webcam";
import "./webcam.less";
import { FACE_ADD_URL, FACE_RCN_URL } from "../../../const/url";
import router from "next/router";
// const videoConstraints = {
// 	width: 1280,
// 	height: 720,
// 	facingMode: "user",
// };

const defaultIconSize = 20;
const defaultIconColor = "white";
const defaultActionBtnSize = "default";

const WebcamCapture = ({ isShow, onCancel }) => {
	const webcamRef = useRef(null);
	const [isShowImage, setShowImage] = useState(false);
	const [imageSrc, setImageSrc] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => setLoading(false), 2000);
	}, []);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImageSrc(imageSrc);
		setShowImage(true);
	}, [webcamRef]);

	const reCapture = useCallback(() => {
		setShowImage(false);
		setLoading(true);
		setTimeout(() => setLoading(false), 1000);
	}, []);

	const save = () => {
		// console.log("recordId ", isShow);
		setLoading(true);
		var formData = new FormData();
		formData.append("image", imageSrc);
		formData.append("req_type", "ADD");
		formData.append("username", isShow);
		fetch(FACE_RCN_URL, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 200) {
					message.success(
						`Lưu ảnh mã bệnh án ${isShow} thành công !`
					);
				} else {
					message.error("Đã xảy ra lỗi !");
				}
			});
		setLoading(false);
	};

	return (
		<Modal
			title={"Ảnh bệnh nhân"}
			destroyOnClose
			footer={null}
			width={650}
			visible={!!parseInt(isShow)}
			onCancel={onCancel}
		>
			<Spin tip="Đang xử lý ảnh ..." size="large" spinning={isLoading}>
				{!isShowImage && (
					<Webcam
						audio={false}
						height={450}
						ref={webcamRef}
						screenshotFormat="image/jpeg"
						// width={1280}
						// videoConstraints={videoConstraints}
					/>
				)}

				{isShowImage && <img src={imageSrc} alt="Captured-pic" />}
				<div className="footer-webcam">
					{!isShowImage && (
						<Button
							type={"primary"}
							icon={
								<Camera
									color={defaultIconColor}
									size={defaultIconSize}
								/>
							}
							size={defaultActionBtnSize}
							className={"btn-action-style"}
							onClick={capture}
						>
							Chụp ảnh
						</Button>
					)}
					{isShowImage && (
						<Button
							type={"primary"}
							icon={
								<RefreshCcw
									color={defaultIconColor}
									size={defaultIconSize}
								/>
							}
							size={defaultActionBtnSize}
							className={"btn-action-style"}
							onClick={reCapture}
						>
							Chụp lại
						</Button>
					)}
					{isShowImage && (
						<Button
							type={"primary"}
							icon={
								<Camera
									color={defaultIconColor}
									size={defaultIconSize}
								/>
							}
							size={defaultActionBtnSize}
							className={"btn-action-style"}
							onClick={save}
						>
							Lưu ảnh
						</Button>
					)}
				</div>
			</Spin>
		</Modal>
	);
};
export default WebcamCapture;
