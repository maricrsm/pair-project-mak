const bcrypt = require('bcryptjs');

const formatBcryptjs = (pass) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    return hash
}

module.exports = {formatBcryptjs}