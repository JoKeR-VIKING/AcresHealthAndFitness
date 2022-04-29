const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;
const flash = require('express-flash');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/static', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "AzBoOFwGxqCMP1rw",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 24 * 60 * 60)
    }}
));
app.use(flash());

app.use('/', require('./routes'));

app.listen(PORT, function (err) {
    if (err)
    {
        console.log("Cannot connect to server");
        return;
    }

    console.log("Working perfectly...");
});