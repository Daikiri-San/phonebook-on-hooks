const { createControllerProxy } = require("../controllerProxy");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel } = require("./users.model");

class AuthController {
  constructor() {
    this._saltRounds = 8;
  }

  async registerUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await userModel.findUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email in use" });
      }
      const passwordHash = await this.hashPassword(password);

      const createdUser = await userModel.createUser({
        name,
        email,
        contacts: [],
        password: passwordHash,
      });

      const token = this.createToken(createdUser._id);
      await userModel.updateUserById(createdUser._id, { token });

      return res.status(201).json({
        message: "You have registrated",
        user: {
          email: createdUser.email,
          name: createdUser.name,
        },
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  async logInUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const existingUser = await userModel.findUserByEmail(email);
      if (!existingUser) {
        return res.status(400).json({ message: "Email is not registrate" });
      }

      const isPasswordCorrect = await this.comparePassword(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid login or password" });
      }

      const token = this.createToken(existingUser._id);
      await userModel.updateUserById(existingUser._id, { token });

      return res.status(200).json({
        user: {
          name: existingUser.name,
          email: existingUser.email,
        },
        token,
      });
    } catch (err) {
      next(err);
    }
  }

  async authorize(req, res, next) {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      try {
        jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const user = await userModel.findUserByToken(token);
      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }

      req.user = user;
      req.token = token;

      next();
    } catch (err) {
      next(err);
    }
  }

  async logOut(req, res, next) {
    try {
      await userModel.updateUserById(req.user._id, { token: null });
      return res.status(200).json({ message: "Logout success" });
    } catch (err) {
      next(err);
    }
  }

  validateLoginUser(req, res, next) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(422).json({ message: "missing required email field" });
    }
    if (typeof email !== "string") {
      return res.status(422).json({ message: "email is not a string" });
    }
    if (!password) {
      return res
        .status(422)
        .json({ message: "missing required password field" });
    }
    if (typeof password !== "string") {
      return res.status(422).json({ message: "password is not a string" });
    }
    next();
  }

  validateRegisterUser(req, res, next) {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(422).json({ message: "missing required name field" });
    }
    if (typeof name !== "string") {
      return res.status(422).json({ message: "name is not a string" });
    }
    if (!email) {
      return res.status(422).json({ message: "missing required email field" });
    }
    if (typeof email !== "string") {
      return res.status(422).json({ message: "email is not a string" });
    }
    if (!password) {
      return res
        .status(422)
        .json({ message: "missing required password field" });
    }
    if (typeof password !== "string") {
      return res.status(422).json({ message: "password is not a string" });
    }
    next();
  }

  async getCurrent(req, res, next) {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }
      return res.status(200).json({ name: user.name, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  async deleteCurrentUser(req, res, next) {
    try {
      await userModel.deleteUserById(req.user._id);
      return res.status(200).json({ message: "Delete success" });
    } catch (err) {
      next(err);
    }
  }

  async hashPassword(password) {
    return bcryptjs.hash(password, this._saltRounds);
  }

  async comparePassword(password, passwordHash) {
    return bcryptjs.compare(password, passwordHash);
  }

  createToken(uid) {
    return jwt.sign({ uid }, process.env.JWT_SECRET);
  }
}

module.exports = {
  AuthController: createControllerProxy(new AuthController()),
};
