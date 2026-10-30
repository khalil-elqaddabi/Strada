import Joi from "joi";

export default class BoardingValidator {
  constructor() {
    this.ticketSchema = Joi.object({
      bookingCode: Joi.string().trim().required(),

      departureId: Joi.string()
        .trim()
        .hex()
        .length(24)
        .required(),
    }).unknown(false);
  }

  validateTicket(req, res, next) {
    const { error, value } = this.ticketSchema.validate(req.body, {
      abortEarly: false,
      convert: true,
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
    return next();
  }
}