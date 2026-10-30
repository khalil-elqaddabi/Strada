import { z } from "zod";

export const createBookingSchema = z.object({
  departureId: z.string().min(1),
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
