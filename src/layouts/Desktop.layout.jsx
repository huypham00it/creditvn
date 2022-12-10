import React from 'react';
import Seo from './components/Seo';
import { Layout } from 'antd';

const { Content } = Layout;

export default function DesktopLayout(props) {

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
						minHeight: '100vh',
					}}
				>
					{props.children}
				</Content>
			</Layout>
		</>
	);
}
