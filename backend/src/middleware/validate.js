import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(error);
  }
};
