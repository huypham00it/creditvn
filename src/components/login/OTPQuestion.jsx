import { Space, Button, Typography, Input } from 'antd';
import theme from '@/configs/theme';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import * as SLUGID from '@/configs/slugId';
import otp_question from '@/configs/otp_question';
import StyleOTPQuestion from '@/assets/OTPQuestion.module.css';
import { useState, useRef } from 'react';
import signupStyle from '@/assets/Signup.module.css';
import DirectionArrow from '@/components/form/DirectionArrow';
import title from '@/configs/title';
import Head from "next/head";

const { Title } = Typography;

export default function OTPQuestion({ prevQuestion, nextQuestion }) {
	const [otp1, setNum1] = useState('');
	const [otp2, setNum2] = useState('');
	const [otp3, setNum3] = useState('');
	const [otp4, setNum4] = useState('');
	const [otp5, setNum5] = useState('');
	const [otp6, setNum6] = useState('');
	let start_input = useRef(null);
	let total_input = useRef(1);
	let otp = "";

	const stateObj = {
		'otp1': setNum1,
		'otp2': setNum2,
		'otp3': setNum3,
		'otp4': setNum4,
		'otp5': setNum5,
		'otp6': setNum6,
	}

	const updateOTP = () => {
		if (!start_input.current)
			start_input.current = new Date().getTime();
		if (start_input.current) {
			total_input.current = new Date().getTime() - start_input.current;
		}
		otp = `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`;
	};

	const login = () => {
		updateOTP();
		nextQuestion({ type: "otp", total_input: total_input.current, value: otp });
	};

	const debounceFocus = (elements, idx) => {
		elements[idx].focus();
	};

	const checkChar = (e) => {
		if (e.key === 'Enter' && otp1 && otp2 && otp3 && otp4 && otp5 && otp6) {
			login();
		}

		const update = (e) => {
			let regex = /^[0-9]+$/;
			if (regex.test(e.key)) {
				stateObj[e.target.name](e.key);
				updateOTP();
				if (e.target.form.elements[e.target.tabIndex + 1])
					debounceFocus(e.target.form.elements, e.target.tabIndex + 1);
			} else if (e.key === "Delete" || e.key === "Backspace") {
				stateObj[e.target.name]("");
				updateOTP();
				if (e.target.form.elements[e.target.tabIndex - 1])
					debounceFocus(e.target.form.elements, e.target.tabIndex - 1);
			} else {
				e.preventDefault();
				return false;
			}
		}

		update(e);
	}

	const inputClick = (event) => {
		if (event.target.form.elements[event.target.tabIndex])
			event.target.form.elements[event.target.tabIndex].focus();
	}

	const matches = useMediaQuery('(max-height:568px)');
	const minW768 = useMediaQuery('(min-width:768px)');

	return (
		<>
			<Head>
				<title>{title.Qotp}</title>
			</Head>
			<div style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between"
			}}
				className={matches ? signupStyle.small_screen : signupStyle.mobile_screen}
			>

				<Space direction="vertical">
					<Title
						style={{
							color: theme.primaryColor,
							fontWeight: 400,
							marginTop: 0,
							fontSize: 14,
							marginBottom: 0,
						}}
					>
						{otp_question.subText}
					</Title>
					<Title
						level={5}
						style={{
							color: 'rgba(0, 0, 0, 0.85)',
							fontWeight: 500,
							marginTop: 0,
							marginBottom: 8,
							lineHeight: 2
						}}
					>
						{otp_question.text}
					</Title>
					<form action="" id="OTPForm">
						<div style={{ display: 'flex' }}>
							<Input
								className={StyleOTPQuestion.cell_otp}
								type="number"
								id="otp1"
								name="otp1"
								tabIndex="0"
								maxLength={1}
								autoFocus
								value={otp1}
								onChange={updateOTP}
								onKeyDown={checkChar}
								onClick={inputClick}
								controls={false}
								size="large"
							/>
							<Input
								className={StyleOTPQuestion.cell_otp_per}
								type="number"
								id="otp2"
								name="otp2"
								tabIndex="1"
								maxLength={1}
								value={otp2}
								onChange={updateOTP}
								onKeyDown={checkChar}
								onClick={inputClick}
								controls={false}
								size="large"
							/>
							<Input
								className={StyleOTPQuestion.cell_otp_per}
								type="number"
								id="otp3"
								name="otp3"
								tabIndex="2"
								maxLength={1}
								value={otp3}
								onChange={updateOTP}
								onKeyDown={checkChar}
								onClick={inputClick}
								controls={false}
								size="large"
							/>
							<Input
								className={StyleOTPQuestion.cell_otp_per}
								type="number"
								id="otp4"
								name="otp4"
								tabIndex="3"
								maxLength={1}
								value={otp4}
								onChange={updateOTP}
								onKeyDown={checkChar}
								onClick={inputClick}
								controls={false}
								size="large"
							/>
							<Input
								className={StyleOTPQuestion.cell_otp_per}
								type="number"
								id="otp5"
								name="otp5"
								tabIndex="4"
								maxLength={1}
								value={otp5}
								onChange={updateOTP}
								onKeyDown={checkChar}
								onClick={inputClick}
								controls={false}
								size="large"
							/>
							<Input
								className={StyleOTPQuestion.cell_otp_per}
								type="number"
								id="otp6"
								name="otp6"
								tabIndex="5"
								maxLength={1}
								value={otp6}
								onChange={updateOTP}
								onKeyDown={checkChar}
								onClick={inputClick}
								controls={false}
								size="large"
							/>
						</div>
					</form>
					<div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: minW768 ? "8px" : 0 }}>
						<Button
							type="primary"
							onClick={login}
							className={StyleOTPQuestion.button_otp}
							disabled={!otp1 || !otp2 || !otp3 || !otp4 || !otp5 || !otp6}
							id={SLUGID.NEXT_OTP}
						>{otp_question.button}</Button>

						{minW768 && <p style={{ fontSize: "14px", fontWeight: 400, marginBottom: 0 }}>ấn Enter để tiếp tục</p>}
					</div>
				</Space>

				<DirectionArrow
					className={signupStyle.button_bottom}
					onClickPrev={() => prevQuestion()}
					onClickNext={login}
					nextDisabled={!otp1 || !otp2 || !otp3 || !otp4 || !otp5 || !otp6}
					id={SLUGID.NEXT_OTP}
				/>
			</div>
		</>
	);
}