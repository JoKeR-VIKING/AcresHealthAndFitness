const mysql = require("mysql");

module.exports.login = function (req, res) {
    if (req.session.email)
        return res.redirect('/');

    return res.render('login', {
        title: "Acres Fitness Club | Login",
        email: req.session.email,
        isClient: req.session.isClient
    });
};

module.exports.signup = function (req, res) {
    if (req.session.email)
        return res.redirect('/');

    return res.render('signup', {
        title: "Acres Fitness Club | Login",
        email: req.session.email,
        isClient: req.session.isClient
    });
};

module.exports.trainer = function (req, res) {
    if (req.session.email)
        return res.redirect('/');

    return res.render('trainer', {
        title: "Acres Fitness Club | Trainer",
        email: req.session.email,
        isClient: req.session.isClient
    });
};

module.exports.newUser = function (req, res) {
    if (req.session.email)
        return res.redirect('/back');

    const check = `SELECT * FROM clients WHERE email = '${req.body.email}'`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbms'
    });

    connection.query(check, function (err, result) {
        if (err)
        {
            console.log('Cannot run query!', err)
            return;
        }

        if (result.length === 0 && req.body.password === req.body.confirmpassword)
        {
            const insert = `INSERT INTO clients VALUES ('${req.body.email}', '${req.body.password}', '1999-01-01')`;

            connection.query(insert, function (err) {
                if (err)
                {
                    console.log('Cannot run query!', err)
                    return;
                }

                console.log("Successfully inserted!");
                req.session.email = req.body.email;
                req.session.isClient = true;
            });
        }
    });

    return res.redirect('/');
};

module.exports.oldUser = function (req, res) {
    if (req.session.email)
        return res.redirect('back');

    let check = `SELECT * FROM clients WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbms'
    });

    connection.query(check, function (err, result) {
        if (err)
        {
            console.log('Cannot run query!', err)
            return;
        }

        if (result.length === 1)
        {
            req.session.email = req.body.email;
            req.session.isClient = true;
            console.log("Logged in!");
            return res.redirect('/');
        }
        else
        {
            // check = `SELECT * FROM trainers WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
            // connection.query(check, function (err, result) {
            //     if (result.length === 1)
            //     {
            //         req.session.email = req.body.email;
            //         req.session.isClient = false;
            //         console.log("Logged in!");
            //     }
            //
            //     return res.redirect('/');
            // });

            return res.redirect('/');
        }
    });
};

module.exports.newTrainer = function (req, res) {
    if (req.session.email)
        return res.redirect('back');

    const check = `SELECT * FROM trainers WHERE email = '${req.body.email}'`;
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbms'
    });

    connection.query(check, function (err, result) {
        if (err)
        {
            console.log('Cannot run query!', err)
            return;
        }

        if (result.length === 0 && req.body.password === req.body.confirmpassword)
        {
            const insert = `INSERT INTO trainers (name, email, password) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}')`;

            connection.query(insert, function (err) {
                if (err)
                {
                    console.log('Cannot run query!', err)
                    return;
                }

                console.log("Successfully inserted!");
                req.session.email = req.body.email;
                req.session.isClient = false;
                return res.redirect('/');
            });
        }
    });
};

module.exports.signout = function (req, res) {
    if (!req.session.email)
        return res.redirect('back')

    req.session.destroy();
    console.log('Logged Out!');
    return res.redirect('/');
};