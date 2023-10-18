import { exit } from "process";
import { MainApp } from "~/app.bootstrap";

try {
    const mainApp = new MainApp();

    mainApp.runApp();
} catch (error) {
    exit(1);
}