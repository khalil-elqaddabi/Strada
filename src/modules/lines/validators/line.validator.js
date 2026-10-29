import { z } from "zod";

export const createLineSchema = z.object({
  code:    z.string().min(1),
  label:   z.string().min(1),
  stopIds: z.array(z.string()).min(2),
});

export const updateLineSchema = z.object({
  code:    z.string().min(1).optional(),
  label:   z.string().min(1).optional(),
  stopIds: z.array(z.string()).min(2).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "Body cannot be empty",
});

export const validate = (schema) => (req, res, next) => {
  const result = schema.strict().safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: result.error.errors },
    });
  }
  req.body = result.data;
  next();
};
