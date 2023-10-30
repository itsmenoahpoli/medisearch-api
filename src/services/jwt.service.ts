import * as jwt from "jsonwebtoken";
import { BaseService } from "~/modules/base.service";
import { getEnv } from "~/utilities/env.util";

export class JWTService extends BaseService {
  private JWT_SECRET: string;

  constructor() {
    super();
    this.JWT_SECRET = getEnv<string>("JWT_SECRET");
  }

  public createToken = (payload: any) => {
    return jwt.sign(payload, this.JWT_SECRET, { expiresIn: "1d", algorithm: "HS512" });
  };

  public verifyToken = async (token: string) => {
    const user = jwt.verify(token, this.JWT_SECRET);

    if (user) {
      const tokenInDB = await this.db.userJWT.findFirst({ where: { token } });

      if (tokenInDB?.isRevoked) {
        throw Error("Unauthorized");
      }

      return user;
    }

    throw Error("Unauthorized");
  };

  // public revokeToken = async (token: string) => {
  //   // TODO: Revoke token for logout
  // };

  public decodeToken = (token: string) => {
    return jwt.verify(token, this.JWT_SECRET);
  };
}
