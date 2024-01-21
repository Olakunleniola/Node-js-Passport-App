if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

// Import packages
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const flash = require('express-flash')


// App config
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(flash())
// Import Passport config


// Session Config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 3000000,},
    saveUninitialized: false,
    resave: false,
  })
);

const helper = require("./helpers/helper");

// Set up the Passport strategy:
passport.use(new LocalStrategy( function (username, password, done) {
  helper.findByUsername(username, async (err, user) => {
    try {
      if(err){ return done(err)}
      if(!user){ return done(null, false, {message: "User not found"})}
      const matchedPassword =  await bcrypt.compare(password, user.password)
      if(!matchedPassword){ 
        return done(null, false, {message: "Incorrect Password"})}
      return done(null, user)  
    }catch(e) {
      console.log(e.message)
    }
  })
}));
// Serialize a user
passport.serializeUser((user, done) => done(null, user.id))
// Deserialize a user
passport.deserializeUser((id, done) => {
  helper.findById(id, (err, user) => {
    if(err){return done(err)}
    done(null, user)
  })
})

// Passport Config
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require("./routes/index.routes"));

app.get("/", (req, res) => {
  const user = req.user || "Guest";
  res.render("home", { user });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
