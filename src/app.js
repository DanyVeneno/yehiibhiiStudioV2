import express from "express";
import morgan from "morgan";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import firstRoutes from "./routes/index.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("combined"));
app.use(firstRoutes);
app.use(express.static(join(__dirname, "public")));

export default app;
