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

async function getAllGames() {
  const { rows } = await pool.query(
    `SELECT games.id,
            games.title,
            games.price,
            games.stock_quantity,
            categories.id AS category_id,
            categories.name AS category_name
     FROM games
     JOIN categories ON categories.id = games.category_id
     ORDER BY games.title`,
  );

  return rows;
}

async function getGameById(id) {
  const { rows } = await pool.query(
    `SELECT games.id,
            games.title,
            games.description,
            games.price,
            games.stock_quantity,
            categories.id AS category_id,
            categories.name AS category_name
     FROM games
     JOIN categories ON categories.id = games.category_id
     WHERE games.id = $1`,
    [id],
  );

  return rows[0];
}

async function createCategory(name, description) {
  const { rows } = await pool.query(
    `INSERT INTO categories (name, description)
     VALUES ($1, $2)
     RETURNING id`,
    [name, description],
  );

  return rows[0];
}

async function updateCategory(id, name, description) {
  const { rows } = await pool.query(
    `UPDATE categories
     SET name = $1, description = $2
     WHERE id = $3
     RETURNING id`,
    [name, description, id],
  );

  return rows[0];
}

async function createGame(
  title,
  description,
  price,
  stockQuantity,
  categoryId,
) {
  const { rows } = await pool.query(
    `INSERT INTO games (
       title,
       description,
       price,
       stock_quantity,
       category_id
     )
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [title, description, price, stockQuantity, categoryId],
  );

  return rows[0];
}

async function updateGame(
  id,
  title,
  description,
  price,
  stockQuantity,
  categoryId,
) {
  const { rows } = await pool.query(
    `UPDATE games
     SET title = $1,
         description = $2,
         price = $3,
         stock_quantity = $4,
         category_id = $5
     WHERE id = $6
     RETURNING id`,
    [title, description, price, stockQuantity, categoryId, id],
  );

  return rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getGamesByCategoryId,
  getAllGames,
  getGameById,
  createCategory,
  updateCategory,
  createGame,
  updateGame,
};
