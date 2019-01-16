var mongoose = require("mongoose");
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

//Virtual for author fullname
AuthorSchema.virtual("name").get(function() {
    return this.family_name+", "+this.first_name;
});

// Virtual for author lifespan
AuthorSchema.virtual("lifespan").get(function() {
    return this.date_of_birth&&this.date_of_death? (this.date_of_death.getYear()-this.date_of_birth.getYear()).toString() : 
    !this.date_of_death&&this.date_of_birth? (new Date().getYear()-this.date_of_birth.getYear()).toString() : "Unknown";
});

// Virtual for author URL
AuthorSchema.virtual("url").get(function() {
    return "/catalog/author/" + this._id;
});

// Virtual for author dob
AuthorSchema.virtual('date_of_birth_formatted').get(function() {
    return this.date_of_birth? moment(this.date_of_birth).format("DD MMMM YYYY") : 'Unknown';
});

// Virtual for author dod
AuthorSchema.virtual('date_of_death_formatted').get(function() {
    return this.date_of_death? moment(this.date_of_death).format("DD MMMM YYYY") : 'Unknown';
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);