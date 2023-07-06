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

const sum = (val) => {
    const totals = val.map(el => el.total)
    const sum = totals.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    
    return sum
  }

  const date = (val) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

    return val.toLocaleDateString("en-US", options)
  }

module.exports = { formatBcryptjs, currency, sum, date }