const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionRoutes = require("./routes/transaction");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


