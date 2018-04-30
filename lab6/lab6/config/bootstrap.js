/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
  // Load the bcrypt module
  var bcrypt = require('bcrypt');

  // Generate a salt
  var salt = bcrypt.genSaltSync(10);

  Person.findOne(635).exec(function (err, model) {

    if (model == null) {

      var persons = [{
          "name": "Martin Choy",
          "age": "23",
          "id": 635
        },
        {
          "name": "Kenny Cheng",
          "age": "22",
          "id": 637
        }
      ];

      persons.forEach(function (person) {
        Person.create(person).exec(function (err, model) {});
      });

    }

  });

  var users = [{
      "username": "admin",
      "password": "123456",
      "role": "admin",
      "id": 101
    },
    {
      "username": "boss",
      "password": "123456",
      "id": 102
    }
  ];

  users.forEach(function (user) {

    user.password = bcrypt.hashSync(user.password, salt);

    User.create(user).exec(function (err, model) {
      if (err) {
        console.log(err);
        return;
      }

      if (model.id == 101) {
        model.supervises.add(637); // the id for kenny
      }

      if (model.id == 102) {
        model.supervises.add(635); // the id for martin
        model.supervises.add(637); // the id for kenny
      }

      model.save();

    });

  });

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
