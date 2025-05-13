import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "../utils/types";

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("halo");
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }

    try {
        const decoded = verifyToken(token) as JwtPayload;
        req.id = decoded.id;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
