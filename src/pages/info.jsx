import DesktopPageLayout from '@/layouts/DesktopPage.layout';
import MobilePageLayout from '@/layouts/MobilePage.layout';
import RouterGuard from '@/layouts/components/RouterGuard';
import { UserInfo } from '@/contexts/user';
import request from '@/utils/request';
import { useLoading } from '@/contexts/loading';
import { useRouter } from 'next/router'

import { Button, Grid, Card, Typography, Modal } from 'antd';
const { Text, Title } = Typography;
const { useBreakpoint } = Grid;
import styleAccount from '@/assets/AccountInfo.module.css';
import Image from 'next/image';
import title_account from '../configs/title_account.js'
import { useMediaQuery } from '@/hooks/useMediaQuery.jsx';
import title from '@/configs/title'

export default function InfoPage() {
	const screen = useBreakpoint();
	return screen.md ? (
		<RouterGuard>
			<DesktopPageLayout title={title.Qinfo}>
				<AccountInfo />
			</DesktopPageLayout>
		</RouterGuard>

	) : (
		<RouterGuard>
			<MobilePageLayout title={title.Qinfo}>
				<AccountInfo />
			</MobilePageLayout>
		</RouterGuard>
	);
}

function AccountInfo() {
	const { showLoading, hideLoading } = useLoading();
	const { user, setUser } = UserInfo();
	const router = useRouter();
	const minW768 = useMediaQuery('(min-width:768px)');

	const account_info = [
		{ text: user.name, icon: '/images/icon_name.svg' },
		{ text: user.gender, icon: '/images/icon_gender.svg' },
		{ text: user.id_card, icon: '/images/icon_uid.svg' },
		{ text: user.phone, icon: '/images/icon_phone.svg' },
		{ text: user.address, icon: '/images/icon_address.svg' },
	];

	const logout = function () {
		showLoading();
		request.get("/logout").then(function () {
			hideLoading();
			setUser(null);
			router.push("/login");
		}).catch(function (error) {
			console.log(error);
			hideLoading();
			Modal.error({
				title: 'Lấy thông tin thất bại',
				content: 'Có lỗi xảy ra, xin vui lòng thử lại sau ít phút',
				okText: 'Xác nhận',
			})
			// self.$ons.notification.alert("Lỗi hệ thống");
		});
	}

	return (
		<>
			<Card style={{
				width: "100%",
				borderRadius: "16px",
				boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
				marginBottom: "30px",
				maxWidth: '375px',
				marginLeft: "auto",
				marginRight: "auto",
				paddingLeft: minW768 ? "36.5px" : "",
				paddingRight: minW768 ? "36.5px" : "",
			}}>
				<div
					style={{
						textAlign: 'center',
					}}
				>
					<Image
						priority
						src="/images/account_img.svg"
						width={88.4}
						height={88.4}
						alt=""
					/>
				</div>
				<div
					style={{
						textAlign: 'center',
						marginTop: '20px',
						marginBottom: '12px',
					}}
				>
					<Title
						style={{
							fontWeight: '700',
							fontFamily: 'Montserrat',
							fontSize: '14px',
							color: 'rgba(0, 0, 0, 0.85)',
						}}
					>
						{title_account.title}
					</Title>
				</div>
				{account_info.map((item, index) => (
					<AccountItem key={index} text={item.text} icon={item.icon} />
				))}
				<div style={{
					textAlign: 'center',
				}}>
					<Button onClick={logout} className={styleAccount.btn_logout} >
						{title_account.button_logout}
					</Button>
				</div>
			</Card>
		</>
	);
}
function AccountItem({ text, icon }) {
	return (
		<div
			style={{
				display: 'flex',
				paddingBottom: '8px',
			}}
		>
			<Image priority src={icon} width={38} height={40} alt="" />
			<Text
				style={{
					height: '40px',
					lineHeight: '40px',
					paddingLeft: '12px',
					fontSize: '14px',
					color: 'rgba(0, 0, 0, 0.85)',
				}}
			>
				{text}
			</Text>
		</div>
	);
}
