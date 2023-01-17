import path from "path";
import app from "./server";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

app.listen(3001, () => {
  console.log("hi from 3001");
});
