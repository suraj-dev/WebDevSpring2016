var q = require("q");

module.exports = function (db, mongoose) {

    var FormSchema = require("./form.schema.server.js")(mongoose);

    var FormModel = mongoose.model("Form", FormSchema);

    var api = {
        findFormByTitle : findFormByTitle,
        findFormById : findFormById,
        findAllForms : findAllForms,
        createForm : createForm,
        deleteFormById : deleteFormById,
        updateFormById : updateFormById,
        findFormsByUserId : findFormsByUserId,
        getMongooseModel : getMongooseModel
    };

    function getMongooseModel() {
        return FormModel;
    }

    return api;

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel.find({title : title},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel.find({_id : formId},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();

        FormModel.find(function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createForm(form, userId) {
        var deferred = q.defer();

        FormModel.create({userId : userId, title : form.title},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        FormModel.remove({_id : formId},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var deferred = q.defer();
        FormModel.update({_id : formId}, {$set : form}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();

        FormModel.find({userId : userId},function(err, doc) {
            if(err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

};