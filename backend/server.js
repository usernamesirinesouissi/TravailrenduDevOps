const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const messages = require("./routes/api/messages");
const postes = require("./routes/api/Post");

const app = express();
app.use(express.json());
app.use(cors());

// Utilisation de la configuration mongo_url de config
const mongo_url = config.get("mongo_url");

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/messages", messages);
app.use("/api/Post", postes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
