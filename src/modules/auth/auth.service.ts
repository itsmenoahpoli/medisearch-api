import { BaseService } from "~/modules/base.service";
import { JWTService } from "~/services";
import { TCredentials, TAuthType } from "~/modules/auth/auth.dto";
import { verifyPassword } from "~/utilities/password.util";

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
      include: {
        pharmacy: true,
      },
    });

    if (!user) return { user: null };

    if (user && !(await verifyPassword(credentials.password, user.password))) {
      return {
        user: null,
        message: "INCORRECT_PASSWORD_FOR_ACCOUNT",
      };
    }

    if (authType !== user.userType) {
      return {
        user: null,
        message: "INCORRECT_AUTH_TYPE_FOR_USER_TYPE",
      };
    }

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

  public getMyProfile = async (userId: number) => {
    const user = await this.db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return user;
  };

  public updateMyProfile = async (userId: number, profileData: any) => {
    const profile = await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...profileData,
      },
    });

    return profile;
  };
}
