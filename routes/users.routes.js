const express = require("express");
const router = express.Router();
const helper = require("../helpers/helper");
const passport = require("passport");
const filename = "./data/users.json";
const bcrypt = require("bcryptjs");
const users = require("../data/users.json");


// Register New User:
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const id = { id: helper.getNewId(users) };
  try {
    const user = await helper.userExists(username);
    if (user) {
      req.flash('error', 'User already exists!');
      return res.redirect("register");
    }
    // Hash password before storing in local DB:
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = { ...id, username, password: hashPassword};
    
    // Store new user in local DB
    await users.push(newUser);
    await helper.writeJSONFile(filename, users);

    res.redirect("login");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Log In User:
router.post("/login", 
passport.authenticate("local",{ 
  successRedirect: '../',
  failureRedirect: "./login",
  failureFlash: true,
}))

// Log out user:
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("../");
});

router.get("/register", checkIsAuthenticated, (req, res) => {
  res.render("register", {message: req.flash('error')});
});

router.get("/login", checkIsAuthenticated, (req, res) => {
  res.render("login");
});

module.exports = router;


function checkIsAuthenticated(req,res,next){
  if (req.isAuthenticated()) {
    return res.redirect("../")
  }
  next();
}

