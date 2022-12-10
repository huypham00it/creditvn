import { Layout } from 'antd';
const { Content } = Layout;

import DesktopLayout from '@/layouts/Desktop.layout';

export default function DesktopAdvPageLayout(props) {

	return (
		<DesktopLayout title={props.title}>
			<Layout style={{ 
					minHeight: '100vh', 
					backgroundColor: '#fff', 
					backgroundImage: `url("${props.bg}")`, 
					backgroundSize: "cover", 
					backgroundPosition: "center 70px" 
				}}>
				<Content 
					style={{ 
						overflowY: 'auto',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{props.children}
				</Content>
			</Layout>
		</DesktopLayout>
	);
}