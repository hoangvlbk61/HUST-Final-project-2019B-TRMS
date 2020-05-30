/** @format */

import styled from "styled-components";

const DataTableFrame = styled.div`
	@media only screen and (max-height: 1024px) {
		height: calc(85vh - 50px);
	}
	@media only screen and (max-height: 768px) {
		height: calc(100vh - 190px);
	}
`;

const DataTableFrameActionBtnFrame = styled.div`
	height: 60px;
	width: inherit;
	padding: 5px;
	display: flex;
	align-item: space-between;
	text-align: center;
`;

export { DataTableFrame, DataTableFrameActionBtnFrame };
