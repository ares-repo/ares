import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import { authenticateToken } from "../../../utils/auth/jwt-helper";

const prisma = new PrismaClient();

export const userRoutes = express.Router();

userRoutes.get("/", authenticateToken, async (_, res) => {
  try {
    const user = await prisma.user.findMany({
      take: 50,
      select: {
        id: true,
        name: true,
      },
    });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

userRoutes.post("/", authenticateToken, async (req, res) => {
  try {
    const hashPassowrd = await bcrypt.hash(req.body.password, 10);

    const userEntry = await prisma.user.create({
      data: {
        name: String(req.body.name),
        password: hashPassowrd,
      },
    });
    res.json({ users: userEntry });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
