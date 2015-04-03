var router = require('express').Router();
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SchemaTypes = mongoose.SchemaTypes;

var TestModel = mongoose.model('Test', {
    title: String,
    tags: String,
    questions: SchemaTypes.Mixed,
    user: SchemaTypes.Mixed
});

router.post('/', function (req, res) {
    (new TestModel(req.body)).save(function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    });
});

router.get('/', function (req, res) {
    TestModel.find({}, {_id: 1, title: 1, tags: 1}, function (err, result) {
        if (err) res.status(500).json(err);
        else res.status(200).json(result);
    });
});

module.exports = router;