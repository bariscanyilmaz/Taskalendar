const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    namesurname: { type: String, required: 'Cannot be empty' },
    email: { type: String, required: 'Cannot be empty' },
    password: { type: String, required: 'Cannot be empty' }
    

});
module.exports = mongoose.model("User", UserSchema);