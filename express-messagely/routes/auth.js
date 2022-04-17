const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const ExpressError = require("../expressError");
const db = require("../db");
const {ensureLoggedIn, authenticateJWT, ensureCorrectUser} = require("../middleware/auth");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post("/login", async function(req, res, next){
    try {
        let { username, password } = req.body;

        // user user class method to check login then return new token, update time too
        if (await User.authenticate(username, password)) {
            let token = jwt.sign({username}, SECRET_KEY)
            User.updateLoginTimestamp(username)
            return res.json({token})
        } else {
            throw new ExpressError("Invalid username/password", 400);
        }      
   
    } catch (error) {
        next(error)
    }
})

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
 router.post("/register", async function (req, res, next) {
    try {
      let {username} = await User.register(req.body);
      let token = jwt.sign({username}, SECRET_KEY);
      User.updateLoginTimestamp(username);
      return res.json({token});
    }
  
    catch (err) {
      return next(err);
    }
  });
  

 module.exports = router;
