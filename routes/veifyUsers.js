const UserModel = require("../models/user");

async function userExist(username, Email) {
    const userName = await UserModel.findOne({username: username});
    const userEmail = await UserModel.findOne({email: Email});

    if (userName || userEmail) {
        return false;
    } else {
        return true;
    }
}

module.exports = userExist;
