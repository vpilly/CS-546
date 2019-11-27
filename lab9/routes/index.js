const constructorMethod = app => {

    app.get("/", (req, res) => {
        res.render('main', { layout: false });
    });

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};


module.exports = constructorMethod;