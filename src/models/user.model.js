const mongoose = require("mongoose")

const userSchemas = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
},{timestamps: true});
const Users = mongoose.model("users", userSchemas);
module.exports = Users;