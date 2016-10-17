/***
 * tg-rest
 *
 * A REST API  For ThorsHammer Bot
 *
 * Mohammed Sohail <sohailsameja@gmail.com>
 *
 * Released Under MIT License 
 *
 ***/

'use-strict'

// Node Modules

var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

// MongoDB Vars

var mongourl = 'mongo-url'
var usersc = 'users';
var ObjectId = mongodb.ObjectID;
var db;

// Initailize Express

var app = express();
app.use(bodyParser.json());
app.use('/api', express.static('public'));
app.use('/', express.static('public'));

mongodb.MongoClient.connect(mongourl, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    db = database;
    console.log('Successfully connected to MongoDB!');

    var server = app.listen(process.env.PORT || 8080 || 8080, function () {
        var port = server.address().port;
        console.log('Server Started On:', port);
    });
});

/**    '/users'
 *    GET: finds all users
 **/

app.get('/api/users', function (req, res) {
    db.collection(usersc).find({}, {
        __v: 0,
        _id: 0
    }).toArray(function (err, docs) {
        if (err) {
            if (err) return next(err);
        } else {
            res.status(200).json(docs);
        }
    });
});

/**    '/users/:username'
 *    GET: find user by username
 **/

app.get('/api/users/:username', function (req, res) {
    db.collection(usersc).findOne({
        username: req.params.username
    }, {
        __v: 0,
        _id: 0
    }, function (err, doc) {
        if (doc === null) {
            res.send('Cannot Find The User Specified!');
        } else {
            res.status(200).json(doc);
        }
    });
});


app.get('*', function (req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

// Handling 404 Errors

app.use(function (err, req, res, next) {
    if (err.status !== 404) {
        return next();
    }

    res.send(err.message || 'Error 404, Cannot Find What You Are Looking For!');
});