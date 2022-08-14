const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const passportConf = passport.use(
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true,
        },
        async function (req, username, password, done) {

            await UserModel.findOne({username: username}).then(async (theUser) => {


                if (!theUser) {
                    console.log("user does not exist");

                    return done(null, false, req.flash("Failed", "user is not found."));
                }
                const validPassword = await bcrypt.compare(password, theUser.password);
                if (!validPassword) {
                    console.log(password)
                    console.log(theUser.password)
                    console.log("pass is nt true");

                    return done(
                        null,
                        false,
                        req.flash("Failed", "Password is not valid.")
                    );
                }

                return done(null, theUser);

            });
        }
    )
);

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.serializeUser(async function (username, done) {
    try {
        const user = await UserModel.findOne({
            where: {
                id: username.id,
            },
        });
        done(null, user);
    } catch (e) {
        console.log(e);
    }
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    //If using Mongoose with MongoDB; if other you will need JS specific to that schema.
    UserModel.findById(user.id, function (err, user) {
        done(err, user);
    });
});
module.exports = passportConf;
