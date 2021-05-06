const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/login', (req, res, next) => {
    api.login(req, res, next);
});
router.post('/register', (req, res, next) => {
    api.register(req, res, next);
});
router.get('/getValue', (req, res, next) => {
    api.getValue(req, res, next);
});
router.post('/setValue', (req, res, next) => {
    api.setValue(req, res, next);
});
module.exports = router;