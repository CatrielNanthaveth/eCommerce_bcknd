const bcrypt = require("bcrypt");

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(password, salt);

  return {salt, hashed_password};
};

module.exports = {
  encryptPassword,
};
