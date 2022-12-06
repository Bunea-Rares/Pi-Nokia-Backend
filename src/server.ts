import express from "express";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import {
  confirmMail,
  createUser,
  handlePasswordReset,
  sendPasswordReset,
  signIn,
} from "./handlers/user";
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
app.get("/mailconfirmation", confirmMail);
app.post("/sendpasswordreset", sendPasswordReset);
app.post("/passwordreset", handlePasswordReset);
export default app;
