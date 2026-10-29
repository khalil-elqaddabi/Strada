
import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId");

export const createStopSchema = z
  .object({
    name: z.string().trim().min(1, "Stop name is required"),
    cityId: objectIdSchema,
  })
  .strict();

export const updateStopSchema = z
  .object({
    name: z.string().trim().min(1, "Stop name cannot be empty"),
    cityId: objectIdSchema,
  })
  .strict()
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field is required for the update"
  );

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
  }

  req.body = result.data;
  return next();
};
