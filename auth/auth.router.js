const { Router } = require("express");
const { AuthController } = require("./auth.controller");

const authRouter = Router();

authRouter.post(
  "/signup",
  AuthController.validateRegisterUser,
  AuthController.registerUser
);

authRouter.post(
  "/login",
  AuthController.validateLoginUser,
  AuthController.logInUser
);

authRouter.get("/current", AuthController.authorize, AuthController.getCurrent);

authRouter.delete(
  "/current",
  AuthController.authorize,
  AuthController.deleteCurrentUser
);

authRouter.patch("/logout", AuthController.authorize, AuthController.logOut);

module.exports = {
  authRouter,
};
