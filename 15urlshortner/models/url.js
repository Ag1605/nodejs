const mangoose = require('mongoose');
const urlSchema = new mangoose.Schema({
    shortid: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl : {
        type: String,
        required: true
    },
    visitHistory:[{timestamp: {type: Number}}],

 } , {timestamps: true});

 const Url = mangoose.model('Url', urlSchema);
 module.exports = Url;