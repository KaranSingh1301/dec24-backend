const express = require("express"); //ES5

const app = express();

app.get("/karan", (req, res) => {
  console.log("/login api is working");
  console.log(req);
  return res.send("/login GET api is working");
});

app.listen(8000, () => {
  console.log("server is running on PORT:8000");
});
