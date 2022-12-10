import { Input } from 'antd';
import inputStyle from '@/assets/Input.module.css';
import { debounce } from 'lodash';

export default function InputMaterial(props) {
	let start_input = null;
	const debounceHasError = debounce((value) => {
		props.setError(!props.validMethod(value) || value === "")
	}, 200)

	const handleChange = (e) => {
		const input_value = e.target.value;
		if (!input_value.startsWith(' ')) {
			props.setValue(input_value);
			handleBlur();
			debounceHasError(input_value);
		}
	}

	const handleFocus = function () {
		start_input = new Date().getTime();
	};

	const handleBlur = function () {
		if (props.fieldTime && !props.fieldTime.current) props.fieldTime.current = 1;
		if (props.fieldTime && start_input) {
			props.fieldTime.current += new Date().getTime() - start_input;
			start_input = null;
		}
	}

	return (
		<>
			<Input
				autoComplete='off'
				value={props.value}
				bordered={false}
				placeholder={props.placeholder}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onPressEnter={props.onPressEnter}
				className={`${inputStyle.signup_input} ${props.showError && inputStyle.input_error}`}
				type={props.type}
			/>
			<p className={inputStyle.message_error}>
				{props.showError && props.messageError}
			</p>
		</>
	);
}
