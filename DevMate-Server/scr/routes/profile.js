const express = require("express");
const Auth = require("../utils/Auth");
const getProfile=require("../reqhandles/getProfile");
const delProfile = require("../reqhandles/delProfile");
const editProfile = require("../reqhandles/editProfile");
const profileRouter = express.Router();

profileRouter.get("/profile", Auth, getProfile);
profileRouter.patch("/profile/edit",Auth,editProfile);

module.exports = {
  profileRouter,
};
