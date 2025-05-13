import { Request, Response, NextFunction } from "express";

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("User role: ", req.role);
    if (req.role == "ADMIN") {
        res.status(403).json({ error: "Admin access required" });
        next();
    }
};
