import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const SALT_ROUNDS = 12;

class AuthService {
  async register({ firstName, lastName, email, password, role }) {
    const exists = await User.findOne({ email });
    if (exists) {
      const err = new Error("Email already in use.");
      err.code   = "RESOURCE_CONFLICT";
      err.status = 409;
      throw err;
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
   const user = await User.create({ firstName, lastName, email, password: hash, role });
    return {
      id:        user._id,
      firstName: user.firstName,
      lastName:  user.lastName,
      email:     user.email,
      role:      user.role,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const err = new Error("Invalid email or password.");
      err.code   = "INVALID_CREDENTIALS";
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return {
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        role:      user.role,
      },
      accessToken: token,
      tokenType:   "Bearer",
      expiresIn:   process.env.JWT_EXPIRES_IN || "1d",
    };
  }
}

export default new AuthService();
