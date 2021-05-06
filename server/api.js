const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');
const pool = mysql.createPool({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database,
    port: dbConfig.mysql.port,
    multipleStatements: true    // 多語句查詢
});

module.exports = {

    login(req, res, next) {
        var id = req.body.id;
        var password = req.body.password;
        pool.getConnection((err, connection) => {
            var sql = sqlMap.login;
            connection.query(sql, [id], (err, result) => {
                
                if(result.length == 0){
                    res.send("無此帳號")
                }
                else{
                    if( password !=result[0].password ){
                        res.send("密碼錯誤")
                    }
                    else{
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
            var sql = sqlMap.register;
            connection.query(sql, [id, password], (err, result) => {
                connection.release();
            })
        })
    },
    getValue(req, res, next) {
        var id = req.query.id;
        pool.getConnection((err, connection) => {
            var sql = sqlMap.getValue;
            connection.query(sql, [id], (err, result) => {
                res.json(result);
                connection.release();
            })
        })
    },
    setValue(req, res, next) {
        console.log(req.body);
        var id = req.body.id, name = req.body.name;
        console.log(id);
    }
}