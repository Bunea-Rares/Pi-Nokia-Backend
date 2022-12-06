import path from "path";
import app from "./server";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.listen(3000, () => {
  console.log("hi from 3000");
});
