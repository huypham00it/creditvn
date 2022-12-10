import { useEffect } from 'react';
import Seo from './components/Seo';
import { Layout } from 'antd';
const { Content } = Layout;
import autoFitScreen from '@/utils/autoFitScreen';

export default function MobileLayout(props) {

	useEffect(() => {
		autoFitScreen("mobile-layout");
	},[])

	return (
		<>
			<Seo
				url={props.url}
				title={props.title}
				description={props.description}
				keywords={props.keywords}
				image={props.image}
			/>
			<Layout>
				<Content
					style={{ 
						minHeight: '100vh', /* Fallback for browsers that do not support Custom Properties */
						minHeight: 'calc(var(--vh, 1vh) * 100)', 
						backgroundColor: '#fff' ,
						display: 'flex',
						width: '100vw'
					}}

					id="mobile-layout"
				>
					{props.children}
				</Content>
			</Layout>
		</>
	);
}
