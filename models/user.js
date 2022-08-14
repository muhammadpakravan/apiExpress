const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        email: String,
        username: String,
        password: String,
        role: {
            type: String,
            enum: ["admin", "restricted"],
            default: "restricted",
        },
    },

    {strict: false}
);

module.exports = mongoose.model("User", UserSchema, "User");
