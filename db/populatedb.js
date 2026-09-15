const pool = require("./pool");

const categories = [
  {
    name: "Action",
    description: "Fast-paced games focused on combat and movement.",
  },
  {
    name: "Adventure",
    description: "Games focused on exploration, stories, and discovery.",
  },
  {
    name: "Role-Playing",
    description: "Story-driven games featuring character progression.",
  },
  {
    name: "Sports",
    description: "Games based on competitive sports.",
  },
  {
    name: "Strategy",
    description: "Games that reward planning and tactical decisions.",
  },
];

const games = [
  {
    title: "Hades",
    description: "Battle out of the Underworld in this action roguelike.",
    price: 24.99,
    stockQuantity: 8,
    categoryName: "Action",
  },
  {
    title: "The Legend of Zelda: Breath of the Wild",
    description: "Explore a vast kingdom and uncover its secrets.",
    price: 59.99,
    stockQuantity: 6,
    categoryName: "Adventure",
  },
  {
    title: "Baldur's Gate 3",
    description: "A party-based fantasy role-playing adventure.",
    price: 59.99,
    stockQuantity: 5,
    categoryName: "Role-Playing",
  },
  {
    title: "EA Sports FC 26",
    description: "Build a team and compete in football matches.",
    price: 69.99,
    stockQuantity: 12,
    categoryName: "Sports",
  },
  {
    title: "Civilization VI",
    description: "Build an empire that stands the test of time.",
    price: 29.99,
    stockQuantity: 7,
    categoryName: "Strategy",
  },
];

async function populateDatabase() {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      "TRUNCATE TABLE games, categories RESTART IDENTITY CASCADE",
    );

    const categoryIds = {};

    for (const category of categories) {
      const { rows } = await client.query(
        `INSERT INTO categories (name, description)
         VALUES ($1, $2)
         RETURNING id`,
        [category.name, category.description],
      );

      categoryIds[category.name] = rows[0].id;
    }

    for (const game of games) {
      await client.query(
        `INSERT INTO games (
           title,
           description,
           price,
           stock_quantity,
           category_id
         )
         VALUES ($1, $2, $3, $4, $5)`,
        [
          game.title,
          game.description,
          game.price,
          game.stockQuantity,
          categoryIds[game.categoryName],
        ],
      );
    }

    await client.query("COMMIT");
    console.log("Database populated successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Failed to populate database:", error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

populateDatabase();
