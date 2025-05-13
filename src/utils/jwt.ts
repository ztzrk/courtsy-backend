import jwt from "jsonwebtoken";
import { env } from "process";

const JWT_SECRET = env.JWT_SECRET || "your-secret-key";
const EXPIRES_IN = "1h";

export const signToken = (payload: { id: string; role: string }) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET) as { id: string; role: string };
};
