
import express, { Express } from "express";
import http from "http";
import session from "express-session";
import bodyParser from "body-parser";


import { Server } from "socket.io";


import indexRouterHandler from "./routes/index";
import loginRouteHandler from "./routes/login";
import logoutRouteHandler from "./routes/logout";

const app: Express = express();
export const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true,
}));

app.use(session({
	secret: "keyboard cat",
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 360000 * 60,
	}
}))

// serve static css files
app.use(express.static("public"));


// EJS configuration
app.set("view engine", "ejs");

indexRouterHandler(app, io);
loginRouteHandler(app);
logoutRouteHandler(app);


server.listen(PORT, () => console.log("app running in port " + PORT));
