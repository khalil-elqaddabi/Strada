const { z } = require("zod");

const registerSchema = z.object({
  firstname: z.string().trim().min(1),
  lastname:  z.string().trim().min(1),
  email:     z.string().trim().email(),
  password:  z.string().min(8),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.strict().safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: result.error.errors },
    });
  }
  req.body = result.data;
  next();
};

module.exports = { registerSchema, validate };
