/** @format */

import { Avatar, Badge, Layout, List, Menu } from "antd";
import {
	BarChart,
	Bell,
	ChevronsDown,
	Maximize,
	Minimize,
	Settings,
	Triangle,
	FilePlus,
	Activity,
	Clipboard,
	Users,
	Slash,
	Calendar
} from "react-feather";
import DashHeader, { Notification } from "./styles/Header";
import Link from "next/link";
import MockNotifications from "../demos/mock/notifications";
import { useAppState } from "./shared/AppProvider";
import { useState } from "react";
import "./styles/header.less";

const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = () => {
	const [state, dispatch] = useAppState();
	const [notifications] = useState(MockNotifications);
	return (
		<DashHeader>
			<Header>
				{state.mobile && (
					<a
						onClick={() => dispatch({ type: "mobileDrawer" })}
						className="trigger"
					>
						<BarChart size={20} strokeWidth={1} />
					</a>
				)}
				<Link href="/">
					<a className="brand">
						<FilePlus size={24} strokeWidth={1} />
						<strong className="mx-1 text-black">
							{state.name}
						</strong>
					</a>
				</Link>

				<Menu mode="horizontal" className="menu-divider">
					{!state.mobile && (
						<Menu.Item>
							<Link href="/record">
								<a className="header-icon-routes">
									{" "}
									<Clipboard size={20} /> Quản lý bệnh án
								</a>
							</Link>
						</Menu.Item>
					)}

					{!state.mobile && (
						<Menu.Item>
							<Link href="/patient">
								<a className="header-icon-routes">
									{" "}
									<Users size={20} /> Quản lý bệnh nhân
								</a>
							</Link>
						</Menu.Item>
					)}

					{!state.mobile && (
						<Menu.Item>
							<Link href="/medication">
								<a className="header-icon-routes">
									{" "}
									<Slash size={20} /> Quản lý thuốc
								</a>
							</Link>
						</Menu.Item>
					)}

					{!state.mobile && (
						<Menu.Item>
							<Link href="/appointment">
								<a className="header-icon-routes">
									{" "}
									<Calendar size={20} /> Quản lý cuộc hẹn
								</a>
							</Link>
						</Menu.Item>
					)}

					{state.mobile && (
						<SubMenu
							title={<ChevronsDown size={20} strokeWidth={1} />}
						>
							<Menu.Item>Calendar</Menu.Item>
							<Menu.Item>Messages</Menu.Item>
							<Menu.Item>Social</Menu.Item>
							<Menu.Item>Chat</Menu.Item>
						</SubMenu>
					)}
				</Menu>

				<span className="mr-auto" />

				<Menu mode="horizontal">
					{/* {!state.mobile && (
						<Menu.Item
							onClick={() => dispatch({ type: "fullscreen" })}
						>
							{!state.fullscreen ? (
								<Maximize size={20} strokeWidth={1} />
							) : (
								<Minimize size={20} strokeWidth={1} />
							)}
						</Menu.Item>
					)}
					<Menu.Item onClick={() => dispatch({ type: "options" })}>
						<Settings size={20} strokeWidth={1} />
					</Menu.Item> */}
					<SubMenu
						title={
							<Badge count={5}>
								<span className="submenu-title-wrapper">
									<Bell size={20} strokeWidth={1} />
								</span>
							</Badge>
						}
					>
						<Menu.Item
							className="p-0 bg-transparent"
							style={{ height: "auto" }}
						>
							<List
								className="header-notifications"
								itemLayout="horizontal"
								dataSource={notifications}
								footer={<div>5 Notifications</div>}
								renderItem={item => (
									<Notification>
										<List.Item>
											<List.Item.Meta
												avatar={item.avatar}
												title={
													<a href="javascript:;">
														{item.title}
													</a>
												}
												description={
													<small>
														{item.description}
													</small>
												}
											/>
										</List.Item>
									</Notification>
								)}
							/>
						</Menu.Item>
					</SubMenu>

					<SubMenu title={<Avatar src="/static/images/avatar.jpg" />}>
						<Menu.Item>Settings</Menu.Item>
						<Menu.Item>Profile</Menu.Item>
						<Menu.Item>Notifications</Menu.Item>
						<Menu.Divider />
						<Menu.Item>
							<Link href="https://one-readme.fusepx.com">
								<a>Help?</a>
							</Link>
						</Menu.Item>
						<Menu.Item>Signout</Menu.Item>
					</SubMenu>
				</Menu>
			</Header>
		</DashHeader>
	);
};

export default MainHeader;
