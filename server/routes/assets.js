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

router.post("/", async (req, res) => {
  try {
    const {
      AssetName,
      Category,
      SerialNumber,
      Status,
      Location,
    } = req.body;

    const pool = await connectDB();

    await pool
      .request()
      .input("AssetName", AssetName)
      .input("Category", Category)
      .input("SerialNumber", SerialNumber)
      .input("Status", Status)
      .input("Location", Location)
      .query(`
        INSERT INTO Assets
        (
          AssetName,
          Category,
          SerialNumber,
          Status,
          Location
        )

        VALUES
        (
          @AssetName,
          @Category,
          @SerialNumber,
          @Status,
          @Location
        )
      `);

    res.status(201).json({
      message: "Asset created successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database error",
    });

  }
});




router.put("/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const {
      AssetName,
      Category,
      SerialNumber,
      Status,
      Location,
    } = req.body;

    const pool = await connectDB();

    await pool
      .request()
      .input("id", id)
      .input("AssetName", AssetName)
      .input("Category", Category)
      .input("SerialNumber", SerialNumber)
      .input("Status", Status)
      .input("Location", Location)
      .query(`
        UPDATE Assets

        SET

        AssetName=@AssetName,

        Category=@Category,

        SerialNumber=@SerialNumber,

        Status=@Status,

        Location=@Location

        WHERE AssetId=@id
      `);

    res.json({
      message: "Asset updated successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database error",
    });

  }

});




router.delete("/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const pool = await connectDB();

    await pool
      .request()
      .input("id", id)
      .query(`
        DELETE FROM Assets
        WHERE AssetId=@id
      `);

    res.json({
      message: "Asset deleted successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Database error",
    });

  }

});



module.exports = router;