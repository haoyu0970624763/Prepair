const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/login', (req, res, next) => {
    api.login(req, res, next);
});
router.post('/register', (req, res, next) => {
    api.register(req, res, next);
});
router.post('/sendPersonality', (req, res, next) => {
    api.sendPersonality(req, res, next);
});
router.post('/loadHouse', (req, res, next) => {
    api.loadHouse(req, res, next);
});
router.post('/getUser', (req, res, next) => {
    api.getUser(req, res, next);
});
router.post('/GetHouseInfo', (req, res, next) => {
    api.GetHouseInfo(req, res, next);
});
router.post('/writeContract', (req, res, next) => {
    api.writeContract(req, res, next);
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
router.post('/GetMoneyInfo', (req, res, next) => {
    api.GetMoneyInfo(req, res, next);
});

router.post('/addTenant_success', (req, res, next) => {
    api.addTenant_success(req, res, next);
});
router.post('/setCoinRule_success', (req, res, next) => {
    api.setCoinRule_success(req, res, next);
});


module.exports = router;