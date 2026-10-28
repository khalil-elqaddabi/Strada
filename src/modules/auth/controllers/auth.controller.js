import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json({ data: user });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({ data: result });
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
