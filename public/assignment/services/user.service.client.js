(function(){
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService(){
        var users= [
            {        "_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]                },
            {        "_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]                },
            {        "_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]                },
            {        "_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {        "_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]                }
        ];

        var service= {
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        function findUserByUsernameAndPassword(username, password, callback)
        {
            for(user in users){
                if(users[user].username==username && users[user].password==password)
                {
                    callback(users[user]);
                }
            }
            callback(null);
        }

        function findAllUsers(callback)
        {
            callback(users);
        }

        function createUser(user, callback)
        {
            user["_id"]= (new Date).getTime();
            users.push(user);
            callback(user);
        }

        function deleteUserById(userId, callback)
        {
            for(user in users){
                if(users[user]._id==userId)
                {
                    delete users[user];
                    callback(users);
                }
            }
        }

        function updateUser(userId, user, callback)
        {
            for(usr in users){
                if(users[usr]._id==userId)
                {
                    users[usr]=user;
                    callback(users[usr]);
                }
            }
        }
    }
})();