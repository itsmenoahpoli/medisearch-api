import { BaseService } from "~/modules/base.service";
import { JWTService } from "~/services";
import { TCredentials, TAuthType } from "~/modules/auth/auth.dto";

export class AuthService extends BaseService {
  private jwtService: JWTService;

  constructor() {
    super();

    this.jwtService = new JWTService();
  }

  public authenticateCredentials = async (credentials: TCredentials, authType: TAuthType) => {
    const user = await this.db.user.findUnique({
      where: {
        email: credentials.email,
      },
    });

    if (!user) return { user: null };

    if ((authType === TAuthType.ADMIN && user.userType === "customer") || (authType === TAuthType.CUSTOMER && user.userType === "admin"))
      return { user: null };

    // @ts-ignore
    delete user["password"];
    const { token } = await this.prismaClient.userJWT.create({
      data: {
        userId: user.id,
        token: this.jwtService.createToken(user),
      },
    });

    return {
      authToken: token,
      user,
    };
  };

  public unauthenticateCredentials = async (user: any, token: string) => {
    await this.db.userJWT.updateMany({
      where: {
        userId: user.id,
        token,
      },
      data: {
        isRevoked: true,
      },
    });

    return {
      message: "USER_UNAUTHENTICATED",
    };
  };
}
