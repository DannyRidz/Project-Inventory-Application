const pool = require("./pool");

async function testConnection() {
  try {
    const result = await pool.query("SELECT current_database()");
    console.log(`Connected to: ${result.rows[0].current_database}`);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

testConnection();
