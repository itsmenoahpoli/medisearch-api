import { RequireAuthMiddleware } from "~/middlewares";

export class MiddlewaresService {
	public getMiddleware(name: string) {
		const middlewares: any = {
			requireAuth: RequireAuthMiddleware,
		};

		return middlewares[name];
	}
}