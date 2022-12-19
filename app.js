const express = require("express");
const app = express();
const morgan = require("morgan");

// Best PACK for debuging Middleware: morgan
app.use(morgan("dev"));
//==================

// How we write a middleware ourselves:
app.use((req, res, next) => {
  //  console.log(`METHOD: `, req.method, `|`, `PATH: `, req.path);

  //  req.method = "POST";

  req.requestTime = Date.now();
  console.log(`METHOD: `, req.method, `|`, `PATH: `, req.path);
  next();
});
//================

// Making a simple -> authentication <- with Middleware
const verify = (req, res, next) => {
  const { password } = req.query;
  if (password === "chickenNugget") {
    next();
  } else {
    res.send("SORRY, YOU NEED A PASSWORD!!");
  }
};
//======================

// app.use((req, res, next) => {
//   console.log("Hallo. Ich bin Mehran! This is my first middleware");
//   return next();
// });

// app.use((req, res, next) => {
//   console.log("Hallo. Ich komme aus dem Iran! This is my second middleware");
//   return next();
// });

app.get("/", (req, res) => {
  res.send(`Home Page`);
});

app.get(`/secret`, verify, (req, res) => {
  res.send(
    "MY SECRET IS: SOMETIMES I WANNA RUN AWAY SO I DON'T HAVE TO MAKE EFFORTS! (JUST KIDDING☺)"
  );
});

app.get("/dogs", (req, res) => {
  console.log(`Request Date is ${req.requestTime}`);
  res.send("Woof Woof!!!");
});

app.use((req, res) => {
  res.status(404).send(`404! page was not found!`);
});
app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
