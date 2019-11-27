const searchRoutes = require("./search");
const detailsRoutes = require("./details");

const constructorMethod = app => {
    app.use("/search", searchRoutes);
    app.use("/details", detailsRoutes);

    app.get("/", (req, res) => {
        res.render('home', { title: 'People Finder' });
    });

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};


module.exports = constructorMethod;