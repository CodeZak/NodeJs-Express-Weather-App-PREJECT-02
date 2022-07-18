const express = require("express");
const app = express();
const path = require("path");
const getTemprature = require("./utils/forecast");
/**************/
const port = process.env.PORT || 3000
const cors = require("cors");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

/****************/

/*********** Auto-refresh *******/
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "../public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

/*****************************/
const hbs = require("hbs");
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partalsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partalsPath);
//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/help", (req, res) => {
    res.render("help", {
        name: "Zakariae",
        title: "Help",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Zakariae",
    });
});
/******************************************** */
app.get("", (req, res) => {

    
    getTemprature(req.query.city, (error, data) => {
        if (error) {
            res.render("index", {
                title: "Weather",
                name: "Zakariae",
                result: error,
            });
        } else {
            res.render("index", {
                title: "Weather",
                name: "Zakariae",
                result: data,
            });
        }
    });
});

/************************************** */

app.get("/weather", (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: "you must provide a city",
        });
    }
    getTemprature(req.query.city, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        res.send({
            forecast: "ok",
            title: "Weather",
            location: req.query.city,
            result: data,
        });
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Zakariae",
        errorMessage: "help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Zakariae",
        errorMessage: "404- page not found",
    });
});

app.listen(port, () => {
    console.log("server is up on port" + port);
});

/* nodemon src/app.js */
/* npm uninstall nodemon */
/* npm run watch */
/* nodemon src/app.js -e js,hbs*/
