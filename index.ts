import { MainApp } from "~/app.bootstrap";

try {
  const mainApp = new MainApp();

  mainApp.runApp();
} catch (error) {
  process.exit(1);
}
