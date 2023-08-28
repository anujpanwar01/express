const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  console.log("middleware 1 hai ye");
  res.send("<h3>users </h3>");
});

app.use("/", (req, res, next) => {
  res.send("<h3>home page</h3>");
});
// app.use((req, res, next) => {
//   console.log("middleware 2 hai ye");
//   res.send("<h2>hello this is middleware 2</h2>");
// });

app.listen(8080);
