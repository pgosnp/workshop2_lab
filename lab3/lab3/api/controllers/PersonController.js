/**
 * PersonController
 *
 * @description :: Server-side logic for managing People
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // create function
  create: function (req, res) {
    if (req.method == "POST") {
      Person.create(req.body.Person).exec(function (err, model) {
        return res.send("Successfully Created!");
      });
    } else {
      return res.view('person/create');
    }
  },
  // json function
  json: function (req, res) {
    Person.find().exec(function (err, persons) {
      return res.json(persons);
    });
  },
  // index function
  index: function (req, res) {
    Person.find().exec(function (err, persons) {
      return res.view('person/index', {
        'persons': persons
      });
    });
  },
  // view function
  view: function (req, res) {
    Person.findOne(req.params.id).exec(function (err, model) {
      if (model != null)
        return res.view('person/view', {
          'person': model
        });
      else
        return res.send("No such person");
    });
  },
  // delete function
  delete: function (req, res) {

    if (req.method == "GET") {
      res.redirect('/');
    } else {

      Person.findOne(req.params.id).exec(function (err, model) {

        var obj = {};

        if (model != null) {
          model.destroy();
          obj.message = "Person Deleted"
        } else {
          obj.message = "Person not found";
        }

        return res.json(obj);
      });
    }
  },
  // update function
  update: function (req, res) {
    if (req.method == "GET") {
      Person.findOne(req.params.id).exec(function (err, model) {
        if (model == null)
          return res.send("No such person!");
        else
          return res.view('person/update', {
            'person': model
          });
      });
    } else {
      Person.findOne(req.params.id).exec(function (err, model) {
        model.name = req.body.Person.name;
        model.age = req.body.Person.age;
        model.save();
        return res.send("Record updated");
      });
    }
  },
  // search function
  search: function (req, res) {

    const qName = req.query.name || "";
    const qAge = req.query.age || "";

    if (qName == "" && qAge == "") {
      return res.view('person/search');
    } else {
      if (qAge == "") {

        Person.find()
          .where({
            name: {
              contains: qName
            }
          })
          .sort('name')
          .exec(function (err, persons) {
            return res.view('person/index', {
              'persons': persons
            });
          })

      } else {
        Person.find()
          .where({
            name: {
              contains: qName
            }
          })
          .where({
            age: qAge
          })
          .sort('name')
          .exec(function (err, persons) {
            return res.view('person/index', {
              'persons': persons
            });
          })
      }
    }

  },

  // paginate function
  paginate: function (req, res) {

    const qPage = req.query.page || 1;

    Person.find().paginate({
      page: qPage,
      limit: 2
    }).exec(function (err, persons) {
      Person.count().exec(function (err, value) {
        var pages = Math.ceil(value / 2);
        return res.view('person/paginate', {
          'persons': persons,
          'count': pages
        });
      });
    });
  },
  showSupervisors: function (req, res) {

    Person.findOne(req.params.id).populateAll().exec(function (err, model) {

      return res.json(model);

    });
  },

};
