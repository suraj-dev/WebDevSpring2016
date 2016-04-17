module.exports = function(mongoose) {

    var locationSchema = new mongoose.Schema({
        locationId : Number,
        favoritedUsers : [{userId : String, username: String}],
        ratings : [Number],
        comments : [
        {
            commentId : String,
            userId : String,
            username : String,
            timestamp : String,
            comment : String
        }
        ]},
        {collection : 'location'});

    return locationSchema;
};
