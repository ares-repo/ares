import { PrismaClient } from "@prisma/client";
import express from "express";
import bcrypt from "bcrypt";
import { authenticateToken } from "../../../utils/auth/jwt-helper";
import { ResponseStatus } from "../../types/response";

const prisma = new PrismaClient();

export const userRoutes = express.Router();

const UserSelect = {
  id: true,
  name: true,
};
const TAKE_LIMIT = 50;

userRoutes.get("/getAllUsers", authenticateToken, async (_, res) => {
  try {
    const user = await prisma.user.findMany({
      take: TAKE_LIMIT,
      select: UserSelect,
    });
    res.status(ResponseStatus.SUCCESS).json(user);
  } catch (error) {
    res.json({ error: error });
  }
});

userRoutes.get("/user:id", authenticateToken, async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = prisma.user.findFirstOrThrow({
      where: {
        id: { equals: userId },
      },
      select: UserSelect,
    });
  } catch (error) {
    res.status(ResponseStatus.INTERNAL_ERROR).json({ error: error });
  }
});

userRoutes.post("/create", authenticateToken, async (req, res) => {
  try {
    const hashPassowrd = await bcrypt.hash(req.body.password, 10);

    const userEntry = await prisma.user.create({
      data: {
        name: String(req.body.name),
        password: hashPassowrd,
      },
      select: UserSelect,
    });
    res.status(ResponseStatus.SUCCESS).json({ users: userEntry });
  } catch (error) {
    res.status(ResponseStatus.INTERNAL_ERROR).json({ error: error });
  }
});
