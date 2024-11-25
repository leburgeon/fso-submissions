const missingTokenError = new Error("Must provide token with bearer scheme");
missingTokenError.name = "MissingTokenError";

const invalidTokenError = new Error("Token is invalid");
invalidTokenError.name = "AuthenticationError";

const invalidUserError = new Error(
  "That token is no longer associated with a user",
);
invalidUserError.name = "AuthenticationError";

const authorizationError = new Error(
  "This user does not have authorisation to perform this action",
);
authorizationError.name = "AuthorisationError";

module.exports = {
  missingTokenError,
  invalidTokenError,
  invalidUserError,
  authorizationError,
};
