const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/login', (req, res, next) => {
    api.login(req, res, next);
});
router.post('/register', (req, res, next) => {
    api.register(req, res, next);
});
router.post('/loadHouse', (req, res, next) => {
    api.loadHouse(req, res, next);
});
router.post('/getUser', (req, res, next) => {
    api.getUser(req, res, next);
});
router.post('/sendHabit', (req, res, next) => {
    api.sendHabit(req, res, next);
});
router.post('/GetBalance', (req, res, next) => {
    api.GetBalance(req, res, next);
});
router.post('/CheckRent', (req, res, next) => {
    api.CheckRent(req, res, next);
});
router.post('/GiveMoney', (req, res, next) => {
    api.GiveMoney(req, res, next);
});
module.exports = router;