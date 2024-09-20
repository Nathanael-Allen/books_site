import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { validUsername } from "../middleware/validUsername.js";
import pkg from "../database/usersdb.cjs";
const { validateUser, addUser } = pkg;
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
  const user = req.body;
  if (user.username && user.password) {
    const validUser = await validateUser(user.username, user.password);
    if (validUser) {
      req.session.user = {
        userID: Number(validUser.userID),
        username: validUser.username,
      };
      const user = req.session.user;
      let message = `Welcome ${user.username}!`;
      res.status(200).render("partials/successfulLogin", { user, message });
    } else {
      res.render("partials/invalid");
    }
  } else {
    console.log("no data in form");
    res.render("partials/invalid");
  }
});

router.get("/login", (req, res) => {
  res.render("pages/login", { user: undefined });
});

router.get("/create", (req, res) => {
  res.render("pages/createAccount");
});

router.post("/create", async (req, res) => {
  const newUser = req.body;
  const username = newUser.username;
  const password = newUser.password;
  if (!validUsername(username)) {
    res.send("invalid");
    return;
  } else if (username && password) {
    try {
      await addUser(username, password);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
    let message = "Account created!";
    res.render("partials/success", { message });
  } else {
    res.send("invalid");
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  res.redirect(301, '/user/login')
});

export { router };
