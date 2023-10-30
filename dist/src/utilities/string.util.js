"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify = (str) => {
    return str.replaceAll(" ", "-").toLowerCase();
};
exports.slugify = slugify;
