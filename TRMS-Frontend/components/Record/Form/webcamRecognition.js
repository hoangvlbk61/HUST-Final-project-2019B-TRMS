/** @format */

import { Camera, Save, RefreshCcw } from "react-feather";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button, Modal, message, Spin } from "antd";
import Webcam from "react-webcam";
import "./webcam.less";
import { FACE_ADD_URL, FACE_RCN_URL } from "../../../const/url";
import { useRouter } from "next/router";
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
	const router = useRouter();
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

	const detect = () => {
		setLoading(true);
		var formData = new FormData();
		formData.append("image", imageSrc);
		formData.append("req_type", "CHECK");
		formData.append("username", isShow);
		fetch(FACE_RCN_URL, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((recogResult) => {
				setLoading(false);
				if (recogResult && recogResult.user_id) {
					message.success(
						`Nhận dạng thành công bệnh nhân có mã số: ${recogResult.user_id}`
					);
					setTimeout(() => {
						router.push({
							pathname: "/record/recordDetail",
							query: { recordId: recogResult.user_id },
						});
					}, 500);
				} else {
					message.error(
						"Không nhận dạng thành công bệnh nhân, xin mời chụp thêm ảnh!"
					);
				}
			});
	};

	return (
		<Modal
			title={"Nhận dạng bệnh nhân"}
			destroyOnClose
			footer={null}
			width={650}
			visible={isShow}
			onCancel={onCancel}
		>
			<Spin tip="Đang xử lý ..." size="large" spinning={isLoading}>
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
							onClick={detect}
						>
							Nhận diện
						</Button>
					)}
				</div>
			</Spin>
		</Modal>
	);
};
export default WebcamCapture;
