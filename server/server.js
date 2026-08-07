const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const assetRoutes = require("./routes/assets");

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    application: "IT Asset Manager",
  });
});

app.use("/api/assets", assetRoutes);
// Serve the React production build
app.use(express.static(path.join(__dirname, "public")));

// Return React for non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});