const path = require("path");
const fs = require("fs");

const blogFilePath = path.join(__dirname, "data", "blogs.json");

const readBlog = () => {
  try {
    const data = fs.readFileSync(blogFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeBlog = (blogs) => {
  fs.writeFileSync(blogFilePath, JSON.stringify(blogs, null, 2));
};

module.exports = { readBlog, writeBlog };
