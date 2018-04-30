const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myapp';

var db;

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
});

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'COMP2006'
  });
});
router.get('/form', function (req, res, next) {
  res.render('form');
});
router.post('/newBooking', function (req, res, next) {
  console.log(req.body.name);

  db.collection('bookings').insert({
    name: req.body.name,
    email: req.body.email,
    website: req.body.website,
    numTickets: req.body.numTickets
  });

  res.send("Well received, thanks " + req.body.name);
});
router.get('/showBookings', function (req, res, next) {

  db.collection('bookings').find().toArray(function (err, result) {
    if (err) {
      throw err;
    }

    //res.send(result);
    res.render('bookings', {
      title: 'Bookings',
      bookingInfo: result
    });
  });
});
router.get('/delete/:id', function (req, res, next) {

  db.collection('bookings').deleteOne({
    "_id": ObjectId(req.params.id)
  }, function (err, result) {
    if (err) {
      throw err;
    }

    res.send("Item removed.");
  });

});
// allow the client to change data by get method.
router.get('/update/:id', function (req, res, next) {

  db.collection('bookings').findOne({
    "_id": ObjectId(req.params.id)
  }, function (err, result) {
    if (err) {
      throw err;
    }

    if (result == null) {
      res.send("no such booking");
    } else {
      res.render('update', {
        booking: result
      });
    }
  });

});

router.post('/update/:id', function (req, res, next) {

  db.collection('bookings').updateOne({
    "_id": ObjectId(req.params.id)
  }, {
    $set: {
      name: req.body.name,
      email: req.body.email,
      website: req.body.website,
      numTickets: req.body.numTickets
    }
  }, function (err, booking) {
    if (err) {
      throw err;
    }

    res.send("Updated");
  });

});
module.exports = router;