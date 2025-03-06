import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('name').notEmpty().withMessage('El nombre es obligatorio.'),
  body('email').isEmail().withMessage('El correo debe ser válido.'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
  body('roleId').notEmpty().withMessage('El rol es obligatorio.'),
];

export const validateLogin = [
  body('email').isEmail().withMessage('El correo debe ser válido.'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria.'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};