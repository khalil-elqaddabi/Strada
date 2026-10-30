import Joi from "joi";

export default class DepartureValidator {

  constructor() {
    this.createSchema = Joi.object({
      lineId: Joi.string()
        .trim()
        .hex()
        .length(24)
        .required(),

      coachId: Joi.string()
        .trim()
        .hex()
        .length(24)
        .required(),

      departureAt: Joi.date()
        .required(),

      arrivalAt: Joi.date()
        .greater(Joi.ref("departureAt"))
        .required()
        .messages({
          "date.greater": "Arrival date must be after departure date."
        }),

      price: Joi.number()
        .min(0)
        .required(),

      status: Joi.string()
        .valid("OPEN", "BOARDING", "DEPARTED", "CANCELLED")
        .default("OPEN"),

    }).strict();

    this.updateSchema = Joi.object({
      lineId: Joi.string().trim().hex().length(24),

      coachId: Joi.string().trim().hex().length(24),

      departureAt: Joi.date(),

      arrivalAt: Joi.date(),

      price: Joi.number().min(0),

      status: Joi.string()
        .valid("OPEN", "BOARDING", "DEPARTED", "CANCELLED"),

    })
      .min(1)
      .strict();
  }

  validate(schema) {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: error.details[0].message,
          },
        });
      }

      req.body = value;
      next();
    };
  }

  validateCreate(req, res, next) {
    return this.validate(this.createSchema)(req, res, next);
  }

  validateUpdate(req, res, next) {
    const { error, value } = this.updateSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: error.details[0].message,
        },
      });
    }

    req.body = value;
    next();
  }
}