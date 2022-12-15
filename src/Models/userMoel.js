const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    username: String,
    phone: String,
    password: String,
    role: {
        type: String,
        default:'user'
    },
},
    { timestamps: true })

module.exports = User = mongoose.model('User',userModel);

