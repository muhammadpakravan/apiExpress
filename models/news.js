const mongoose = require('mongoose')

const News = mongoose.Schema(
    {
        title: String,
        text: String,
        image: String,
        writer: String,
        category_name: String,
        source_name: String,
        promuted: Boolean,
        status: String,
        view: Number


    },
    {strict: false},
    {

        timestamps: {data_added: 'created_at'}
    }
)
module.exports = mongoose.model("News", News)

