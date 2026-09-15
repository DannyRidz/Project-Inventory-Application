const fs = require("node:fs");
const path = require("node:path");
const pool = require("./pool");

async function setupDatabase() {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    await pool.query(schema);
    console.log("Database tables created successfully.");
  } catch (error) {
    console.error("Failed to create database tables:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

setupDatabase();
