// import express from "express";
import type { Express} from "express";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


function indexRouterHandler(app: Express, io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {

    var users : any[] = [];

    app.get("/", (req:any, res) => {
        if (!req.session.user) {
            res.redirect('/login');
            return;
        }
        res.render("index", { 
            username: req.session.user.name,
         });
    })
    
    io.on('connection', (socket) => {
        
        socket.on("user-connected", async (payload: any) => {
            const newUser = {
                id: socket.id,
                name: payload,
            }
            await users.push(newUser);
            console.log(users);
            socket.broadcast.emit("new-user-connected", newUser);
        })

        socket.emit("connected", users);

        socket.on("chat-to-server", (payload: any) => {
            socket.broadcast.emit("chat-to-client", payload);
        })
        
        socket.on("disconnect", async () => {
            const disconnectedUser = await users.filter(user => user.id !== socket.id);
            users = disconnectedUser;
            socket.broadcast.emit("user-disconnected", users);
        })
    })

}


export default indexRouterHandler;
