const tsConfigPaths = require("tsconfig-paths");
const tsConfig = require("./tsconfig");

const baseUrl = tsConfig.compilerOptions.baseUrl;
const paths = tsConfig.compilerOptions.paths;

tsConfigPaths.register({
  baseUrl,
  paths,
});

require("./dist/index");
