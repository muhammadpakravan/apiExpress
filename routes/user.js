const UserModel = require("../models/user");
const verifyUser = require("./veifyUsers");
let router = require("express").Router();
let passport = require("passport");
const bcrypt = require("bcrypt");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/Avatar");
    },
    filename: function (req, file, cb) {
        console.log("File Object", file);
        let ext = "";
        if (file.originalname.split(".").length > 1) {
            ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        }
        console.log("ext", ext);
        cb(null, file.fieldname + "-" + Date.now() + ext);
    },
});

let upload = multer({storage: storage});


router.get("/login", (req, res) => {
    res.render("login", {flash: req.flash("Failed").toString()});
});

router.post("/login", passport.authenticate('local', {
        failureRedirect: "/user/login",
        successRedirect: "/admin",

        failureFlash: true,
    }),

);
router.get("/register", async (req, res) => {
    await UserModel.create({
        username: 'root',
        password: await bcrypt.hash('1234', 10),
        role: 'admin'
    })

    res.render("register");
});


router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/user/login");
    });
});

router.post(
    "/dashboard",
    upload.single("avatar"),
    loggedIn,
    async (req, res) => {
        console.log(req.file);
        try {
            if (req.file !== undefined) {
                filePath = req.file.path;
            } else {
                let myUser = await UserModel.findById(req.user);
                console.log("user", myUser.image);
                filePath = myUser.image;
            }
        } catch (e) {
            console.log(e);
        }
        const userInformation = await UserModel.findByIdAndUpdate(req.user, {
            username: req.body.username,
            fristName: req.body.fristname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            country: req.body.country,
            image: "\\" + filePath,
        });

        const user = await UserModel.findById(req.user);
        console.log(user);

        res.render("dashboard", {message: true, user: user});
    }
);

function loggedIn(req, res, next) {
    if (!req.user) {
        return res.render("login");
    }
    next();
}

module.exports = router;
