const phoneValid = (value) => {
    let regex = /^(03|05|07|08|09)\d{8}$/;
    return regex.test(value || '');
};
module.exports = { phoneValid };
