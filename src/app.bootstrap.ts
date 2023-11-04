import express, { Application, Request } from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import fileUpload from "express-fileupload";
import cors from "cors";

import { AppRouter } from "~/router";
import { ErrorHandlerMiddleware } from "~/middlewares";

dotenv.config();

const RATE_LIMIT_CONFIG = {
  windowMs: 600000,
  max: 50,
};

export class MainApp {
  public app: Application;
  private appRouter: AppRouter;

  constructor() {
    this.app = express();
    this.appRouter = new AppRouter();
    this.initializeApp();
  }

  private initializeApp() {
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(fileUpload({ createParentPath: true }));
    this.app.use(cors());
    this.app.use(rateLimit(RATE_LIMIT_CONFIG));
    this.app.disable("powered-by");
    this.initializeAppRoutes(this.app);
    this.initializeAppMiddlewares(this.app);
  }

  private initializeAppRoutes(app: Application) {
    this.appRouter.initializeApiRoutes(app);
  }

  private initializeAppMiddlewares(app: Application) {
    app.use(ErrorHandlerMiddleware);
  }

  public runApp() {
    const PORT = process.env.APP_PORT || 5000;

    if (!PORT) {
      console.error(`[ERROR]: no app port specified, please fix.`);
      process.exit();
    }

    this.app.listen(process.env.APP_PORT, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[APPLICATION]: App running in http://localhost:${PORT}`);
      }
    });
  }
}
