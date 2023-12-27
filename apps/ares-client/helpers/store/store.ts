import { getUserFromJwt } from "../auth/getUserFromJsw";

export const getUserFromToken = async (token: string): Promise<any> => {
  const jwtPayload = getUserFromJwt(token);
  let me;
  // if(jwtPayload.)
};
