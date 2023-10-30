"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_bootstrap_1 = require("./src/app.bootstrap");
try {
    const mainApp = new app_bootstrap_1.MainApp();
    mainApp.runApp();
}
catch (error) {
    process.exit(1);
}
