function isLoggedIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect(301, "/user/login");
  }
}

export { isLoggedIn };
