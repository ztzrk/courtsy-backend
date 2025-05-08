import { Request, Response } from "express";
import prisma from "../utils/prisma.client";
import { IUser, UserUpdate } from "../utils/types";

// CREATE
export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, password, name, phone, role }: IUser = req.body;

        const user = await prisma.user.create({
            data: { email, password, name, phone, role },
        });

        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

// READ (All Users)
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page = "1", limit = "10", role, email, name } = req.query;

        const pageNum = parseInt(page as string, 10);
        const limitNum = parseInt(limit as string, 10);
        const skip = (pageNum - 1) * limitNum;

        const where: any = {};
        if (role) where.role = role;
        if (email)
            where.email = { contains: email as string, mode: "insensitive" };
        if (name)
            where.name = { contains: name as string, mode: "insensitive" };

        const [users, totalCount] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limitNum,
                orderBy: { createdAt: "desc" },
            }),
            prisma.user.count({ where }),
        ]);

        const totalPages = Math.ceil(totalCount / limitNum);

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                total: totalCount,
                totalPages,
                currentPage: pageNum,
                limit: limitNum,
                hasNextPage: pageNum < totalPages,
            },
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            error: "Failed to fetch users",
        });
    }
};

// READ (Single User)
export const getUserById = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data: UserUpdate = req.body;

        const user = await prisma.user.update({
            where: { id },
            data,
        });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};
