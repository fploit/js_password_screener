import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

const getDbConnection = async () => {
  // Path to the credentials.db file in the pages/api directory
  const dbPath = path.resolve(process.cwd(), "pages/api/credentials.db");

  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  // Ensure the table exists
  await db.exec("CREATE TABLE IF NOT EXISTS credentials (link TEXT, username TEXT, password TEXT)");

  return db;
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { link } = req.query;

  if (!link) {
    res.status(400).json({ error: "Link query parameter is required" });
    return;
  }

  try {
    const db = await getDbConnection();
    const rows = await db.all(
      "SELECT username, password FROM credentials WHERE link LIKE ?",
      [`%${link}%`]
    );
    await db.close();

    // Transform the response to the desired format
    const transformedData = rows.map((item, index) => ({
      id: index,
      url: link,
      username: item.username,
      password: item.password,
    }));

    res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
