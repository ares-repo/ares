import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { jwtToken } from "../../../utils/auth/jwt-helper";
import { ResponseStatus } from "../../types/response";

export const authRoutes = express.Router();
const prisma = new PrismaClient();

authRoutes.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const userEntry = await prisma.user.findFirst({
      where: {
        name: { equals: String(name) },
      },
    });
    if (!userEntry) {
      return res.status(ResponseStatus.BAD_REQUEST).json({
        error: "Name incorrect!",
      });
    }
    const validPass = await bcrypt.compare(password, userEntry.password);

    if (!validPass) {
      return res.status(ResponseStatus.BAD_REQUEST).json({
        error: "Password incorrect!!!",
      });
    }

    //return jwt
    let tokens = jwtToken({ id: userEntry.id, name: userEntry.name });
    res.cookie("refresh__token", tokens.refreshToken, { httpOnly: true });
    res.status(ResponseStatus.SUCCESS).json({ tokens });
  } catch (err) {
    res.status(ResponseStatus.INTERNAL_ERROR).json({ error: err });
  }
});

authRoutes.get("/refresh_token", (req, res) => {
  try {
    const refreshToken = req.cookies.refresh__token;
    if (!refreshToken) return res.json({ error: "Null refresh token" });
    jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_TOKEN!,
      // @ts-ignore
      (error, user) => {
        if (error) return res.json({ error: error.message });
        let token = jwtToken(user);
        res.cookie("refresh_token", token.accessToken, { httpOnly: true });
        res.status(ResponseStatus.SUCCESS).json(token.accessToken);
      }
    );
  } catch (err) {
    res.status(ResponseStatus.INTERNAL_ERROR).json({ error: err });
  }
});
