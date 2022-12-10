import { Layout, Row, Col } from 'antd';
const { Content } = Layout;
import Image from 'next/image';
import { CloseCircleOutlined } from '@ant-design/icons';

import DesktopLayout from '@/layouts/Desktop.layout';
import Header from '@/layouts/components/Header';
import slides from '@/configs/obd_slider';
import styleODB from '@/assets/ODBSlider.module.css';
import { useToggle } from '@/hooks/useToggle';
import homeStyle from '@/assets/Home.module.css';
import { UserInfo } from '@/contexts/user';
import DeskOBDSlider from '@/components/general/DeskOBDSlider';

export default function MobilePageLayout(props) {
	const [openSlide, toggleOpenSlide] = useToggle(false);
	const { user } = UserInfo();
	const isComplete = user && user.name && user.gender && user.address && user.id_card;

	return (
		<DesktopLayout title={props.title}>
			{isComplete &&
			<Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
				<Row
					style={{
						height: "64px",
						boxShadow: "inset 0px -1px 0px #D9D9D9",
						position: 'sticky',
    					top: 0,
    					zIndex: 1,
    					backgroundColor: '#ffffff'
					}}
					justify="center"
					align="middle"
				>
					<Header handleOpenSlider={() => toggleOpenSlide()} />
				</Row>
				<Content
				id="desktop-page-content"
					style={{
						backgroundImage: `
							linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
							radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)
						`,
						backgroundSize: '100% 243px',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: "top",
						padding: '2.9% 8% 3% 8%',
						overflowY: 'auto',
						overflowX: 'hidden',
						width: '100vw'
					}}
					>
					{props.children}
				</Content>

				<div className={`${homeStyle.info_modal} ${openSlide ? homeStyle.visible : homeStyle.hidden}`}>
					{openSlide && <DeskOBDSlider slides={slides} handleCloseSlide={toggleOpenSlide}/>}
				</div>
			</Layout>}
			{!isComplete &&
				<Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
					<Content style={{ display: 'flex'}}>
						{props.children}
					</Content>
				</Layout>
			}

		</DesktopLayout>
	);
}