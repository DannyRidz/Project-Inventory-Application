const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    "SELECT id, name, description FROM categories ORDER BY name",
  );

  return rows;
}

module.exports = {
  getAllCategories,
};
