/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

//Setting up express for exports Routers is needed and being imported from express with key word require...
const { Router } = require("express");

const { check } = require("express-validator");

//importing custom middleware
const { validarCampos } = require("../middlewares/filed-validator");

//const router = express.Router importing router from Routes
const router = Router();

//importing request handlers from controllers.
const {
  createUser,
  userLogin,
  tokenValidation,
} = require("../controllers/auth");

//Importing validate-jwt

const { validateJWT } = require("../middlewares/validate-jwt");

//Setting the request methods. Method logic is define on the controllers folder.
router.post(
  "/new",

  [
    //middlewares

    //Check evaluates a field and returns an error message on falsy.
    check("name", "The name is required.").not().isEmpty(),

    //Check if it's email and includes @
    check("email", "The email is required.").isEmail(),

    //Check if lenght is longer than 6
    check(
      "password",
      "The password is required, should be 6 digits long"
    ).isLength({ min: 6 }),
    //Custom middleware
    validarCampos,
  ],

  createUser
);

router.post(
  "/",

  [
    //middlewares
    //Check if it's email and includes @
    check("email", "The email is required.").isEmail(),

    //Check if lenght is longer than 6
    check(
      "password",
      "The password is required, should be 6 digits long"
    ).isLength({ min: 6 }),

    //Custom middleware
    validarCampos,
  ],

  userLogin
);

router.get("/renew", validateJWT, tokenValidation);

module.exports = router;
