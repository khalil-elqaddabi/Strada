const authService = require("../services/auth.service");

async function register(req, res, next) {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ data: user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
