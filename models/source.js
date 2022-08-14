const mongoose = require('mongoose')

const Source = mongoose.Schema(
    {
        name: String,
        url : String,


    },
    {strict: false},
    {

        timestamps: {data_added: 'created_at'}
    }
)
module.exports = mongoose.model("Source", Source)
 