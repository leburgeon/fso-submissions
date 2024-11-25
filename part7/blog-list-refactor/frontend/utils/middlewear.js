const mongoose = require("mongoose");
const logger = require("./logger
const { passwordStrength } = require("check-password-strength");
const errors = require("./errors");
const jwt = require("jsonwebtoken");
const config = require("./config");
const User = require("../models/user");

const idValidationMiddlewear = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    const error = new mongoose.Error.ValidationError(null);
    error.message = "Invalid ID format";
    return next(error);
  }
  next();
};

const newPasswordValidator = (req, res, next) => {
  const password = req.body.password;

  if (!password) {
    const passwordError = new Error("password required");
    passwordError.name = "PasswordValidationError";
    return next(passwordError);
  }

  const strength = passwordStrength(password).id;
  if (strength < 1) {
    const passwordError = new Error("password too weak, try again");
    passwordError.name = "PasswordValidationError";
    return next(passwordError);
  }
  next();
};

const tokenExtractor = (req, res, next) => {
  // Retrieves the value associated with 'authorization' header
  const authorization = req.get("authorization");

  // If the string starts with 'Bearer' (the scheme for authenticating)
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
    return next();
  }
};

const userExtractor = async (req, res, next) => {
  // Gets the token from the authorization header and seperates it
  const authorization = req.get("authorization");
  if (!(authorization && authorization.startsWith("Bearer "))) {
    return next(errors.missingTokenError);
  }
  const token = authorization.replace("Bearer ", "");

  // Verifies the token against the secret and decodes it
  const validToken = jwt.verify(token, config.SECRET);
  if (!(validToken && validToken.id)) {
    return next(errors.invalidTokenError);
  }

  // Retrieves the user based on the id in the token
  const user = await User.findById(validToken.id);
  if (!user) {
    return next(errors.invalidUserError);
  }

  // Sets the user field of the request to the user found with the token id
  req.user = user;
  next();
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message }).end();
  } else if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key error")
  ) {
    res.status(400).send({ error: "username must be unique" }).end();
  } else if (err.name === "PasswordValidationError") {
    res.status(400).send({ error: err.message });
  } else if (err.name === "AuthorizationError") {
    res.status(400).send({ error: "must include token with bearer scheme" });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).send({ error: "invalid token signature" });
  } else if (err.name === "AuthenticationError") {
    res.status(401).send({ error: err.message });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).send({ error: "Token expired, re login" });
  } else if (err.name === "MissingTokenError") {
    res.status(401).send({ error: err.message });
  }
  next(err);
};

module.exports = {
  errorHandler,
  idValidationMiddlewear,
  newPasswordValidator,
  userExtractor,
  tokenExtractor,
};
