import { router as reviews } from "./routes/reviews.js";
import { router as books } from "./routes/books.js";
import { router as user } from "./routes/user.js";
import { router as readingList } from "./routes/readingList.js"
import { SQLiteStore, session } from "./middleware/session.cjs";
import express from "express";
import { getAllReviews, getTotalReviewPages } from "./database/booksdb.cjs";
const app = express();
const port = process.env.PORT;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session
app.use(
  session({
    store: new SQLiteStore({
      table: "sessions",
      dir: "private",
      createDirIfNotExists: "false",
      concurrentDB: "false",
    }),
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 90000000, secure: false, sameSite: "strict" },
  })
);

// view engine
app.set("view engine", "ejs");

// routes
app.use("/books", books);
app.use('/readinglist', readingList)
app.use("/reviews", reviews);
app.use('/user', user)

app.get("/", async (req, res) => {
  res.redirect(301, "/reviews");
});

app.listen(port, () => {
  console.log(`Server active and listening on ${port}`);
});
