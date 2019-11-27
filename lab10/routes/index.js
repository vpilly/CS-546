const bcrypt = require('bcrypt');
const userData = require('../data/users');

const constructorMethod = app => {

    app.use(function (req, res, next) {
        CurrentTime = new Date();
        let info = `[${CurrentTime.toUTCString()}]: ${req.method} ${req.originalUrl} `;
        if (req.session.auth)
            info += "(Authenticated User)";
        else
            info += "(Non-Authenticated User)";
        console.log(info);
        next();
    });

    app.use('/private', function (req, res, next) {
        if (!req.session.auth) {
            res.status(403);
            res.render('home', { title: "Private" });
        }
        else next();
    });


    app.get("/", (req, res) => {
        if (req.session.auth) {
            res.redirect('/private')
        }
        else {
            res.render('login', { title: 'Login' });
        }
    });

    app.get('/private', (req, res) => {
        try {
            req.session.auth.title = "Private";
            req.session.auth.auth = true;
            res.render('home', req.session.auth);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    });

    app.post('/login', async (req, res) => {
        const formData = req.body;

        if (!formData.username || !formData.password) {
            res.status(400);
            return;
        }

        formData.username = formData.username.toLowerCase();

        try {
            let confirm = false;

            const user = userData.find((element) => (element.username === formData.username));

            if (user) {
                confirm = await bcrypt.compare(formData.password, user.hashedPassword);

                if (confirm === true) {
                    req.session.auth = user;
                    res.redirect('/private');
                    return;
                }
            }
            res.status(401);
            res.render('login', { title: 'Login', hasErrors: true });
        } catch (e) {
            res.status(500).json({ error: e });
        }
    });

    app.get('/logout', async (req, res) => {
        if (req.session.auth) {
            req.session.destroy(function (err) {
                if (err) console.log(err);
            });
            res.render('logout', { title: "Logout" });
        }
        else res.redirect('/');
    });

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};


module.exports = constructorMethod;