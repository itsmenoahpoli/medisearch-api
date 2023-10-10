import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

export class App {
  public app: Application;

  constructor() {
    this.app = express();
  }

  public run() {
    const PORT = process.env.PORT || 5000;

    this.app.listen(PORT, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`[Application]: App running in http://127.0.0.1:${PORT}`);
      }
    });
  }

  private init() {
    //
  }

  private initRoutes(app: Application) {
    //
  }

  private initMiddlewares(app: Application) {
    //
  }
}
