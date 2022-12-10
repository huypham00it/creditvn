import { Button, Typography, Radio, Space } from 'antd';
import { useEffect, useRef } from 'react';

import * as SLUGID from '@/configs/slugId';
import gender_question from '@/configs/gender_question';
import theme from '@/configs/theme';
import signupStyle from '@/assets/Signup.module.css';
import DirectionArrow from '@/components/form/DirectionArrow';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import title from '@/configs/title';
import Head from "next/head";

const { Title } = Typography;

export default function GenderQuestion({ user, setUser, prevQuestion, nextQuestion }) {
	let start_input = useRef(new Date().getTime());
	let total_input = useRef(1);
	const genderRef = useRef(null);

	const matches = useMediaQuery('(max-height:568px)');
	const minW768 = useMediaQuery('(min-width:768px)');

	const handleNextQuestion = () => {
		nextQuestion({ type: "gender", total_input: total_input.current, value: user.gender });
	}

	const updateGender = (value) => {
		total_input.current = new Date().getTime() - start_input.current;
		let new_data = { ...user };
		new_data.gender = value;
		setUser(new_data);
	}

	useEffect(() => {
		document.getElementById("gender_question").addEventListener('keypress', (event) => {
			if (event.key === 'Enter' && user.gender) {
				nextQuestion({ type: "gender", total_input: total_input.current, value: user.gender });
			}
		});
	})

	return (
		<>
			<Head>
				<title>{title.Qgender}</title>
			</Head>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between"
				}}
				className={matches ? signupStyle.small_screen : signupStyle.mobile_screen}
				id="gender_question"
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
						{gender_question.subtitle}
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
						{gender_question.title}
					</Title>
					<Radio.Group ref={genderRef} buttonStyle="solid" style={{ width: '100%' }} size="large">
						{gender_question.options.map((option, index) => (
							<Radio.Button
								className={[signupStyle.radio_item, option.value === user.gender ? signupStyle.radio_item_active : ""]}
								value={option.value} key={index}
								style={{ width: '100%', marginBottom: '8px', backgroundColor: '#f5f5f5', borderColor: 'transparent' }}
								onChange={(e) => updateGender(e.target.value)}
							>{option.label}</Radio.Button>
						))}
					</Radio.Group>
					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<Button
							type="primary"
							disabled={user.gender == ""}
							onClick={handleNextQuestion}
							className={signupStyle.button_small}
							id={SLUGID.NEXT_GENDER}
						>
							{gender_question.button}
						</Button>

						{minW768 && <p style={{ fontSize: "14px", fontWeight: 400, marginBottom: 0 }}>ấn Enter để tiếp tục</p>}
					</div>
				</Space>

				<DirectionArrow
					className={signupStyle.button_bottom}
					onClickPrev={() => prevQuestion()}
					onClickNext={() => handleNextQuestion()}
					nextDisabled={user.gender == ""}
					id={SLUGID.NEXT_GENDER}
				/>
			</div>
		</>
	);
}
