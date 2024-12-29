const express = require("express");
const { readBlog, writeBlog } = require("./helper");

const app = express();
const PORT = 8000;
let blogs = readBlog();

//middlewares
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("server is up and running...");
});

app.get("/read-blogs", (req, res) => {
  return res.send(blogs);
  //   return res.status(200).json(blogs);
});

app.get("/read-blog/:id", (req, res) => {
  const blog = blogs.find((blog) => blog.id === parseInt(req.params.id));
  if (!blog) return res.status(404).send("Blog post not found.");
  return res.send(blog);
});

app.post("/create-blog", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json("Missing blog data.");
  if (typeof title !== "string")
    return res.status(400).json("Title is not a text");
  if (typeof content !== "string")
    return res.status(400).json("Content is not a text");

  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  blogs.push(newBlog);
  writeBlog(blogs);

  return res.status(201).json({
    data: newBlog,
    message: "Blog created successfully",
  });
});

app.put("/edit-blog/:id", (req, res) => {
  const { title, content } = req.body;

  //data validation
  if (!title || !content) return res.status(400).json("Missing blog data.");
  if (typeof title !== "string")
    return res.status(400).json("Title is not a text");
  if (typeof content !== "string")
    return res.status(400).json("Content is not a text");

  //find the blog
  const blog = blogs.find((blog) => blog.id === parseInt(req.params.id));
  if (!blog) return res.status(404).send("Blog post not found.");

  //update the blog
  blog.title = req.body.title;
  blog.content = req.body.content;

  //update the json with new blogs
  writeBlog(blogs);
  return res.send("Blog updated successfully");
});

app.delete("/delete-blog/:id", (req, res) => {
  const blogId = parseInt(req.params.id);

  //filter out the required blog
  const filterBlogs = blogs.filter((blog) => blog.id !== blogId);

  //if length of new and original array is same; id is out of bound.
  if (blogs.length === filterBlogs.length)
    return res.status(404).json(`Blog with id: ${blogId} not found.`);

  //updating the original blog array
  blogs = filterBlogs;
  writeBlog(blogs);
  return res.status(200).json("Blog deleted successfully");
});

app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
