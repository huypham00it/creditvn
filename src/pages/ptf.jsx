import { Grid, Col, Row } from 'antd';

import MobileHeader from '@/layouts/components/FormMobileHeader';
import DesktopHeader from '@/layouts/components/FormDesktopHeader';
import DesktopAdvPageLayout from '@/layouts/DesktopAdvPage.layout';
import Footer from '@/layouts/components/Footer';
import MobileAdvPageLayout from '@/layouts/MobileAdvPage.layout';
import RouterGuard from '@/layouts/components/RouterGuard';
import UserForm from '@/components/ptf/UserForm';
import { UserInfo } from '@/contexts/user';
import data from '@/configs/ptf_page';

const { useBreakpoint } = Grid;

export default function PTFPage() {
	const screen = useBreakpoint();
	const { user } = UserInfo();

	return screen.md ? (
		<RouterGuard>
			<DesktopAdvPageLayout title="Đăng ký PTF" bg={data.background.src}>
				<DesktopHeader logo={data.logo} banner={data.banner} bg={data.headerColor} />

				<Row style={{ maxWidth: '375px', margin: '0 auto', width: '100%' }}>
					<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
						<h1 style={{ fontSize: 20, fontWeight: 500, textAlign: 'center' }}>
							Chào mừng <span style={{ fontSize: 20, fontFamily: "Montserrat" }}>{user && user.gender === 'Nam' ? 'anh' : 'chị'}</span> <span style={{ fontWeight: 700, fontSize: 20, fontFamily: "Montserrat" }}>{user && user.name}</span> đã đến với <span style={{ fontWeight: 700, fontSize: 20, fontFamily: "Montserrat" }}>PTF</span>!
						</h1>
						<p style={{ fontSize: '14px' }}>Vui lòng kiểm tra các thông tin sau</p>

						<UserForm style={{ margin: '12px 0' }} />
					</Col>
				</Row>
				<Footer style={{ marginTop: 'auto' }} />
			</DesktopAdvPageLayout>
		</RouterGuard>
	) : (
		<RouterGuard>
			<MobileAdvPageLayout title="Đăng ký PTF">
				<MobileHeader logo={data.logo} banner={data.banner} />
				<Row style={{ backgroundColor: '#ffffff' }}>
					<Col span={24} style={{ padding: '0 16px 16px 16px' }}>
						<h1 style={{ fontWeight: 500, textAlign: 'center' }}>
							Chào mừng <span style={{ fontFamily: "Montserrat" }}>{user && user.gender === 'Nam' ? 'anh' : 'chị'}</span> <span style={{ fontWeight: 700, fontFamily: "Montserrat" }}>{user && user.name}</span> đã đến với <span style={{ fontWeight: 700, fontFamily: "Montserrat" }}>PTF</span>!
						</h1>
						<p style={{ fontSize: '14px' }}>Vui lòng kiểm tra các thông tin sau</p>

						<UserForm style={{ margin: '12px 0' }} />
					</Col>
				</Row>
			</MobileAdvPageLayout>
		</RouterGuard>
	);
}