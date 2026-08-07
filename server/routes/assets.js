const express = require("express");
const router = express.Router();

const { connectDB } = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const pool = await connectDB();

    const result = await pool.request().query(`
      SELECT *
      FROM Assets
      ORDER BY AssetId
    `);

    res.json(result.recordset);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error"
    });
  }
});

module.exports = router;