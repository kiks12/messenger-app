import type { Express } from "express";

const logoutRouteHandler = (app:Express) => {
    app.get("/logout", (req:any, res) => {
        req.session.destroy();
        res.redirect("/");
    })
}


export default logoutRouteHandler;