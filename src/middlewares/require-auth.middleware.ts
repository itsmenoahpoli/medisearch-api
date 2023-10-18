import { Request, Response, NextFunction } from "express";
import { JWTService } from "~/services";

const jwtService = new JWTService();

export const RequireAuthMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers["authorization"];
  const authToken = authHeader?.split(" ")[1];

  if (!authHeader) return response.status(403).json({ message: "FORBIDDEN" });

  try {
    const user = await jwtService.verifyToken(authToken as string);

    // @ts-ignore
    request.user = user;
  } catch (error) {
    return response.status(401).json({ message: "Unauthorized", error });
  }

  next();
};
