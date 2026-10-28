import { z } from "zod";

// Rules for creating a coach.
export const createCoachSchema = z.object({
  name: z.string().trim().min(1),
  model: z.string().trim().min(1),
  numberOfSeat: z.number().int().positive(),
}).strict();

// Updating allows any of these fields to be omitted.
export const updateCoachSchema = createCoachSchema
  .partial()
  .refine(
    (body) => Object.keys(body).length > 0,
    "Provide at least one field to update."
  );

// Middleware: check the body before reaching the controller.
export function validateCoach(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: result.error.issues[0].message,
        },
      });
    }

    req.body = result.data;
    next();
  };
}