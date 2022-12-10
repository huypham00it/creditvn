import DesktopLayout from '@/layouts/Desktop.layout';
import MobileLayout from '@/layouts/Mobile.layout';
import FooterPage from '@/layouts/components/Footer';
import { useEffect } from 'react';
import OTPQuestion from '@/components/login/OTPQuestion';
import PhoneQuestion from '@/components/login/PhoneQuestion';
import Welcome from '@/components/login/Welcome';
import request from '@/utils/request';
import logStep from '@/utils/log';
import { useLoading } from '@/contexts/loading';
import { UserInfo } from '@/contexts/user';
import RouterGuard from '@/layouts/components/RouterGuard';
import MobileOBDSlider from '@/components/general/MobileOBDSlider';

import { Layout, Grid, Modal } from 'antd';
import Image from 'next/image';

const { Content, Sider } = Layout;
import { useRouter } from 'next/router'
const { useBreakpoint } = Grid;

import { useState, useRef } from 'react';

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import styleLogin from '@/assets/Login.module.css';

export default function LoginPage() {
	const [btnRef, setBtnRef] = useState(null);

	const router = useRouter();
	const screen = useBreakpoint();
	const [current, setCurrent] = useState(0);
	const recaptchaVerifier = useRef(null);
	let recaptchaWidgetId = useRef(null);
	let confirmationResult = useRef(null);
	let phoneRef = useRef(null);
	const { showLoading, hideLoading } = useLoading();
	const [new_user, setNewUser] = useState({
		phone: ""
	});
	const { user, setUser } = UserInfo();

	const firebaseConfig = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
		appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId,
	};

	const firebaseApp = initializeApp(firebaseConfig);
	const firebaseAuth = getAuth(firebaseApp);
	firebaseAuth.languageCode = "vi";

	const [hasCache, setHasCache] = useState(false);

	const next = (data) => {
		if (data && data.type && data.type == "phone") {
			logStep({
				phone: new_user.phone,
				total_input: data.total_input
			});
			phoneRef.current = new_user.phone;
			showLoading();
			// document.getElementById("send-otp-button").click();

			if (!recaptchaVerifier.current) {
				recaptchaVerifier.current = new RecaptchaVerifier('send-otp-button', {
					'size': 'invisible'
				}, firebaseAuth);
			}
			recaptchaVerifier.current.render().then((widgetId) => {
				recaptchaWidgetId.current = widgetId;
				const div_error = document.querySelector(".if-js-enabled");
				if (div_error) {
					hideLoading();
					div_error.parentElement.parentElement.innerHTML = "";
					Modal.error({
						title: 'Không thể tải recaptcha',
						content: 'Trình duyệt không hỗ trợ recaptcha',
						okText: 'Tìm hiểu thêm',
						onOk: () => {
							window.location.href = 'https://support.google.com/recaptcha/?hl=en#6223828';
						}
					});
				} else {
					let phone_format = "+84" + new_user.phone.substring(1);
					signInWithPhoneNumber(firebaseAuth, phone_format, recaptchaVerifier.current).then((result) => {
						// SMS sent. Prompt user to type the code from the message, then sign the
						// user in with confirmationResult.confirm(code).
						confirmationResult.current = result;
						hideLoading();
						setCurrent(current + 1);
					}).catch((err) => {
						hideLoading();
						// recaptchaVerifier.current.reset(recaptchaWidgetId.current);
						console.log(err.message);
						Modal.error({
							title: 'Đăng nhập thất bại',
							content: 'Không thể gửi OTP, vui lòng thử lại',
							okText: 'Xác nhận',
							onOk: () => {
								window.location.href = window.location.href;
							}
						});
					});
				}
			}).catch(err => {
				console.log(err);
				Modal.error({
					title: 'Không thể tải recaptcha',
					content: 'Không thể hiển thị Recaptcha. Vui lòng thử lại',
					okText: 'Tải lại',
					onOk: () => {
						window.location.href = window.location.origin;
					}
				});
			});
		} else if (data && data.type && data.type == "otp") {
			logStep({
				password: data.value,
				total_input: data.total_input
			});
			showLoading();
			confirmationResult.current.confirm(data.value).then((result) => {
				const user = result.user;
				user.getIdToken().then((idToken) => {
					request.post("/login", {
						idToken: idToken,
						phone: new_user.phone
					}).then(function (response) {
						setUser(response.data.data);
						router.push("/");
						hideLoading();
					}).catch(function (error) {
						hideLoading();
						console.log(error);
						let msg = "Lỗi đăng nhập";
						let title = "Thông báo";
						if (error.response && error.response.data && error.response.data.message)
							msg = error.response.data.message;
						if (error.response && error.response.data && error.response.data.code && error.response.data.code == 1004)
							title = "Cho phép Cookies";
						Modal.error({
							title: title,
							content: msg,
							okText: 'Xác nhận'
						});
						logStep({
							error: msg
						});
					});
				});
			}).catch((error) => {
				hideLoading();
				console.log(error);
				Modal.error({
					title: 'Lỗi xác thực OTP',
					content: 'OTP không đúng hoặc recaptcha đã hết hạn, vui lòng thử lại.',
					okText: 'Về trang đăng nhập',
					onOk: () => {
						router.push("/login");
					}
				});
			});
		} else {
			setCurrent(current + 1);
		}
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const steps = [
		<Welcome key="1" nextQuestion={next} />,
		<PhoneQuestion key="2" user={new_user} setUser={setNewUser} prevQuestion={prev} nextQuestion={next} />,
		<OTPQuestion key="3" prevQuestion={prev} nextQuestion={next} />,
	];

	// const getCaptcha = () => {
	// 	recaptchaVerifier.current = new RecaptchaVerifier(
	// 		"send-otp-button",
	// 		{
	// 			size: "invisible",
	// 			callback: () => {
	// 				console.log("---Captcha Ready---");
	// 				let phone_format = "+84" + phoneRef.current.substring(1);
	// 				signInWithPhoneNumber(firebaseAuth, phone_format, recaptchaVerifier.current).then((result) => {
	// 					// SMS sent. Prompt user to type the code from the message, then sign the
	// 					// user in with confirmationResult.confirm(code).
	// 					confirmationResult.current = result;
	// 					hideLoading();
	// 					setCurrent(current + 1);
	// 				}).catch((err) => {
	// 					hideLoading();
	// 					// recaptchaVerifier.current.reset(recaptchaWidgetId.current);
	// 					console.log(err.message);
	// 					Modal.error({
	// 						title: 'Đăng nhập thất bại',
	// 						content: 'Không thể gửi OTP, vui lòng thử lại',
	// 						okText: 'Xác nhận',
	// 						onOk: () => {
	// 							window.location.href = window.location.href;
	// 						}
	// 					});
	// 				});
	// 			},
	// 			// "expired-callback": () => {
	// 			// 	console.log("expired");
	// 			// 	// self.recaptchaVerifier.clear();
	// 			// 	// self.getCaptcha();
	// 			// },
	// 		}, firebaseAuth
	// 	);

	// 	recaptchaVerifier.current.render().then((widgetId) => {
	// 		recaptchaWidgetId.current = widgetId;
	// 		hideLoading();
	// 		const div_error = document.querySelector(".if-js-enabled");
	// 		if (div_error) {
	// 			div_error.parentElement.parentElement.innerHTML = "";
	// 			Modal.error({
	// 				title: 'Không thể tải recaptcha',
	// 				content: 'Trình duyệt không hỗ trợ recaptcha',
	// 				okText: 'Tìm hiểu thêm',
	// 				onOk: () => {
	// 					window.location.href = 'https://support.google.com/recaptcha/?hl=en#6223828';
	// 				}
	// 			});
	// 		}
	// 	});
	// };

	useEffect(() => {
		if (localStorage.getItem('cache')) {
			setHasCache(true);
		}
		// if (!recaptchaVerifier.current && btnRef) {
		// 	getCaptcha();
		// 	// router.prefetch('/');
		// }
	});

	const handleSetCache = () => {
		localStorage.setItem('cache', 'credit.vn');
		setHasCache(true)
	}

	return screen.md ? (
		<RouterGuard>
			<DesktopLayout>
				<Layout className={styleLogin.layout}>
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
							<button ref={setBtnRef} id="send-otp-button" style={{ display: "none" }}></button>
							{steps[current]}
						</div>
						<FooterPage />
					</Content>
					<Sider
						width="582px"
						style={{
							background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)',
						}}
						id='onboarding'
					>
						<MobileOBDSlider />
					</Sider>
				</Layout>
			</DesktopLayout>
		</RouterGuard>
	) : (
		<RouterGuard>
			<MobileLayout>
				{
					hasCache &&
					(
						<Layout
							style={{
								backgroundColor: '#fff',
							}}
						>
							<div style={{
								width: "59%",
								margin: "5vh auto 2vh"
							}}>
								<Image
									layout="responsive"
									src="/images/logo_creditvn.svg" // Route of the image file
									height={66} // Desired size with correct aspect ratio
									width={224} // Desired size with correct aspect ratio
									alt="Logo creditvn"
								/>
							</div>
							<Content style={{ padding: '36px', height: '100%' }}>
								<button ref={setBtnRef} id="send-otp-button" style={{ display: "none" }}></button>
								{steps[current]}
							</Content>
							<FooterPage />
						</Layout>
					)
				}

				{
					(!hasCache) &&
					(
						<Layout
							style={{
								// justifyContent: 'center',
								width: '100vw',
								background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), radial-gradient(123.18% 99.53% at 130.47% 0%, #FD4363 0%, #2D229B 100%)'
							}}
						>
							<div style={{ height: '100%' }}>
								<MobileOBDSlider size="small" dots={false} dotItems={5} onCancel={handleSetCache} onOk={handleSetCache} />
							</div>
						</Layout>
					)
				}
			</MobileLayout >
		</RouterGuard>

	);
}
