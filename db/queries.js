const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT id, name, description FROM categories ORDER BY name",
  );

  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query(
    "SELECT id, name, description FROM categories WHERE id = $1",
    [id],
  );

  return rows[0];
}

async function getGamesByCategoryId(categoryId) {
  const { rows } = await pool.query(
    `SELECT id, title, price, stock_quantity
     FROM games
     WHERE category_id = $1
     ORDER BY title`,
    [categoryId],
  );

  return rows;
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getGamesByCategoryId,
};
