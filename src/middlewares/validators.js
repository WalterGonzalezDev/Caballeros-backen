import { body, validationResult } from "express-validator";

export const validateRegister = [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("El email es obligatorio"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    body("role").notEmpty().withMessage("El rol es obligatorio"),
];
export const validateLogin = [
    body("email").isEmail().withMessage("El email debe ser válido"),
    body("password").isLength({ min: 6 }).withMessage("La contraseña es obligatoria"),
];

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};
  