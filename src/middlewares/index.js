const { Router, urlencoded, static } = require("express");
const session = require("express-session");
const { join: path } = require("path");

require("dotenv").config();

const router = Router();

router.use(
  session({
    secret: process.env.SECRET_KEY || "very_secret",
    resave: false,
    saveUninitialized: true,
    // store
  })
);
router.use(require("./customFlash"));
router.use((req, res, next) => {
  // set current user
  req.user = req.session.user;
  res.locals.currentUser = req.user;
  // set default variables to locals
  res.locals.title = "User Manegment System";
  res.locals.alerts = undefined;
  next();
});
// use body parser
router.use(urlencoded({ extended: false }));
// Set EJS as static folder
router.use("/assets", static(path(__dirname, "..", "public")));

module.exports = router;
