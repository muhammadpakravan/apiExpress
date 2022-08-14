const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb://localhost/News"
            // "mongodb://root:oEasa6IQtnvacilY@services.gen1.chabokan.net:59737"
        );

        // mongodb://localhost/mafia
        // mongodb: console.log(`MongoDB connected:${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
