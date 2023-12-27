import jwt, { decode, JwtPayload } from "jsonwebtoken";

export const getUserFromJwt = (token: string) => {
  if (!token) return null;
  // const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN!);
  // if (jwt.verify(token, process.env.ACCESS_SECRET_TOKEN!))
  try {
    return decode(token, { json: true }) as JwtPayload;
  } catch {
    return null;
  }
};
