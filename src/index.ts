import express, { Express } from "express";
import path from "path";

const app: Express = express();
const PORT = 3000;

// serve static css files
app.use(express.static("public"));

// EJS configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (_req, res) => {
	res.render("index");
});

app.listen(PORT, () => console.log("app running in port " + PORT));
