import express, { Express } from "express";
import http from "http";
// import path from "path";

import { Server } from "socket.io";

const app: Express = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


const io = new Server(server);


// serve static css files
app.use(express.static("public"));


// EJS configuration
app.set("view engine", "ejs");


app.get("/", (_req, res) => {
	res.render("index");
});


io.on('connection', (socket) => {
	console.log('connected');

	socket.on("chat-to-server", (payload) => {
		console.log(payload);
		socket.broadcast.emit("chat-to-client", payload);
	})

	socket.on("disconnect", () => {
		console.log("disconnected");
	})
})


server.listen(PORT, () => console.log("app running in port " + PORT));
