"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInHandler = exports.signUpHandler = void 0;
var signUp_1 = require("./signUp");
Object.defineProperty(exports, "signUpHandler", {
  enumerable: true,
  get: function () {
    return signUp_1.handler;
  },
});
var signIn_1 = require("./signIn");
Object.defineProperty(exports, "signInHandler", {
  enumerable: true,
  get: function () {
    return signIn_1.handler;
  },
});
