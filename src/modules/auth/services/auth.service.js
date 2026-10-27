const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../../config/env");

const SALT_ROUNDS = 12;

async function register({ firstName, lastName, email, password }) {
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already in use.");
    err.code = "RESOURCE_CONFLICT";
    err.status = 409;
    throw err;
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

async function login({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const err = new Error("Invalid email or password.");
    err.code = "INVALID_CREDENTIALS";
    err.status = 401;
    throw err;
  }

  if (!JWT_SECRET) {
    const err = new Error("JWT secret is not configured.");
    err.code = "CONFIGURATION_ERROR";
    err.status = 500;
    throw err;
  }

  const token = jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  );

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    accessToken: token,
    tokenType: "Bearer",
    expiresIn: JWT_EXPIRES_IN,
  };
}

module.exports = { register, login };
