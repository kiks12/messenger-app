// import express from "express";
import type { Express} from "express";


function indexRouterHandler(app: Express, io:any) {

    app.get("/", (req:any, res) => {
        if (!req.session.user) {
            res.redirect('/login');
            return;
        }
        res.render("index", { 
            username: req.session.user.name,
         });
    })
    
    io.on('connection', (socket:any) => {
        console.log('connected');
        socket.on("chat-to-server", (payload: any) => {
            console.log(payload);
            socket.broadcast.emit("chat-to-client", payload);
        })
        
        socket.on("disconnect", () => {
            console.log("disconnected");
        })
    })

}


export default indexRouterHandler;