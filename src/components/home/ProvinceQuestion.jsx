import { Button, Typography, Input, Space } from 'antd';
import { useState, useRef } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';

import * as SLUGID from '@/configs/slugId';
import province_question from '@/configs/province_question';
import theme from '@/configs/theme';
import toNonAccentVietnamese from '@/utils/nonAccentVietnamese'
import DirectionArrow from '@/components/form/DirectionArrow';
import useClickOutside from '@/hooks/useClickOutside';
import signupStyle from '@/assets/Signup.module.css';
import filterProvince from '@/utils/filterProvince';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import title from '@/configs/title';
import Head from "next/head";

const { Title } = Typography;
const options = province_question.options;

export default function ProvinceQuestion({ user, setUser, prevQuestion, nextQuestion }) {
	const [hasError, setHasError] = useState(false);
	const [openSuggestions, setOpenSuggestions] = useState(false);
	const [filteredOptions, setFilteredOptions] = useState(province_question.options);
	const [hasCity, setHasCity] = useState(true);

	const inputRef = useRef(null);
	const cityRef = useRef(null);
	let start_input = useRef(null);
	let total_input = useRef(1);

	const matches = useMediaQuery('(max-height:568px)');

	const updateAddress = (value) => {
		let new_data = { ...user };
		new_data.address = value;
		setUser(new_data);
	}

	const handleFocus = () => {
		start_input.current = new Date().getTime();
	}

	const handleClick = () => {
		start_input.current = new Date().getTime();
		setOpenSuggestions(!openSuggestions);
	}

	const handleChange = (value) => {
		if (!value.startsWith(' ')) {
			updateAddress(value);
			filterOptions(value);
		}
		setOpenSuggestions(true);
	}
	const handleSubmit = () => {
		handleBlur();
		if (hasError || user.address == "") {
			inputRef.current.focus();
			setHasError(true);
			return;
		}
		nextQuestion({ type: "address", total_input: total_input.current, value: filteredOptions[0].value });
	}

	const handleSelect = (value) => {
		inputRef.current.focus();
		setHasError(false);
		handleChange(value);
		setOpenSuggestions(false);
		if (start_input) {
			total_input.current += new Date().getTime() - start_input.current;
			start_input.current = null;
		}
	}

	const handleBlur = () => {
		const currentValue = inputRef.current.input.value;
		let filteredValues = filterProvince(currentValue);
		setOpenSuggestions(false);
		if (currentValue != "") {
			const suggestOption = filteredValues.find((option) => {
				return (toNonAccentVietnamese(option.value.toLowerCase()).indexOf(toNonAccentVietnamese(currentValue.toLowerCase())) !== -1);
			});

			if (!suggestOption) {
				setHasError(true)
				return;
			}

			setHasError(false);
			updateAddress(suggestOption.value);
			return;
		}

	}

	const filterOptions = (province) => {
		let filteredValues = filterProvince(province);

		if (!filteredValues.length > 0) {
			setHasCity(false);
			setFilteredOptions(options);
			return;
		}

		setHasCity(true);
		setFilteredOptions(filteredValues);
	}

	useClickOutside(cityRef, () => {
		handleBlur();
	})

	return (
		<>
			<Head>
				<title>{title.Qcity}</title>
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
						{province_question.subtitle}
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
						{province_question.title}
					</Title>
					<div style={{
						position: 'relative',
					}}

						ref={cityRef}
					>
						<div className={openSuggestions ? signupStyle.province_suggestions : signupStyle.province_suggestion_hide} >
							{filteredOptions.length > 0 && hasCity && filteredOptions.map((option, i) => (
								<div key={i} className={signupStyle.province_suggestion__item} onClick={() => handleSelect(option.value)}>
									{option.label}
								</div>
							))}

							{!hasCity && (
								<div className={signupStyle.province_suggestion__item} style={{ color: "#00000073" }}>
									Không tìm thấy
								</div>
							)}
						</div>

						<Input
							onPressEnter={() => {
								handleBlur();
								handleSubmit();
							}}
							value={user.address}
							ref={inputRef}
							placeholder="Chọn Tỉnh/Thành phố"
							className={signupStyle.input_province}
							onChange={(e) => handleChange(e.target.value)}
							onFocus={handleFocus}
							onClick={handleClick}
						/>

						<CaretDownOutlined
							style={{
								position: 'absolute',
								right: 0,
								top: '50%',
								transform: 'translateY(-50%)',
							}}
						/>
					</div>
					{hasError && user.address != "" &&
						<span className={signupStyle.error_msg}>
							{user.address === "" ? province_question.not_select_msg : province_question.invalid_msg}
						</span>
					}
					<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
						<Button
							block
							disabled={hasError || openSuggestions || user.address === ""}
							type="primary"
							onClick={handleSubmit} className={signupStyle.button_small}
							id={SLUGID.NEXT_LOCALE}
						>
							{province_question.button}
						</Button>
					</div>
				</Space>

				<DirectionArrow
					className={signupStyle.button_bottom}
					onClickPrev={() => prevQuestion("address")}
					onClickNext={() => handleSubmit()}
					nextDisabled={hasError || openSuggestions || user.address === ""}
					id={SLUGID.NEXT_LOCALE}
				/>
			</div>
		</>
	);
}
