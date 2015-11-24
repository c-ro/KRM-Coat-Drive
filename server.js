var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/krm', function(err) {  //mongodb://heroku_ld8gq5ss:d4s4p3klt6q5fkmc0llnuucebm@ds057204.mongolab.com:57204/heroku_ld8gq5ss
    if (err) {
        console.err(err);
    } else {
        console.log('Connected');
    }
});

var personSchema = new Schema({
	name: { type: String }, 
	address: { type: String },
	// phone: { type: String, validate: {
	// 			validator: function(v) {
	// 				return (/d{3}-d{3}-d{4}/).test(v);
	// 			},
	// 				message: '{VALUE} is not a valid phone number!'
	// 			}
	// 		},
	qty: { type: Number },
	notes: { type: String }
});

var Person = mongoose.model('Person', personSchema);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/vendor"));

app.use(bodyParser.json());

app.get('/list', function (req, res) {
	Person.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.get('/list/:id', function (req, res) {
	var person = req.params.id;
	console.log(person);

	Person.findOne({'_id': person }, function(err, person){
		if (err){
			console.log("GET single person ERROR: " + err);
		} else {
			res.json(person);
		}
	});
});

app.post('/list', function(req, res){
	var person = new Person(req.body);

	person.save(req.body, function (err, person){
		if (err){
			res.json(err);
		} else {
			res.json(person);
		}
	});
});

app.delete('/list/:id', function(req, res){
	var person = req.params.id;

	Person.remove({"_id": person}, function (err, person){
		res.json(person);
	});
});

app.put('/list/:id', function (req, res) {

	Person.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, person){
		if (err){
			console.log(err);
		}

		res.send(person);
	});
});

// app.put('/list/purchase/:id', function (req, res) {
// 	Person.findByIdAndUpdate(req.params.id, {$push: {"purchases": req.body}},  {safe: true, upsert: true, new : true}, function(err, person){
		
// 		if (err){
// 			console.log(err);
// 		}

// 		res.send(person);
// 	});
// });

// app.put('/purchase/remove/:id/:date', function(req, res){
// 	Person.update( {"_id": req.params.id}, { $pull: { purchases: { date: req.params.date } } }, function (err, person){
// 		res.json(person);
// 	});
// });

app.listen(3000); //process.env.PORT || 

var time = new Date();
time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
console.log(time + " server running on 3k");
