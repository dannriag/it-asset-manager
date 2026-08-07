const express = require("express");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;
const assetRoutes = require("./routes/assets");


app.use(express.json());

app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
    },
  })
);



function requireLogin(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.status(401).json({
    message: "Unauthorized"
  });
}



app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    application: "IT Asset Manager",
  });
});

app.use("/api/auth", authRoutes);




app.use("/api/assets", assetRoutes);

app.use(express.static(path.join(__dirname, "public")));


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});