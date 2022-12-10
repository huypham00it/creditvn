import { Button, Space, Typography } from 'antd';
import { useState, useEffect, useRef } from 'react';

import name_question from '@/configs/name_question';
import signupStyle from '@/assets/Signup.module.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import theme from '@/configs/theme';
import validName from '@/utils/validName';
import InputMaterial from '@/components/form/InputMaterial';
import DirectionArrow from '@/components/form/DirectionArrow';
import * as SLUGID from '@/configs/slugId';
import title from '@/configs/title';
import Head from "next/head";

const { Title } = Typography;

export default function NameQuestion({ user, setUser, nextQuestion }) {
	const [hasError, setHasError] = useState(false);
	const fieldTime = useRef(null);

	const matches = useMediaQuery('(max-height:568px)');
	const minW768 = useMediaQuery('(min-width:768px)');

	useEffect(() => {
		if (!validName(user.name)) setHasError(true);
	}, [user]);

	const updateName = (value) => {
		let new_data = { ...user };
		new_data.name = value;
		setUser(new_data);
	}

	const handleNextQuestion = () => {
		if (hasError || user.name === "") {
			return;
		}
		nextQuestion({ type: "name", total_input: fieldTime.current, value: user.name });
	}

	const handleEnterPress = (e) => {
		if (!hasError && e.target.value !== "") {
			nextQuestion({ type: "name", total_input: fieldTime.current, value: user.name });
		}
	}

	return (
		<>
			<Head>
				<title>{title.Qname}</title>
			</Head>
			<div style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
				className={matches ? signupStyle.small_screen : signupStyle.mobile_screen}
			>
				<Space direction='vertical'>
					<Title
						style={{
							color: theme.primaryColor,
							fontWeight: 400,
							marginTop: 0,
							fontSize: 14,
							marginBottom: 0,
						}}
					>
						{name_question.subtitle}
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
						{name_question.title}
					</Title>
					<InputMaterial
						onPressEnter={(e) => handleEnterPress(e)}
						value={user.name}
						fieldTime={fieldTime}
						setValue={updateName}
						setError={setHasError}
						validMethod={validName}
						placeholder="Nhập họ và tên"
						messageError="Vui lòng nhập đúng tên"
						showError={hasError && user.name != ""}
					/>

					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<Button
							type="primary"
							disabled={hasError}
							onClick={handleNextQuestion}
							className={signupStyle.button_small}
							id={SLUGID.NEXT_NAME}
						>
							{name_question.button}
						</Button>

						{minW768 && <p style={{ fontSize: "14px", fontWeight: 400, marginBottom: 0 }}>ấn Enter để tiếp tục</p>}
					</div>
				</Space>

				<DirectionArrow
					className={signupStyle.button_bottom}
					onClickPrev={() => prevQuestion()}
					onClickNext={() => handleNextQuestion()}
					nextDisabled={hasError}
					prevDisabled={true}
					id={SLUGID.NEXT_NAME}
				/>
			</div>
		</>
	);
}
