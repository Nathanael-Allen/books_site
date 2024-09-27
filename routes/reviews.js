import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  addReview,
  addToReadingList,
  deleteFromReadingList,
  deleteReview,
  getAllReviews,
  getGoogleBooks,
  getImageSrc,
  getNextReviews,
  getNextUserReviews,
  getReadingList,
  getTotalReviewPages,
  getTotalUserReviews,
  getUserReviews,
  searchReviews,
} from "../database/booksdb.cjs";
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// All Reviews
router.get("/", async (req, res) => {
  let pageNum = Number(req.query.page);
  const user = req.session.user;
  const totalPages = await getTotalReviewPages();
  if (pageNum > totalPages || !pageNum) {
    pageNum = 1;
  }
  const books = await getNextReviews(pageNum);
  const page = { number: pageNum, total: totalPages };
  res.render("pages/reviews", { books, user, page });
});

router.get("/page/:page", async (req, res) => {
  let { page: pagenum } = req.params;
  pagenum = Number(pagenum);
  const books = await getNextReviews(pagenum);
  const totalPages = await getTotalReviewPages();
  const page = { number: pagenum, total: totalPages };
  res.render("partials/allReviews", { books, page });
});

// Search
router.post("/search", async (req, res) => {
  const { searchBar: search } = req.body;
  let page = { page: 1, total: 1 };
  if (search) {
    let books = await searchReviews(search);
    res.render("partials/allReviews", { books, page });
  } else {
    let books = await getAllReviews();
    res.render("partials/allReviews", { books, page });
  }
});

// My reviews
router.get("/myreviews", isLoggedIn, async (req, res) => {
  let pageNum = Number(req.query.page);
  const user = req.session.user;
  const totalPages = await getTotalUserReviews(user.userID);
  if (pageNum > totalPages || !pageNum) {
    pageNum = 1;
  }
  const books = await getNextUserReviews(pageNum, user.userID);
  const page = { number: pageNum, total: totalPages };
  res.render("pages/myReviews", { books, page, user });
});

router.get("/myreviews/page/:page", isLoggedIn, async (req, res) => {
  let { page: pagenum } = req.params;
  pagenum = Number(pagenum);
  const { userID } = req.session.user;
  const totalPages = await getTotalUserReviews(userID);
  const page = { number: pagenum, total: totalPages };
  res.render("partials/userReviews", { books, page });
});

// Add Review
router.post("/add", isLoggedIn, async (req, res) => {
  const book = req.body;
  const { userID: user } = req.session.user;
  await addReview(book, user);
  res.redirect(301, "/reviews");
});

router.post("/add/form", isLoggedIn, async (req, res) => {
  const { userID: user } = req.session.user;
  const book = req.body;
  if (book.book_id) {
    const { imageSrc } = await getImageSrc(book.book_id);
    book.imageSrc = imageSrc;
  }
  res.status(200).render("pages/addReview", { book, user });
});

// Delete Review
router.delete("/delete/:reviewID", async (req, res) => {
  const reviewID = req.params.reviewID;
  const userID = req.session.user.userID;
  await deleteReview(reviewID);
  const books = await getUserReviews(userID);
  const totalPages = getTotalUserReviews(userID);
  const page = { number: 1, total: totalPages };
  res.status(200).render("partials/userReviews", { books, page });
});

export { router };
