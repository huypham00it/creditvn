const validID = (value) => {
	let regex = /^(0[1-9]|1[0-9]|2[0-9]|3[0-8])\d{7}$/;
	if (value && value.length == 12)
		regex = /^(0)([0-8][0-9]|9[0-6])\d{9}$/;
	return regex.test(value);
}

const validOldID = (value) => {
	let regex = /^(0[1-9]|1[0-9]|2[0-9]|3[0-8])\d{7}$/;
	return regex.test(value);
}

export {validID, validOldID};