const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require("./config/db");
const flash = require('express-flash')


const passport = require('passport');
const LocalStrategy = require('passport-local');


const indexRouter = require('./routes/index');
const adminRouter = require("./routes/admin")
const apiRouter = require("./routes/apiRouter")
const userRouter = require('./routes/user')
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "yash is a super star",
        cookie: {secure: false, maxAge: 14400000},
    })
);
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport_config')

connectDB().then(r => {
    console.log("MongoDB connected")
})
app.use('/', indexRouter);
app.use('/admin',loggedIn, adminRouter)
app.use("/api", apiRouter)
app.use('/user', userRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function loggedIn(req, res, next) {

    if (!req.user) {

        return res.render("login");
    }
    next();
}

module.exports = app;
