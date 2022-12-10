import DesktopPageLayout from '@/layouts/DesktopPage.layout';
import MobilePageLayout from '@/layouts/MobilePage.layout';
import RouterGuard from '@/layouts/components/RouterGuard';
import FooterPage from '@/layouts/components/Footer';

import HomePage from '@/components/home/HomePage';
import NameQuestion from '@/components/home/NameQuestion';
import GenderQuestion from '@/components/home/GenderQuestion';
import IdQuestion from '@/components/home/IdQuestion';
import OldIdQuestion from '@/components/home/OldIdQuestion';
import ProvinceQuestion from '@/components/home/ProvinceQuestion';
import { Layout, Row, Modal } from 'antd';
import Image from 'next/image';
import { UserInfo } from '@/contexts/user';
import { useLoading } from '@/contexts/loading';
import logStep from '@/utils/log';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styleHome from '@/assets/Home.module.css';
import styleLogin from '@/assets/Login.module.css';
// import Bubble from '@/components/home/Bubble';
import request from '@/utils/request';
import title from '@/configs/title';

const { Content } = Layout;

import { Grid } from 'antd';

const { useBreakpoint } = Grid;
import { useState } from 'react';


function Home() {
	const screen = useBreakpoint();
	const { user } = UserInfo();
	const isComplete = user && user.name && user.gender && user.address && user.id_card;
	// const [openBubble, setOpenBubble] = useState(true);

	return screen.md ? (
		<RouterGuard>
			<DesktopPageLayout title={title.Qlisting}>
				{!isComplete &&
					<Content width="59.6%" className={styleLogin.content}>
						<div className={styleLogin.content_wrapper}>
							<div className={styleLogin.main_logo}>
								<Image
									src="/images/logo_creditvn.svg"
									width={239}
									height={70}
									alt="Logo creditvn"
								/>
							</div>
							<button id="send-otp-button" style={{ display: "none" }}></button>
							<UserForm />
						</div>
						<FooterPage />
					</Content>
				}
				<div className={!isComplete ? styleHome.layout_question : ""}>
					<HomePage isComplete={isComplete} large={true} />
				</div>

				{/* Survey Bubble */}

				{/* {isComplete && openBubble &&
					<Bubble
						iconSize={{ width: 179, height: 164 }}
						textSize={{ width: 133.35, height: 41.02 }}
						handleClose={() => setOpenBubble(false)}
					/>} */}

			</DesktopPageLayout>
		</RouterGuard>
	) : (
		<RouterGuard>
			<MobilePageLayout title={title.Qlisting}>
				<HomePage />
			</MobilePageLayout>
			{!isComplete && <UserForm />}
		</RouterGuard>
	)
}

function UserForm() {
	const screen = useBreakpoint();
	const minH500 = useMediaQuery('(min-height:500px)');
	const { showLoading, hideLoading } = useLoading();
	const { setUser } = UserInfo();
	const [current, setCurrent] = useState(0);
	const [new_user, setNewUser] = useState({
		name: "",
		gender: "",
		id_card: "",
		old_id_card: "",
		address: ""
	});

	const next = (data) => {
		if (data && data.type && data.type == "id_card" && data.value.length == 9)
			setCurrent(current + 2);
		else if (data && data.type && data.type == "address") {
			showLoading();
			logStep({
				address: data.value,
				total_input: data.total_input
			});
			request.post("/update_scoring", { ...new_user, address: data.value }).then(function (response) {
				hideLoading();
				console.log(response.data);
				const result = response.data.data;
				setUser(result);
			}).catch(function (error) {
				console.log(error);
				hideLoading();
				let msg = "Lỗi đăng ký";
				if (error.response && error.response.data && error.response.data.message)
					msg = error.response.data.message;

				Modal.error({
					title: 'Xảy ra lỗi',
					content: msg,
					okText: 'Xác nhận'
				});
			});
		} else {
			if (data && data.type) {
				let log_data = { total_input: data.total_input };
				log_data[data.type] = data.value;
				logStep(log_data);
			}
			setCurrent(current + 1);
		}
	};

	const prev = (type) => {
		if (type && type == "address" && new_user.id_card.length == 9)
			setCurrent(current - 2);
		else
			setCurrent(current - 1);
	};

	const steps = [
		<NameQuestion key="1" user={new_user} setUser={setNewUser} nextQuestion={next} />,
		<GenderQuestion key="2" user={new_user} setUser={setNewUser} prevQuestion={prev} nextQuestion={next} />,
		<IdQuestion key="3" user={new_user} setUser={setNewUser} prevQuestion={prev} nextQuestion={next} />,
		<OldIdQuestion key="4" user={new_user} setUser={setNewUser} prevQuestion={prev} nextQuestion={next} />,
		<ProvinceQuestion key="5" user={new_user} setUser={setNewUser} prevQuestion={prev} nextQuestion={next} />,
	];

	return (
		screen.md ? (
			<>
				{steps[current]}
			</>
		) : (
			<Layout style={{
				position: 'fixed', top: 0, bottom: 0, left: 0, right: 0,
				background: 'radial-gradient(123.18% 99.53% at 130.47% 0%, rgba(253, 67, 99, 0.8) 0%, rgba(45, 34, 155, 0.8) 100%)',
				backdropFilter: 'blur(2.5px)',
				zIndex: 3
			}}>
				<Layout style={{
					position: 'absolute', height: minH500 ? '65%' : '95%', bottom: 0, left: 0, right: 0,
					background: '#FFFFFF', borderRadius: '0px 48px 0px 0px'
				}}>
					<Content>
						<Row justify="start" align="middle" style={{ padding: '24px 36px', height: '100%' }}>
							{steps[current]}
						</Row>
					</Content>
					<FooterPage />
				</Layout>
			</Layout>
		)
	);
}

export default Home;