import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { validUsername } from "../middleware/validUsername.js";
import pkg from "../database/usersdb.cjs";
const { validateUser, addUser, checkUsername } = pkg;
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
  const user = req.body;
  let errorMessage;
  if (user.username && user.password) {
    const validUser = await validateUser(user.username, user.password);
    if (validUser) {
      req.session.user = {
        userID: Number(validUser.userID),
        username: validUser.username,
      };
      const user = req.session.user;
      let message = `Welcome ${user.username}!`;
      res.setHeader("HX-Redirect", "/reviews");
      res.status(200).render("partials/successfulLogin", { user, message });
    } else {
      errorMessage = "Invalid credentials...";
      res.render("partials/errorMessage", { errorMessage });
    }
  } else {
    errorMessage = "Blank fields not allowed...";
    res.render("partials/errorMessage", { errorMessage });
  }
});

router.get("/login", (req, res) => {
  res.render("pages/login", { user: undefined });
});

router.get("/create", isLoggedIn, (req, res) => {
  res.render("pages/createAccount", { user: undefined });
});

router.post("/create", async (req, res) => {
  const newUser = req.body;
  const username = newUser.username;
  const password = newUser.password;
  let errorMessage;
  if (!(await checkUsername(username))) {
    errorMessage = "Username already exists";
    res.render("partials/errorMessage", { errorMessage });
    return;
  }
  if (!validUsername(username)) {
    errorMessage = "Invalid Username or password";
    res.render("partials/errorMessage", { errorMessage });
    return;
  } else if (username && password) {
    try {
      await addUser(username, password);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
    let message = "Account created!";
    res.setHeader("HX-Retarget", "main");
    res.render("partials/success", { message });
  } else {
    errorMessage = "Something went wrong sorry...";
    res.render("partials/errorMessage", { errorMessage });
  }
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  res.setHeader("HX-Redirect", "/user/login")
  res.status(200).send('')
});

export { router };
