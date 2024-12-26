// const fun1 = require("./test");
// const { fun1, fun2 } = require("./test");
// fun1();
// fun2();

const express = require("express");
const app = express();

//middleware
app.use(express.urlencoded({ extended: true })); //url-encoded (HTML form)
app.use(express.json()); //JSON (postman, axios)

app.get("/", (req, res) => {
  return res.send("Server is up and running...");
});

app.get("/get-form", (req, res) => {
  return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>User form</h1>
    <form action="/create-user" method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"></input>
        <br>

        <label for="email">Email:</label>
        <input type="text" id="email" name="email"></input>
        <br>

        <label for="password">Password:</label>
        <input type="text" id="password" name="password"></input>
        <br>
        <button type="submit">Submit form</button>
    </form>
</body>
</html>`);
});

app.post("/create-user", (req, res) => {
  console.log(req.body);
  return res.send("Form submitted successfully");
});

app.listen(8000, () => {
  console.log("server is running at PORT:8000");
});
