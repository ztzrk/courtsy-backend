import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt";
import prisma from "../utils/prisma.client";

export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = signToken({ id: user.id, role: user.role });
    res.json({ token });
};

export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, role: "ADMIN" },
    });

    res.status(201).json({ id: user.id });
};
