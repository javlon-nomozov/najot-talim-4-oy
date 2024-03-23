const express = require("express");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const { addAdmin } = require("../models/users");
const { comparePasswords } = require("../utils/bcrypt-utilities");

module.exports.createAdminPage = async (req, res) => {
  const alerts = req.flash.get("alerts");
  const data = { alerts, data: {} };
  await res.render("/admin/create", data);
};

module.exports.login = async (req, res) => {
  const data = {};
  const { username, password } = req.body;
  const [foundUser] = await getUserByUsername(username);
  if (!foundUser || !(await comparePasswords(password, foundUser.password))) {
    req.flash.set("alerts", {
      message: "Incorrect password or username",
      type: "danger",
    });
    return res.redirect("/auth/login");
  }
  req.session.user = foundUser;
  req.flash.set("alerts", {
    message: "Welcome",
    type: "success",
  });
  res.redirect(req.session.lastPage || "/");
};

exports.logout = (req, res) => {
  req.session.user = null;
  req.flash.set("alerts", { message: "Succesfully log out", type: "warning" });
  res.redirect("/auth/login");
};
