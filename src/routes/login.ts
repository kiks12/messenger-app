import type { Express } from "express";

const loginRouteHandler = (app: Express) => {
    app.get("/login", (_req, res) => {
        res.render("login");  
    })

    app.post("/login", (req:any, res) => {
        req.session.user = { name: req.body.name };
        res.redirect("/");
    })
}


export default loginRouteHandler;