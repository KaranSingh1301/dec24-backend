const express = require("express");

const app = express();

const isAuth = (req, res, next) => {
  console.log("Inside the isAuth Middleware"); //1
  next();
};

//global middleware

app.use(isAuth);

app.get("/", (req, res) => {
  return res.send("Server is up and running....");
});

app.get("/api1", isAuth, (req, res) => {
  console.log("Inside the api1"); //2
  return res.send("api1 is working");
});

app.get("/api2", (req, res) => {
  console.log("Inside the api2"); //3
  return res.send("api2 is working");
});

// /data?key=val
app.get("/data", (req, res) => {
  console.log(req.query);
  const { key } = req.query;
  return res.send(`Value for key = ${key}`);
});

// /data?key1=val1&key2=val2
app.get("/data1", (req, res) => {
  console.log(req.query);
  const { key1, key2, key3 } = req.query;
  return res.send(`Value for key1= ${key1}, key2= ${key2}, key3= ${key3}`);
});

// /data?key=val1,val2,val3
app.get("/data2", (req, res) => {
  console.log(req.query.key.split(","));
  return res.send(`Value for key1=`);
});

//params
app.get("/profile/:name", (req, res) => {
  console.log(req.params);
  return res.send("Dynamic params is working");
});

app.get("/profile/:fname/:lname", (req, res) => {
  console.log(req.params);
  return res.send("Dynamic params is working");
});

app.listen(8000, () => {
  console.log("server is running on PORT:8000");
});
