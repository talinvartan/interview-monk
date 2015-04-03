var passport = require('passport');
var Account = require('../models/account');
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req, res, next) {
    console.log('registering user');
    console.log(req.body);
    Account.register(new Account(req.body), req.body.password, function(err) {
        if (err) {
            res.status(500).json({err: err});
        } else {
            console.log('user registered!');
            res.status(200).json('Added user successfully ... ');
        }
    });
});

router.get('/login', function(req, res) {
    res.status(req.user ? 200 : 401).json(req.user ? { user: req.user } : { user: null, message: 'USER_NOT_FOUND' });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.status(req.user ? 200 : 401).json(req.user ? { user: req.user } : { user: null, err: err, message: 'INVALID_LOGIN' });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/validate', function () {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(403).json({ message: 'Session not valid / Not logged in.' });
    }
});

module.exports = router;