const mongoose = require('mongoose');



const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    }
})


module.exports = messageSchema;