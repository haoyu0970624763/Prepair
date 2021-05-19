const { json } = require('express');
const mysql = require('mysql');
const dbConfig = require('./db');

const pool = mysql.createPool({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database,
    port: dbConfig.mysql.port,
    multipleStatements: true    // 多語句查詢
});

// set UTF8
pool.getConnection((err, connection) => {

    var sql = "alter database PrepairDB character set utf8;"
    var sql2 = "SET NAMES 'utf8'";

    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
    connection.query(sql2, function (err, result) {
        if (err) throw err;
    });

    connection.release();
})

pool.getConnection((err, connection) => {

    if (err) throw err;
    var sql = "SHOW TABLES LIKE 'user'"
    var sql2 = "CREATE TABLE user (id VARCHAR(20), password VARCHAR(20), personality VARCHAR(20) )";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            connection.query(sql2, function (err, result) {
                if (err) throw err;
                console.log("table of user created");
            })
        }
    });
    var sql3 = "SHOW TABLES LIKE 'user_habit'"
    var sql4 = "CREATE TABLE user_habit (id VARCHAR(20), smoke VARCHAR(20),drink VARCHAR(20), pet VARCHAR(20), wake VARCHAR(20), sleep VARCHAR(20), clean VARCHAR(20), bath VARCHAR(20), back VARCHAR(20), s_custom VARCHAR(20) , m_smoke VARCHAR(20), m_drink VARCHAR(20), m_back VARCHAR(20),m_noise VARCHAR(20) , clock VARCHAR(20) , sleep_reason VARCHAR(20))";

    connection.query(sql3, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            connection.query(sql4, (err, result) => {
                console.log("table of user_habit created")
            })
        }
    });


    var sql5 = "SHOW TABLES LIKE 'house'"
    var sql6 = "CREATE TABLE house (title VARCHAR(20), pattern VARCHAR(20),space VARCHAR(20), City VARCHAR(20), Township VARCHAR(20), roomType VARCHAR(20), address VARCHAR(30), cost VARCHAR(20), detailedCost VARCHAR(20), owner VARCHAR(20), ownerPhone VARCHAR(20) , pic VARCHAR(50), moneyAddress VARCHAR(50))";
    var sql7 = "insert into house (title , pattern , space , City , Township , roomType , address , cost, detailedCost,owner,ownerPhone ,pic,moneyAddress) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";

    var house = [
        {
            title: "世界帝心裝潢兩房兩衛*全室日立變頻冷氣*",
            pattern: "2房2廳2衛1陽台",
            space: "28坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區崇善路25巷",
            cost: "1萬以上",
            detailedCost: "21500",
            owner: "陳先生",
            ownerPhone: "0973930363",
            pic: "147444177635281205_765x517.water3.jpg",
            moneyAddress:''
        },
        {
            title: "東區南紡購物中心旁.國賓影城走路1分鐘到",
            pattern: "3房2廳2衛1陽台",
            space: "37坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區東平路9巷",
            cost: "1萬以上",
            detailedCost: "18,800",
            owner: "郭先生",
            ownerPhone: "0911626666",
            pic: "152109057443999704_765x517.water3.jpg",
            moneyAddress:''
        },
        {
            title: "超值美寓-長榮中學旁,近成大/設備齊全",
            pattern: "2房1廳1衛1陽台",
            space: "25坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區長榮路二段32巷",
            cost: "1萬以上",
            detailedCost: "12000",
            owner: "蔡小姐",
            ownerPhone: "0927619822",
            pic: "162054677374849401_765x517.water3.jpg",
            moneyAddress:''
        },
        {
            title: "太子建設/大坪數空間/光亮/學生合租可",
            pattern: "4房2廳2衛2陽台",
            space: "33坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區怡東路58巷1號 ",
            cost: "1萬以上",
            detailedCost: "15,000",
            owner: "邱小姐",
            ownerPhone: "0986851077",
            pic: "162015028546399504_765x517.water3.jpg",
            moneyAddress:''
        },
        {
            title: "整層公寓3雅房1廁所（透天無電梯）",
            pattern: "3房0廳1衛1陽台",
            space: "22坪",
            City: "台南市",
            Township: "中西區",
            roomType: "整層住家",
            address: "台南市中西區華平路800號 ",
            cost: "1萬以上",
            detailedCost: "15,000",
            owner: "林先生",
            ownerPhone: "0975049180",
            pic: "157493877931891204_765x517.water3.jpg",
            moneyAddress:''
        }
    ]
    connection.query(sql5, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            connection.query(sql6, (err, result) => {
                console.log("table of house created")
            })
            for (i = 0; i <= 4; i++) {
                connection.query(sql7,[house[i].title ,house[i].pattern,house[i].space,house[i].City,house[i].Township,house[i].roomType,house[i].address,house[i].cost,house[i].detailedCost,house[i].owner,house[i].ownerPhone,house[i].pic,house[i].moneyAddress], (err, result) => {
                    console.log("add user")
                })
            }
        }
    });
    connection.release();
})

pool.getConnection((err, connection) => {

    if (err) throw err;
    var sql = "SHOW TABLES LIKE 'user'"
    var sql2 = "CREATE TABLE user (id VARCHAR(20), password VARCHAR(20), personality VARCHAR(20) )";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            connection.query(sql2, function (err, result) {
                if (err) throw err;
                console.log("table of user created");
            })
        }
    });
    connection.release();
})

module.exports = {

    login(req, res, next) {

        var id = req.body.id;
        var password = req.body.password;
        pool.getConnection((err, connection) => {
            var sql = 'select * from user where id=?'
            connection.query(sql, [id], (err, result) => {
                if (result.length == 0) {
                    res.send("無此帳號")
                }
                else {
                    if (password != result[0].password) {
                        res.send("密碼錯誤")
                    }
                    else {
                        res.send("success")
                    }
                }
                connection.release();
            })
        })
    },
    register(req, res, next) {

        var id = req.body.id;
        var password = req.body.password;
        pool.getConnection((err, connection) => {
            var sql = 'insert into user(id,password) values(?,?)'
            connection.query(sql, [id, password], (err, result) => {
                connection.release();
            })
        })
    },
    sendHabit(req, res, next) {

        var id = req.body.id;
        var smoke = req.body.smoke;
        var drink = req.body.drink;
        var pet = req.body.pet;
        var wake = req.body.wake;
        var sleep = req.body.sleep;
        var clean = req.body.clean;
        var bath = req.body.bath;
        var back = req.body.back;
        var s_custom = req.body.s_custom
        var m_smoke = req.body.m_smoke;
        var m_drink = req.body.m_drink;
        var m_back = req.body.m_back;
        var m_noise = req.body.m_noise;
        var clock = req.body.clock;
        var sleep_reason = req.body.sleep_reason;

        pool.getConnection((err, connection) => {

            if (err) throw err;
            var sql = "select * from user_habit where id=?"
            var sql2 = "insert into user_habit (id , smoke , drink , pet , wake , sleep , clean , bath , back , s_custom,m_smoke , m_drink , m_back , m_noise , clock ,sleep_reason) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

            connection.query(sql, [id], function (err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    connection.query(sql2, [id, smoke, drink, pet, wake, sleep, clean, bath, back, s_custom, m_smoke, m_drink, m_back, m_noise, clock, sleep_reason], (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        console.log("add data in user_habit success")
                    })
                }
            });
        })
        res.send("OK");
    },
    loadHouse(req, res, next) {

        var city = req.body.city;
        var township = req.body.township;
        var roomtype = req.body.roomtype;
        var cost = req.body.cost;

        pool.getConnection((err, connection) => {

            if (err) throw err;
            var sql = "select * from house where City=? and Township=? and roomType=? and cost=?"

            connection.query(sql, [city,township,roomtype,cost], function (err, result) {
                if (err) throw err;
                if (result.length != 0) {
                    res.send(result)
                }
            });
        })
    }
}