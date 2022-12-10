import { Grid, Col, Row } from 'antd';
import MobileHeader from '@/layouts/components/FormMobileHeader';
import DesktopHeader from '@/layouts/components/FormDesktopHeader';
import DesktopAdvPageLayout from '@/layouts/DesktopAdvPage.layout';
import Footer from '@/layouts/components/Footer';
import MobileAdvPageLayout from '@/layouts/MobileAdvPage.layout';
import LotteLogo from '@/assets/img/lotte.svg';
import RouterGuard from '@/layouts/components/RouterGuard';
import UserForm from '@/components/lottefinance/UserForm';
import * as Banner from '@/configs/banner_images';
import LotteBg from '@/assets/img/lotte_bg.png';
import Icon from '@/assets/img/lotte_icon.svg';

const { useBreakpoint } = Grid;

export default function InfoPage() {
	const screen = useBreakpoint();

	return screen.md ? (
		<RouterGuard>
			<DesktopAdvPageLayout title="Đăng kí Lotte Finance" bg={LotteBg.src}>
				<DesktopHeader logo={LotteLogo} banner={Banner.LotteBanner} bg="#E60039" icon={Icon} />

				<Row style={{ maxWidth: '375px', margin: '0 auto', width: '100%'}}>
					<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
						<h1 style={{ textAlign: 'center', marginTop: '8px', fontSize: '20px', fontWeight: 700, color: "#E60039" }}>Lotte Finance xin chào bạn</h1>
						<p style={{ fontSize: '14px' }}>Vui lòng kiểm tra các thông tin sau</p>

						<UserForm style={{ margin: '12px 0' }} />
					</Col>
				</Row>
				<Footer style={{ marginTop: 'auto'}} />
			</DesktopAdvPageLayout>
		</RouterGuard>
	) : (
		<RouterGuard>
			<MobileAdvPageLayout title="Đăng kí Lotte Finance">
				<MobileHeader logo={LotteLogo} banner={Banner.LotteBanner} icon={Icon} />
				<Row style={{ backgroundColor: '#ffffff' }}>
					<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
						<h1 style={{ textAlign: 'center', marginTop: '8.82px', fontSize:"16px", fontWeight: 700, color: "#E60039" }}>Lotte Finance xin chào các bạn</h1>
						<p style={{ fontSize: '14px' }}>Vui lòng kiểm tra các thông tin sau</p>

						<UserForm style={{ margin: '12px 0' }} />
					</Col>
				</Row>
			</MobileAdvPageLayout>
		</RouterGuard>
	);
}