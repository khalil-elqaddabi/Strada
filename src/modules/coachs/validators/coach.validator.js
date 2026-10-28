import { z } from "zod";

export const createCoachSchema = z.object({
  registration: z
    .string()
    .trim()
    .min(1, "Registration is required.")
    .transform((value) => value.toUpperCase()),

  seatNumbers: z
    .array(z.number().int().positive())
    .min(1, "Provide at least one seat.")
    .refine(
      (seats) => new Set(seats).size === seats.length,
      "Seat numbers must be unique."
    ),
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