import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hashedPassword) => {
  logger.info(`password: ${password}, hashedPassword: ${hashedPassword}`);
  if (hashedPassword.startsWith('$2y$') || hashedPassword.startsWith('$2a$') || hashedPassword.startsWith('$2b$')) {
    return await bcrypt.compare(password, hashedPassword);
  } else {
    return password === hashedPassword;
  }
};

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, roleId: user.roleId }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};