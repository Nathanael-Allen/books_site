import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  addToReadingList,
  deleteFromReadingList,
  getReadingList,
} from "../database/booksdb.cjs";
const router = express.Router();

router.use(isLoggedIn);

router.get("/", async (req, res) => {
  const user = req.session.user;
  const books = await getReadingList(user.userID);
  res.render("pages/readingList", { books, user });
});

// Add
router.post("/add", async (req, res) => {
  const book = req.body;
  const userID = req.session.user.userID;
  await addToReadingList(book, userID);
  res.status(200).render("partials/checkmark");
});

// Delete
router.delete("/:bookID", async (req, res) => {

  const { bookID } = req.params;
  await deleteFromReadingList(bookID);
  res.redirect(303, "/readinglist");
});

export { router };
