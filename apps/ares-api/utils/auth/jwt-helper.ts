import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const jwtToken = ({ id, name }: { id: number; name: string }) => {
  const user = { id, name };
  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN!, {
    expiresIn: "60m",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN!, {
    expiresIn: "1440m",
  });
  return { accessToken, refreshToken };
};

interface CustomRequest extends Request {
  user?: any;
}
export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.json({ error: "Null token" });
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN!, (error, user) => {
    if (error) return res.json({ error: error });
    req.user = user;
    next();
  });
};
