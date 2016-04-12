module.exports = function(mongoose) {

    var projectUserSchema = new mongoose.Schema({
        username : String,
        password : String,
        firstName : String,
        lastName : String,
        emails : [String],
        hometown : String,
        dob : Date,
        favoriteLocations : [{locationId : Number, locationTitle : String}],
        roles : [String]
    }, {collection : 'projectUser'});

    return projectUserSchema;
};