const { json } = require('express');
const mysql = require('mysql');
var web3 = require("./getWeb3");
const dbConfig = require('./db');


const pool = mysql.createPool({
    host: dbConfig.mysql.host,
    user: dbConfig.mysql.user,
    password: dbConfig.mysql.password,
    database: dbConfig.mysql.database,
    port: dbConfig.mysql.port,
    multipleStatements: true    // 多語句查詢
});

var abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_lease",
                "type": "uint256"
            },
            {
                "name": "_totalRent",
                "type": "uint256"
            },
            {
                "name": "_tenantNum",
                "type": "uint256"
            },
            {
                "name": "_landlord",
                "type": "address"
            }
        ],
        "name": "addHouse",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            },
            {
                "name": "_rent",
                "type": "uint256"
            },
            {
                "name": "_lease",
                "type": "uint256"
            },
            {
                "name": "_houseNumber",
                "type": "uint256"
            },
            {
                "name": "_landlord",
                "type": "address"
            }
        ],
        "name": "addTenant",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "getContractMoney",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "powerToContract",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_houseNumber",
                "type": "uint256"
            },
            {
                "name": "_powerCost",
                "type": "uint256"
            }
        ],
        "name": "PowerToLandlord",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "rentToContract",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_houseNumber",
                "type": "uint256"
            }
        ],
        "name": "RentToLandlord",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_powerCost",
                "type": "uint256"
            },
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "setTenantPowerCost",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "tenantAddr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "rent",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "lease",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "houseNumber",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "landlordaddr",
                "type": "address"
            }
        ],
        "name": "gettenant",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "howmuch",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "whoPaidMoney",
                "type": "address"
            }
        ],
        "name": "getcontractMoneybyRent",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "powercost",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "tenant",
                "type": "address"
            }
        ],
        "name": "getTenantPowerCost",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "howmuch",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "whoPaidMoney",
                "type": "address"
            }
        ],
        "name": "getcontractMoneybyPower",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "howmuch",
                "type": "uint256"
            }
        ],
        "name": "contractMoney",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_houseNumber",
                "type": "uint256"
            }
        ],
        "name": "checkIfTenantsHadPaidPower",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_houseNumber",
                "type": "uint256"
            }
        ],
        "name": "checkIfTenantsHadPaidRent",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            },
            {
                "name": "count",
                "type": "uint256"
            }
        ],
        "name": "getLandlordHousebyAddr",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "getLandlordHouseNum",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "getTenant",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "ifTenantHasPaidPowerCost",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "ifTenantHasPaidRent",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tenants",
        "outputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "rent",
                "type": "uint256"
            },
            {
                "name": "lease",
                "type": "uint256"
            },
            {
                "name": "hadPaidRent",
                "type": "bool"
            },
            {
                "name": "hadPaidPower",
                "type": "bool"
            },
            {
                "name": "landlordAddr",
                "type": "address"
            },
            {
                "name": "Hid",
                "type": "uint256"
            },
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "powerCost",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

var address = '0xb8Ee08F0B470fc84f05E5BA8d622A8F0b681A1d8'
var MyContract = new web3.eth.Contract(abi, address);

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
    var sql = "SHOW TABLES LIKE 'USER'"
    var sql2 = "CREATE TABLE USER (id VARCHAR(20), password VARCHAR(20), personality VARCHAR(20),smoke VARCHAR(20),drink VARCHAR(20), pet VARCHAR(20), wake VARCHAR(20), sleep VARCHAR(20), clean VARCHAR(20), bath VARCHAR(20), back VARCHAR(20), s_custom VARCHAR(20) , m_smoke VARCHAR(20), m_drink VARCHAR(20), m_back VARCHAR(20),m_noise VARCHAR(20) , clock VARCHAR(20) , sleep_reason VARCHAR(20),address VARCHAR(50) )";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            connection.query(sql2, function (err, result) {
                if (err) throw err;
                console.log("table of USER created");
            })
        }
        else {
            console.log("table of USER exists");
        }
    });


    var sql5 = "SHOW TABLES LIKE 'HOUSE'"
    var sql6 = "CREATE TABLE HOUSE ( pattern VARCHAR(20),space VARCHAR(20), City VARCHAR(20), Township VARCHAR(20), roomType VARCHAR(20), address VARCHAR(30), cost VARCHAR(20), detailedCost VARCHAR(20), owner VARCHAR(20) , pic VARCHAR(50), moneyAddress VARCHAR(50))";
    var sql7 = "insert into HOUSE ( pattern , space , City , Township , roomType , address , cost, detailedCost,owner,pic,moneyAddress) values(?,?,?,?,?,?,?,?,?,?,?)";

    var house = [
        {
            pattern: "2房2廳2衛1陽台",
            space: "28坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區崇善路25巷",
            cost: "1萬以上",
            detailedCost: "21500",
            owner: "陳先生",
            pic: "147444177635281205_765x517.water3.jpg",
            moneyAddress: ''
        },
        {
            pattern: "3房2廳2衛1陽台",
            space: "37坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區東平路9巷",
            cost: "1萬以上",
            detailedCost: "18,800",
            owner: "郭先生",
            pic: "152109057443999704_765x517.water3.jpg",
            moneyAddress: ''
        },
        {
            pattern: "2房1廳1衛1陽台",
            space: "25坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區長榮路二段32巷",
            cost: "1萬以上",
            detailedCost: "12000",
            owner: "蔡小姐",
            pic: "162054677374849401_765x517.water3.jpg",
            moneyAddress: ''
        },
        {
            pattern: "4房2廳2衛2陽台",
            space: "33坪",
            City: "台南市",
            Township: "東區",
            roomType: "整層住家",
            address: "台南市東區怡東路58巷1號 ",
            cost: "1萬以上",
            detailedCost: "15,000",
            owner: "邱小姐",
            pic: "162015028546399504_765x517.water3.jpg",
            moneyAddress: ''
        },
        {
            pattern: "3房0廳1衛1陽台",
            space: "22坪",
            City: "台南市",
            Township: "中西區",
            roomType: "整層住家",
            address: "台南市中西區華平路800號 ",
            cost: "1萬以上",
            detailedCost: "15,000",
            owner: "林先生",
            pic: "157493877931891204_765x517.water3.jpg",
            moneyAddress: ''
        }
    ]
    connection.query(sql5, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            connection.query(sql6, (err, result) => {
                console.log("table of HOUSE created")
            })
            for (i = 0; i <= 4; i++) {
                connection.query(sql7, [house[i].pattern, house[i].space, house[i].City, house[i].Township, house[i].roomType, house[i].address, house[i].cost, house[i].detailedCost, house[i].owner, house[i].pic, house[i].moneyAddress], (err, result) => {
                    console.log("add house")
                })
            }
        }
        else {
            console.log("table of HOUSE exists")
        }
    });
    connection.release();
})

module.exports = {

    login(req, res, next) {

        var id = req.body.id;
        var password = req.body.password;
        pool.getConnection((err, connection) => {
            var sql = 'select * from USER where id=?'
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
        var password = "useless";
        web3.eth.personal.newAccount(password).then(function (addr) {
            console.log('新增賬戶:', addr);
            var id = req.body.id;
            var password = req.body.password;
            pool.getConnection((err, connection) => {
                var sql = 'insert into USER(id, password,personality ,smoke , drink , pet , wake , sleep , clean , bath , back , s_custom,m_smoke , m_drink , m_back , m_noise , clock ,sleep_reason, address) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
                connection.query(sql, [id, password, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', addr], (err, result) => {
                    if (err) throw err
                    console.log("register success")
                })
                res.send(addr);
                connection.release()
            })
        });
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
        
            var sql2 = "UPDATE USER SET smoke=?, drink=? , pet=? , wake=? , sleep=? ,clean=? ,bath=?,back=?,s_custom=?,m_smoke=?,m_drink=?,m_back=?,m_noise=?,clock=?,sleep_reason=?  where id=?";

            connection.query(sql2, [smoke,drink,pet,wake,sleep,clean,bath,back,s_custom,m_smoke,m_drink,m_back,m_noise,clock,sleep_reason,id], (err, result) => {
                if (err) throw err;
                console.log("changing date in USER is success")
            })
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

            connection.query(sql, [city, township, roomtype, cost], function (err, result) {
                if (err) throw err;
                if (result.length != 0) {
                    res.send(result)
                }
            });
        })
    },
    getUser(req, res, next) {

        var id = req.body.id;

        pool.getConnection((err, connection) => {
            if (err) throw err;
            var sql = "select * from USER where id=?"

            connection.query(sql, [id], function (err, result) {
                if (err) throw err;
                if (result.length != 0) {
                    res.json(result)
                }
            });
        })
    }
}