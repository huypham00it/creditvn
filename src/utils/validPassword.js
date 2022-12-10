const validPassword = (value) => {
	let regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
	return regex.test(value);
}

export default validPassword;