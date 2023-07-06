const bcrypt = require('bcryptjs');

const formatBcryptjs = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash
}

const currency = (number) => {
    return formattedNumber = number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    });
}

module.exports = { formatBcryptjs, currency }