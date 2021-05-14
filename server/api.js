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
        var s_custom=req.body.s_custom
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
            
            connection.query(sql,[id], function (err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    connection.query(sql2,[id , smoke , drink , pet , wake , sleep , clean , bath , back ,s_custom,m_smoke , m_drink , m_back , m_noise , clock ,sleep_reason],(err, result) => {
                        if (err) throw err;
                        console.log(result);
                        console.log("add data in user_habit success")
                    })
                }
            });
        })
        res.send("OK");
    },
}