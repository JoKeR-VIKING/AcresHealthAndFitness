const mysql = require('mysql')
require('date-utils')

module.exports.buy = function (req, res) {
    if (!req.session.isClient)
        return res.redirect('back');

    return res.render('buy', {
        title: "Acres Fitness Club | Buy",
        email: req.session.email,
        isClient: true
    });
};

module.exports.purchase = function (req, res) {
    if (!req.session.isClient)
        return res.redirect('back');

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbms'
    });

    let date = `SELECT enddate FROM clients WHERE email = '${req.session.email}'`;

    connection.query(date, function (err, result) {
        if (err)
        {
            console.log("Cannot run query!");
            return;
        }

        let subEndDate = new Date(result[0]['enddate']);
        let currentDate = new Date();

        if (subEndDate > currentDate)
            currentDate = subEndDate;

        let days;
        if (req.query.time === "day")
            days = 1;
        else if (req.query.time === "week")
            days = 7;
        else if (req.query.time === "month")
            days = 31;
        else
            days = 365;

        currentDate.setDate(currentDate.getDate() + days);

        date = `UPDATE clients SET enddate = '${currentDate}' WHERE email = '${req.session.email}'`

        connection.query(date, function (err) {
            if (err)
            {
                console.log("Cannot run query!", err);
                return;
            }

            return res.redirect('/');
        });
    });
};

module.exports.training = function (req, res) {
    if (!req.session.email)
        return res.redirect('/')

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'dbms'
    });

    const ifPremium = `SELECT enddate FROM clients WHERE email = '${req.session.email}'`;

    connection.query(ifPremium, function (err, result) {
        if (err)
        {
            console.log("Cannot run query!");
            return;
        }

        if (new Date(result[0]['enddate']) < Date.now())
        {
            let videos = `SELECT * FROM videos WHERE isPremium = 0`;

            connection.query(videos, function (err, result) {
                if (err)
                {
                    console.log("Cannot run query!");
                    return;
                }

                console.log(result);

                return res.render('training', {
                    title: "Acres Fitness Club | Training",
                    email: req.session.email,
                    videos: result,
                    isClient: true
                });
            });
        }
        else
        {
            let videos = `SELECT * FROM videos`;

            connection.query(videos, function (err, result) {
                if (err)
                {
                    console.log("Cannot run query!");
                    return;
                }

                let temp = [];
                for (let x in result)
                    temp.push(result[x]['link'])

                return res.render('training', {
                    title: "Acres Fitness Club | Training",
                    email: req.session.email,
                    videos: temp,
                    isClient: true
                });
            });
        }
    });
};