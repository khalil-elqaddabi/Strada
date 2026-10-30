import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: { code: "AUTH_REQUIRED", message: "No token provided." } });
  }

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.sub, role: decoded.role };
    next();
  } catch {
    return res.status(401).json({ error: { code: "AUTH_REQUIRED", message: "Invalid or expired token." } });
  }
};
