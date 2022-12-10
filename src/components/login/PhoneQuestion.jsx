import { Space, Button, Typography } from 'antd';
import { useState, useEffect, useRef } from 'react';
import theme from '@/configs/theme';
import signupStyle from '@/assets/Signup.module.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import * as SLUGID from '@/configs/slugId';
import { phoneValid } from '@/utils/phone.js';
import { phone_question } from '@/configs/login';
import InputMaterial from '@/components/form/InputMaterial';
import DirectionArrow from '@/components/form/DirectionArrow';
import title from '@/configs/title';
import Head from "next/head";

const { Text } = Typography;

export default function PhoneQuestion({ user, setUser, prevQuestion, nextQuestion }) {
	const [hasError, setHasError] = useState(false);
	const fieldTime = useRef(null);

	useEffect(() => {
		if (!phoneValid(user.phone)) setHasError(true);
	}, [user]);

	const matches = useMediaQuery('(max-height:568px)');
	const minW768 = useMediaQuery('(min-width:768px)');

	const sendOTP = function () {
		// document.getElementById("send-otp-button").click();
		nextQuestion({ type: "phone", total_input: fieldTime.current });
	};

	const updatePhone = (value) => {
		let new_data = { ...user };
		new_data.phone = value;
		setUser(new_data);
	};

	const handleEnterPress = (e) => {
		if (!hasError && e.target.value !== "") {
			nextQuestion({ type: "phone", total_input: fieldTime.current });
		}
	}

	return (
		<>
			<Head>
				<title>{title.Qphone}</title>
			</Head>
			<div style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between"
			}}
				className={matches ? signupStyle.small_screen : signupStyle.mobile_screen}
			>
				<Space direction="vertical">
					<Text
						style={{
							color: theme.primaryColor,
							fontSize: '14px',
							fontFamily: "BeVietnamPro"
						}}
					>
						{phone_question.subtitle}
					</Text>
					<Text
						style={{
							fontSize: '16px',
							fontFamily: "Montserrat",
							fontWeight: 500
						}}
					>
						{phone_question.title}
					</Text>

					<InputMaterial
						type="number"
						value={user.phone}
						onPressEnter={(e) => handleEnterPress(e)}
						fieldTime={fieldTime}
						setValue={updatePhone}
						setError={setHasError}
						validMethod={phoneValid}
						placeholder={phone_question.input}
						messageError={phone_question.input_error}
						showError={hasError && user.phone != ""}
					/>

					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<Button
							type="primary"
							className={signupStyle.button_small}
							disabled={hasError}
							onClick={sendOTP}
							id={SLUGID.NEXT_PHONE}
						>
							{phone_question.button_next}
						</Button>

						{minW768 && <p style={{ fontSize: "14px", fontWeight: 400, marginBottom: 0 }}>ấn Enter để tiếp tục</p>}
					</div>
				</Space>

				<DirectionArrow
					className={signupStyle.button_bottom}
					onClickPrev={prevQuestion}
					onClickNext={sendOTP}
					nextDisabled={hasError}
					id={SLUGID.NEXT_PHONE}
				/>
			</div>
		</>
	);
}
