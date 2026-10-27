const bcrypt = require("bcrypt");
const User   = require("../models/user.model");

const SALT_ROUNDS = 12;

async function register({ firstname, lastname, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already in use.");
    err.code   = "RESOURCE_CONFLICT";
    err.status = 409;
    throw err;
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user  = await User.create({ firstname, lastname, email, password: hash });

  return {
    id:        user._id,
    firstname: user.firstname,
    lastname:  user.lastname,
    email:     user.email,
    role:      user.role,
  };
}

module.exports = { register };
