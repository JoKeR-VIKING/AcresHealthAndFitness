const mysql = require('mysql');

module.exports.home = function (req, res) {
    let isClient = true;

    if (req.session.email)
    {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'dbms'
        });

        const check = `SELECT * FROM trainers WHERE email = '${req.session.email}'`;

        connection.query(check, function (err, result) {
            if (err)
            {
                console.log("Cannot run query!");
                return;
            }

            if (result.length === 1)
                isClient = false;

            return res.render('home', {
                title: "Acres Fitness Club | Home",
                email: req.session.email,
                isClient: isClient
            });
        });
    }
    else
    {
        return res.render('home', {
            title: "Acres Fitness Club | Home",
            email: req.session.email,
            isClient: isClient
        });
    }
};
