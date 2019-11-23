const express = require('express');
const app = express();
const port = 3000;
const BASE_API_PATH = "/api/v1";

var bodyParser = require('body-parser')
var Datastore = require('nedb');
db = new Datastore('');

var jsonParser = bodyParser.json();

app.get('/', (req, res) => res.send('My contacts'));

// API CRUD METHOD

// GET all contacts
app.get(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - GET /contacts");

    db.find({}, function (err, docs){
        res.send(docs);
    })
});

// GET contact by name
app.get(BASE_API_PATH + "/contact/:name", (req, res) => {
    console.log(Date() + " - GET /contact/" + req.params.name);

    const contactName = req.params.name;
    db.findOne({name: contactName}, function(err, contactFound){
        if(contactFound) {
            res.send(contactFound);
        } else {
            res.send("Contact " + contactName + " does not exist.");
        }
    });
});

//// DELETE CONTACTS
app.delete(BASE_API_PATH + "/contacts", (req, res) => {
    console.log(Date() + " - DELETE /contacts/")
    db.remove({}, function (err, docs) {
        res.sendStatus(200);
    });
});

//// DELETE SPECIFIC CONTACT 
app.delete(BASE_API_PATH + "/contact/:name", (req, res) => {
    console.log(Date() + " - DELETE /contact/" + req.params.name);

    const contactName = req.params.name;
    db.remove({name: contactName}, function (err, contactFound) {
        if(contactFound){
            res.sendStatus(200);
        } else {
            res.send("Contact " + contactName + " does not exist");
        }
    });
});

//// POST CONTACT
app.post(BASE_API_PATH + "/contact", jsonParser, (req, res) => {
    console.log(Date() + " - POST /contact/" + req.body.name)
    var contact = req.body;
    db.insert(contact, function (err, newDoc) {
    });
    res.sendStatus(201);
});

//// PUT CONTACT
app.put(BASE_API_PATH + "/contact", jsonParser, (req, res) => {
    console.log(Date() + " - PUT /contact/" + req.body.name)
    var contact = req.body;
    db.update({'name': contact.name}, contact, function (err, docs) {
    });
    res.sendStatus(201);
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))