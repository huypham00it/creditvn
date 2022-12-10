import { useEffect, useState, useRef } from 'react';
import { Layout, Row, Col, Button, Carousel } from 'antd';
import Image from 'next/image';
import { HomeOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';

import buttonStyle from '@/assets/Button.module.css';
import homeStyle from '@/assets/Home.module.css';
import { useRouter } from "next/router";
import MobileLayout from '@/layouts/Mobile.layout';
import slides from '@/configs/obd_slider';
import MobileOBDSlider from '@/components/general/MobileOBDSlider';

const { Content, Footer } = Layout;

export default function MobilePageLayout(props) {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const showModal = () => {
		setOpen(true);
		document.querySelector('body').style.overflowY = 'hidden'
	};

	const closeModal = () => {
		setOpen(false);
		document.querySelector('body').style.overflowY = 'auto'
	};

	return (
		<MobileLayout title={props.title}>
			<Layout style={{ backgroundColor: '#fff' }}>
				<Row style={{
					height: "48px",
					boxShadow: "inset 0px -1px 0px #D9D9D9",
					boxShadow: 'rgb(217 217 217) 0px -1px 0px inset',
					position: 'sticky',
					top: 0,
					zIndex: 2,
					backgroundColor: '#ffffff'
				}} justify="center" align="middle">
					{router.pathname == "/info" ? 'Hồ sơ' : 'Trang chủ'}
					<div style={{ float: 'right', position: 'absolute', right: '15px', cursor: 'pointer', display: "flex" }}>
						<InfoCircleOutlined onClick={showModal} className={homeStyle.icon_info} style={{ color: '#594DC9' }} />
					</div>
				</Row>
				<Content
					id="mobile-page-content"
					style={{
						backgroundImage: `
							linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
							radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)
						`,
						backgroundSize: '100% 128px',
						backgroundRepeat: 'no-repeat',
						padding: '20% 8% 56px 8%',
						bottom: '48px',
						top: '48px',
						left: 0,
						right: 0,
						overflowY: 'auto',
						overflowX: 'hidden',
						width: '100vw'
					}}
				>
					{props.children}
				</Content>
				<Row justify="center" style={{
					backgroundColor: '#fff',
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
				}}>
					<Col span={12} style={{ padding: '4px 2px 4px 4px' }}>
						<Button icon={<HomeOutlined />}
							onClick={() => router.push('/')}
							className={router.pathname == "/" ? buttonStyle.active : buttonStyle.default}
							style={{ width: '100%', height: '40px', borderRadius: '4px' }} />
					</Col>
					<Col span={12} style={{ padding: '4px 4px 4px 2px' }}>
						<Button icon={<UserOutlined />}
							onClick={() => router.push('/info')}
							className={router.pathname == "/info" ? buttonStyle.active : buttonStyle.default}
							style={{ width: '100%', height: '40px', borderRadius: '4px' }} />
					</Col>
				</Row>
			</Layout>

			<div className={`${homeStyle.info_modal} ${open ? homeStyle.visible : homeStyle.hidden}`}>
				<Layout
					style={{
						// justifyContent: 'center',
						// minHeight: 'fit-content',
						height: '100%',
						width: '100vw',
						background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)',
						overflowY: 'hidden'
					}}
				>
					<div style={{height: '100%'}}>
						<MobileOBDSlider size="small" dots={false} dotItems={5} onCancel={closeModal} onOk={closeModal} />
					</div>
				</Layout>
			</div>

		</MobileLayout>
	);
}