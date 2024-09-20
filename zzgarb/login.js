import express from "express";
import { validUsername } from "../middleware/validUsername.js";
import pkg from "../database/usersdb.cjs";
const { validateUser, addUser } = pkg;
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
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

router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect(301, "../");
  } else {
    res.render("pages/login", { user: undefined });
  }
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

router.get("/logout", (req, res) => {
  req.session.destroy();
  const user = req.session;
  let message = "Logged out!";
  res.render("partials/successfulLogin", { user, message });
});

export { router };
