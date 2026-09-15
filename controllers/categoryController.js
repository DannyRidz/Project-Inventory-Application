exports.categoryList = (req, res) => {
  res.send("List of categories");
};

exports.categoryDetail = (req, res) => {
  res.send(`Category details for ID: ${req.params.id}`);
};

exports.categoryCreateGet = (req, res) => {
  res.send("Category creation form");
};

exports.categoryCreatePost = (req, res) => {
  res.send("Create category");
};

exports.categoryUpdateGet = (req, res) => {
  res.send(`Category update form for ID: ${req.params.id}`);
};

exports.categoryUpdatePost = (req, res) => {
  res.send(`Update category with ID: ${req.params.id}`);
};

exports.categoryDeletePost = (req, res) => {
  res.send(`Delete category with ID: ${req.params.id}`);
};
