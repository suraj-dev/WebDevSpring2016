module.exports = function(mongoose) {

    var locationSchema = new mongoose.Schema({
        locationId : Number,
        favoritedUsers : [{userId : String, username: String}],
        ratings : [Number]},
        {collection : 'location'});

    return locationSchema;
};
