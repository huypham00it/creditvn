import { Layout } from 'antd';
const { Content } = Layout;

import MobileLayout from '@/layouts/Mobile.layout';

export default function MobileAdvPageLayout(props) {


	return (
		<MobileLayout title={props.title}>
			<Layout 
				style={{
					height: '100%',
				}}
			>
				<Content style={{ overflowY: 'auto'}}>
					{props.children}
				</Content>
			</Layout>
		</MobileLayout>
	);
}