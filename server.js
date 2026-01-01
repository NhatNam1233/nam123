import express from "express";
import cors from "cors";
import { db } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* Thêm vào giỏ */
app.post("/cart", async (req, res) => {
  const { name, price } = req.body;

  await db.execute(
    "INSERT INTO cart_items (name, price, quantity) VALUES (?, ?, 1)",
    [name, price]
  );

  res.json({ message: "Đã thêm vào giỏ" });
});

/* Lấy giỏ hàng */
app.get("/cart", async (_, res) => {
  const [rows] = await db.execute("SELECT * FROM cart_items");
  res.json(rows);
});

/* Thanh toán */
app.delete("/cart", async (_, res) => {
  await db.execute("DELETE FROM cart_items");
  res.json({ message: "Đã thanh toán" });
});

app.listen(3001, () =>
  console.log("Server running http://localhost:3001")
);
