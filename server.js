var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://heroku_6d4b2cmv:b25eant3f0dk4lnb9grm0csjnh@ds057954.mongolab.com:57954/heroku_6d4b2cmv', function(err) {  //mongodb://heroku_ld8gq5ss:d4s4p3klt6q5fkmc0llnuucebm@ds057204.mongolab.com:57204/heroku_ld8gq5ss
    if (err) {
        console.log(err);
    } else {
        console.log('Connected');
    }
});

var personSchema = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	address: { type: String, required: true },
	phone: { type: String, unique: true, validate: {
				validator: function(v) {
					return (/^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/).test(v);
				},
					message: '{VALUE} is not a valid phone number!'
				}
			},
	qty: { type: Number, default: 1 },
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

app.get('/admin', function (req, res) {
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
		if(err && err.message){
			res.json(err);
		} else if (err && err.errors.address){
			res.send({message: "Address is required."});
		} else if (err && err.errors.firstname){
			res.send({message: "First name is required."});
		} else if (err && err.errors.lasstname){
			res.send({message: "Last name is required."});
		} else if (err && err.errors.phone){
			res.send({message: "Phone number is required."});
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

app.listen(process.env.PORT || 3000);

var time = new Date();
time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
console.log(time + " server running on 3k");
