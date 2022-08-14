const mongoose = require('mongoose')

const Category = mongoose.Schema(
    {
        name: String,


    },
    {strict: false},
    {

        timestamps: {data_added: 'created_at'}
    }
)
module.exports = mongoose.model("Category", Category)

