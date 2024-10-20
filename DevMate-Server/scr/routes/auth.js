const express=require("express");
const signup=require("../reqhandles/signup");
const login = require("../reqhandles/login");
const logout = require("../reqhandles/logout");
const authRouter=express.Router();



authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout)

module.exports={authRouter};