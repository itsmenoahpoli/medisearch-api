import { RequireAuthMiddleware } from "~/middlewares";

type TMiddlewareKeys = "requireAuth";
export class MiddlewaresService {
  public getMiddleware(name: TMiddlewareKeys) {
    const middlewares: any = {
      requireAuth: RequireAuthMiddleware,
    };

    return middlewares[name];
  }
}
