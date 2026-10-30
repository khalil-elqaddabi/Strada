import { z } from "zod";

export const createCoachSchema = z.object({
  registration: z
    .string()
    .trim()
    .min(1, "Registration is required.")
    .transform((value) => value.toUpperCase()),

  seatNumbers: z
    .number()
    .int("Seat count must be an integer.")
    .positive("Seat count must be greater than zero."),
}).strict();

export const updateCoachSchema = createCoachSchema
  .partial()
  .refine(
    (body) => Object.keys(body).length > 0,
    "Provide at least one field to update."
  );

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