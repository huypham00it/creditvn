import { Button, Typography, Space } from 'antd';
import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';

import * as SLUGID from '@/configs/slugId';
import id_question from '@/configs/id_question';
import theme from '@/configs/theme';
import { validOldID } from '@/utils/validId';
import signupStyle from '@/assets/Signup.module.css';
import InputMaterial from '@/components/form/InputMaterial';
import DirectionArrow from '@/components/form/DirectionArrow';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import title from '@/configs/title';
import Head from "next/head";

const { Title, Text } = Typography;

export default function OldIdQuestion({ user, setUser, prevQuestion, nextQuestion }) {
	const [hasError, setHasError] = useState(false);
	const fieldTime = useRef(null);

	const matches = useMediaQuery('(max-height:568px)');
	const minW768 = useMediaQuery('(min-width:768px)');

	useEffect(() => {
		if (!validOldID(user.old_id_card)) setHasError(true);
	}, [user]);

	const handleNextQuestion = () => {
		if (hasError || user.old_id_card === "") {
			return;
		}
		nextQuestion({ type: "old_id_card", total_input: fieldTime.current, value: user.old_id_card });
	}

	const updateIdCard = (value) => {
		let new_data = { ...user };
		new_data.old_id_card = value;
		setUser(new_data);
	}

	const ignoreQuestion = () => {
		updateIdCard("");
		nextQuestion();
	}

	const handleEnterPress = (e) => {
		if (!hasError && e.target.value !== "") {
			nextQuestion({ type: "old_id_card", total_input: fieldTime.current, value: user.old_id_card });
		}
	}

	return (
		<>
			<Head>
				<title>{title.Qid_opt}</title>
			</Head>
			<div style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between"
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
						{id_question.subtitle}
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
						{id_question.title2}
					</Title>

					<InputMaterial
						onPressEnter={handleEnterPress}
						value={user.old_id_card}
						fieldTime={fieldTime}
						setValue={updateIdCard}
						setError={setHasError}
						validMethod={validOldID}
						placeholder="Nhập số CMND"
						messageError="Vui lòng nhập đúng CMND"
						showError={hasError && user.old_id_card != ""}
					/>

					<Text
						style={{
							fontSize: '16px',
							fontFamily: "Montserrat",
						}}
					>
						{id_question.note}
					</Text>

					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<Button
							type="text"
							onClick={ignoreQuestion}
							className={signupStyle.button_small}
							style={{ marginRight: "10px" }}
						>
							{id_question.ignore}
						</Button>
						<Button
							disabled={hasError}
							type="primary"
							onClick={handleNextQuestion}
							className={signupStyle.button_small}
							id={SLUGID.NEXT_CCCD}
						>
							{id_question.button}
						</Button>
						{minW768 && <p style={{ fontSize: "14px", fontWeight: 400, marginBottom: 0 }}>ấn Enter để tiếp tục</p>}
					</div>
				</Space>

				<DirectionArrow
					className={signupStyle.button_bottom}
					onClickPrev={() => prevQuestion()}
					onClickNext={() => handleNextQuestion()}
					nextDisabled={hasError}
					id={SLUGID.NEXT_CCCD}
				/>
			</div>
		</>
	);
}