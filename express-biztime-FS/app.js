/** BizTime express application. */
const express = require("express");
const compRoutes = require("./routes/companies")
const invoRoutes = require("./routes/invoices")
const app = express();
const ExpressError = require("./expressError")

app.use(express.json());

// Adding the prefixes to the approrate routes:
app.use("/companies", compRoutes)
app.use("/invoices", invoRoutes)


/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


module.exports = app;
