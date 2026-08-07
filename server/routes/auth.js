const express = require("express");
const router = express.Router();

const { connectDB } = require("../config/db");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("username", username)
      .input("password", password)
      .query(`
        SELECT UserId,
               Username,
               FullName,
               Role

        FROM Users

        WHERE Username=@username
        AND Password=@password
      `);

    if (result.recordset.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password."
      });

    }

    const user = result.recordset[0];

    req.session.user = user;

    res.json({
      message: "Login successful.",
      user
    });

  }
  catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error."
    });
  }
});

router.get("/session", (req, res) => {
  if (req.session.user) {
    return res.json({
      authenticated: true,
      user: req.session.user
    });
  }
  res.json({
    authenticated: false
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({
      message: "Logged out."
    });
  });
});

module.exports = router;