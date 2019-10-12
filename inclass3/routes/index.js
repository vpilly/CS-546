const peopleRoutes = require('./people');
const infoRoutes = require('./myinfo');


const constructorMethod = app => {
    app.use("/people", peopleRoutes);
    app.use("/myinfo", infoRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

module.exports = constructorMethod;