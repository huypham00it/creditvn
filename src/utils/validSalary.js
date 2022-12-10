const validSalary = (value) => {
	let regex = /^[1-9]\d{1,2}$|^[1-9]$/;
	return regex.test(value);
}

export default validSalary;