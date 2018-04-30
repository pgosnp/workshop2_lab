/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function (req, res) {

    if (req.method == "GET")
      return res.view('user/login');
    else {
      User.findOne({
        username: req.body.username
      }).exec(function (err, user) {

        if (user == null)
          return res.send("No such user");

        // Load the bcrypt module
        var bcrypt = require('bcrypt');

        // Generate a salt
        var salt = bcrypt.genSaltSync(10);

        //  if (user.password != req.body.password)
        if (!bcrypt.compareSync(req.body.password, user.password))
          return res.send("Wrong Password");

        console.log("The session id " + req.session.id + " is going to be destroyed.");

        req.session.regenerate(function (err) {

          console.log("The new session id is " + req.session.id + ".");

          req.session.username = req.body.username;

          return res.send("login successfully.");

        });
      });
    }
  },

  logout: function (req, res) {

    console.log("The current session id " + req.session.id + " is going to be destroyed.");

    req.session.destroy(function (err) {
      return res.send("Log out successfully.");
    });
  },

  showSupervisees: function (req, res) {

    User.findOne(req.params.id).populateAll().exec(function (err, model) {

      return res.json(model);

    });
  },
  addSupervisee: function (req, res) {

    User.findOne(req.params.id).exec(function (err, model) {

      if (model !== null) {
        model.supervises.add(req.query.pid);
        model.save();
        return res.send("Supervisee added.");
      } else {
        return res.send("User not found!");
      }
    });
  },
  removeSupervisee: function (req, res) {

    User.findOne(req.params.id).exec(function (err, model) {

      if (model !== null) {
        model.supervises.remove(req.query.pid)
        model.save();
        return res.send("Supervisee removed!");
      } else {
        return res.send("User not found!");
      }
    });

  },
  show22: function (req, res) {

    User.findOne(req.params.id).populateAll({
      age: 22
    }).exec(function (err, model) {

      if (model == null) return res.redirect("/");

      console.log(model.supervises.length);

      return res.json(model.supervises);

    });
  },
};
