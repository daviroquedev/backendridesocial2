const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    matricula: String,
    password: String,
    profileImage: String,
    bio: String,
    curso: String,
},
{
    timestamps: true
}
);

const User = mongoose.model("User", userSchema)

module.exports = User;