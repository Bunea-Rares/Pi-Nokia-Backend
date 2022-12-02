import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createUser, signIn } from "./handlers/user";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mom", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.json({ message: "Hi mom!" });
});

app.use("/api", protect, router);

app.post("/register", createUser);
app.post("/signin", signIn);
export default app;
