import type { Express } from "express";

const loginRouteHandler = (app: Express) => {
    app.get("/login", (req:any, res) => {
        if(req.session.user){
            res.redirect('/');
            return;
        }
        res.render("login");  
    })

    app.post("/login", (req:any, res) => {
        req.session.user = { name: req.body.name };
        res.redirect("/");
    })
}


export default loginRouteHandler;