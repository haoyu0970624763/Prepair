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
				"internalType": "uint256",
				"name": "_lease",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_totalRent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tenantNum",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
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
				"internalType": "address payable",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_rent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_lease",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "howmuch",
				"type": "uint256"
			}
		],
		"name": "contractMoney",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getContractMoney",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "powercost",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
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
				"internalType": "uint256",
				"name": "howmuch",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
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
				"internalType": "uint256",
				"name": "howmuch",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
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
				"internalType": "address",
				"name": "tenantAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rent",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lease",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "houseNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "landlordaddr",
				"type": "address"
			}
		],
		"name": "gettenant",
		"type": "event"
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
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
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
				"internalType": "uint256",
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
				"internalType": "uint256",
				"name": "_powerCost",
				"type": "uint256"
			},
			{
				"internalType": "address",
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
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			}
		],
		"name": "checkIfTenantsHadPaidPower",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "uint256",
				"name": "_houseNumber",
				"type": "uint256"
			}
		],
		"name": "checkIfTenantsHadPaidRent",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "getLandlordHousebyAddr",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getLandlordHouseNum",
		"outputs": [
			{
				"internalType": "uint256",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getTenant",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "ifTenantHasPaidPowerCost",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "ifTenantHasPaidRent",
		"outputs": [
			{
				"internalType": "bool",
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
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tenants",
		"outputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rent",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lease",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "hadPaidRent",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "hadPaidPower",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "landlordAddr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Hid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "powerCost",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];


var abi2 = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_keepPet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_smoke",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_drinking",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_gbfriend",
				"type": "uint256"
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "changepaid",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "distributePenalty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "penaltyToContract",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_str",
				"type": "string"
			}
		],
		"name": "recordPict",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_petcoin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_smokecoin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_drinkingcoin",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_gbfriendcoin",
				"type": "uint256"
			}
		],
		"name": "setCoinRule",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "getCoinRule",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
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
		"inputs": [],
		"name": "getContractMoney",
		"outputs": [
			{
				"internalType": "uint256",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "getPictAll",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getPictNum",
		"outputs": [
			{
				"internalType": "uint256",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "getTenantInfofromAddr",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
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
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "getTenantsfromHouse",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
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
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "getTenantsNumfromHouse",
		"outputs": [
			{
				"internalType": "uint256",
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
				"internalType": "uint256",
				"name": "_whichPenalty",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_houseNum",
				"type": "uint256"
			}
		],
		"name": "howMuchPenalty",
		"outputs": [
			{
				"internalType": "uint256",
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
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "ifPaidPenalty",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var address = '0x02B98323cD03A71E7b20cbD7aF1f397601220054'
var MyContract = new web3.eth.Contract(abi, address);

var address2 = '0x3Df706498831091a40F6Df536b73a3fCD8dD471d'
var LifeContract = new web3.eth.Contract(abi2, address2);


// set UTF8
pool.getConnection((err, connection) => {

	var sql = "alter database PrepairDB character set utf8;"
	var sql2 = "SET NAMES 'utf8'";

	connection.query(sql, function (err, result) {
		if (err) throw err;
	});
	connection.query(sql2, function (err, result) {
		if (err) throw err;
		connection.release()
	});
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

	var sql3 = "SHOW TABLES LIKE 'BOOLRENT'"
	var sql4 = "CREATE TABLE BOOLRENT (id VARCHAR(20), rentID VARCHAR(20))";

	connection.query(sql3, function (err, result) {
		if (err) throw err;
		if (result.length == 0) {
			connection.query(sql4, function (err, result) {
				if (err) throw err;
				console.log("table of BOOLRENT created");
			})
		}
		else {
			console.log("table of BOOLRENT exists");
		}
	});


	var sql5 = "SHOW TABLES LIKE 'HOUSE'"
	var sql6 = "CREATE TABLE HOUSE (id VARCHAR(20), pattern VARCHAR(20),space VARCHAR(20), City VARCHAR(20), Township VARCHAR(20), roomType VARCHAR(20), address VARCHAR(30), cost VARCHAR(20), detailedCost VARCHAR(20), owner VARCHAR(20) , pic VARCHAR(50), moneyAddress VARCHAR(50) , rented VARCHAR(50) , MaxNum INT)";
	var sql7 = "insert into HOUSE ( id ,pattern , space , City , Township , roomType , address , cost, detailedCost,owner,pic,moneyAddress,rented,MaxNum) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

	var house = [
		{
			id: '1',
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
			moneyAddress: '0x679788336d8a4fc401e1b71e8c93fc524e408357',
			MaxNum: 2
		},
		{
			id: '2',
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
			moneyAddress: '0x679788336d8a4fc401e1b71e8c93fc524e408357',
			MaxNum: 3,
		},
		{
			id: '3',
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
			moneyAddress: '0x679788336d8a4fc401e1b71e8c93fc524e408357',
			MaxNum: 2,
		},
		{
			id: '4',
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
			moneyAddress: '0x679788336d8a4fc401e1b71e8c93fc524e408357',
			MaxNum: 4
		},
		{
			id: '5',
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
			moneyAddress: '0x679788336d8a4fc401e1b71e8c93fc524e408357',
			MaxNum: 3
		}
	]
	connection.query(sql5, function (err, result) {
		if (err) throw err;
		if (result.length == 0) {
			connection.query(sql6, (err, result) => {
				if (err) throw err
				console.log("table of HOUSE created")
			})

			for (i = 0; i <= 4; i++) {
				connection.query(sql7, [house[i].id, house[i].pattern, house[i].space, house[i].City, house[i].Township, house[i].roomType, house[i].address, house[i].cost, house[i].detailedCost, house[i].owner, house[i].pic, house[i].moneyAddress, 'no', house[i].MaxNum], (err, result) => {
					if (err) throw err
					console.log("add house")
				})
			}
		}
		else {
			console.log("table of HOUSE exists")
		}
	});
	
	var sql8 = "SHOW TABLES LIKE 'Contract'"
	var sql9 = "CREATE TABLE Contract (houseID VARCHAR(20),id VARCHAR(20),time1 VARCHAR(20),time2 VARCHAR(20),money VARCHAR(20), deposit VARCHAR(20), plug VARCHAR(20),moneyHash VARCHAR(200) ,ele_moneyHash VARCHAR(200))";
	connection.query(sql8, function (err, result) {
		if (err) throw err;
		if (result.length == 0) {
			connection.query(sql9, function (err, result) {
				if (err) throw err;
				console.log("table of Contract created");
			})
		}
		else {
			console.log("table of Contract exists");
		}
		connection.release()
	});
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
			})
			connection.release();
		})
	},
	register(req, res, next) {

		var password = "password";
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
				connection.release();
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

			connection.query(sql2, [smoke, drink, pet, wake, sleep, clean, bath, back, s_custom, m_smoke, m_drink, m_back, m_noise, clock, sleep_reason, id], (err, result) => {
				if (err) throw err;
				console.log("changing date in USER is success")
				res.send("OK");
				connection.release()
			})
		})

	},
	loadHouse(req, res, next) {

		var city = req.body.city;
		var township = req.body.township;
		var roomtype = req.body.roomtype;
		var cost = req.body.cost;

		pool.getConnection((err, connection) => {

			if (err) throw err;
			var sql = "select * from HOUSE where City=? and Township=? and roomType=? and cost=? and rented=?"

			connection.query(sql, [city, township, roomtype, cost, 'no'], function (err, result) {
				if (err) throw err;
				if (result.length != 0) {
					res.send(result)
				}
				connection.release()
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
					connection.release()
				}
			});
		})
	},
	GetBalance(req, res, next) {

		var address = req.body.address;
		web3.eth.getBalance(address).then(function (balance) {
			const etherValue = web3.utils.fromWei(balance, 'ether');
			res.send(etherValue);
		})
	},
	CheckRent(req, res, next) {

		var id = req.body.id;
		var houseID;
		pool.getConnection((err, connection) => {
			if (err) throw err;
			var sql = "select * from BOOLRENT where id=?"
			var sql2 = "select * from HOUSE where id=?"
			connection.query(sql, [id], function (err, result) {
				if (err) throw err;
				if (result.length == 0) {
					res.send('no')
				}
				else {
					houseID = result[0].rentID;

					connection.query(sql2, [houseID], function (err, result) {
						if (err) throw err;
						res.send({houseID:houseID,owner:result[0].owner})
					})
				}
				connection.release()
			});

		})
	},
	GiveMoney(req, res, next) {


		var id=req.body.id;
		var moneyType=req.body.moneyType;
		var money= (req.body.money / 1000.0).toString();
		var eletricMoney= (req.body.eletricMoney / 1000.0).toString();
		
		var address_from = req.body.address;
		var address_to = '0xd5f881f474b8648fa935719b1de77c488a1d0541'
		var password = 'password';

		var instruction;
		var sql = "UPDATE Contract SET moneyHash=? where id=?"
		var sql2 = "UPDATE Contract SET ele_moneyHash=? where id=?"

		var weiValue;
		if(moneyType=='1'){
			weiValue= web3.utils.toWei(money, 'ether')
			instruction=sql
		}
		else{
			weiValue= web3.utils.toWei(eletricMoney, 'ether')
			instruction=sql2
		}
		
		web3.eth.personal.unlockAccount(address_from, password, 9999, function () {
			console.log('unlock accounts ok')
			web3.eth.sendTransaction({
				from: address_from,
				to: address_to,
				value: weiValue
			}, function (err, transactionHash) {
				if (!err) {
					console.log('need mined')
					console.log('transactionHash:', transactionHash)
					pool.getConnection((err, connection) => {
						if (err) throw err;		
						connection.query(instruction,[transactionHash,id], (err, result) => {
							if (err) throw err;
							
						})
					})
				} else {
					console.log('-------------error-----------')
					console.log(err)
					console.log('-------------error-----------')
				}
			})
		});
		

	},
	GetHouseInfo(req, res, next) {

		var houseID = req.body.houseID;
		pool.getConnection((err, connection) => {
			if (err) throw err;
			var sql = "select * from HOUSE where id=?"

			connection.query(sql, [houseID], function (err, result) {
				if (err) throw err;
				if (result.length != 0) {
					res.json(result)
					connection.release()
				}
			});
		})
	},
	writeContract(req, res, next) {
		var houseID = req.body.houseID;
		var userID = req.body.userID;
		var RoommateNum = req.body.RoommateNum;
		var recommend1 = req.body.recommend1;
		var recommend2 = req.body.recommend2;
		var recommend3 = req.body.recommend3;
		var recommend4 = req.body.recommend4;
		var recommend5 = req.body.recommend5;
		var time1=req.body.time1;
		var time2=req.body.time2;
		var money1=req.body.money1;
		var money2=req.body.money2;
		var money3=req.body.money3;
		var money4=req.body.money4;
		var deposit=req.body.deposit;
		var plug=req.body.plug;

		var group = [userID, recommend1, recommend2, recommend3, recommend4, recommend5]
		var Moneygroup = [money1,money2,money3,money4,'','']

		for (i = 6; i > RoommateNum; i--) {
			group.pop()
			Moneygroup.pop()
		}
		console.log(group)
		console.log(Moneygroup)
		var sql = 'insert into BOOLRENT(id, rentID) values(?,?)'
		var sql2 = 'insert into  Contract(houseID,id,time1,time2,money,deposit,plug,moneyHash,ele_moneyHash) values(?,?,?,?,?,?,?,?,?)'
		pool.getConnection((err, connection) => {
			if (err) throw err;
			for (i = 0; i < group.length; i++) {
				connection.query(sql, [group[i], houseID], function (err, result) {
					if (err) throw err;
				});
			}
			for (i = 0; i < group.length; i++) {
				connection.query(sql2, [houseID,group[i], time1,time2,Moneygroup[i],deposit,plug,'',''], function (err, result) {
					if (err) throw err;
				});
			}
			connection.release()
		})
	},
	sendPersonality(req, res, next) {

		var userID = req.body.userID
		var personality = req.body.personality

		var sql = 'UPDATE USER SET personality=? where id=?'
		pool.getConnection((err, connection) => {
			if (err) throw err;
			connection.query(sql, [personality, userID], function (err, result) {
				if (err) throw err;
				console.log("changing is success!")
			});
			connection.release()
		})
	},
	GetMoneyInfo(req, res, next) {

		var houseID = req.body.houseID;
		var id=req.body.id
		
		
		pool.getConnection((err, connection) => {
			if (err) throw err;
			var sql = "select * from Contract where houseID=? and id=?"

			connection.query(sql, [houseID,id], function (err, result) {
				if (err) throw err;
				if (result.length != 0) {
					console.log(result)
					res.send(result)
					connection.release()
				}
			});
		})
	},
	
	addTenant_success(req, res, next) {
		var drinking = req.body.drinking;
		var smoke = req.body.smoke;
		var pet = req.body.pet;
		var gbfriend = req.res.gbfriend;
		///你看你要設房號多少
		var houseNumber = 0;
		///我的合約裡面是房客一個一個設的@@所以每個地址都要來一遍@@
		var tenantAddress = 0xdda305bfb34d2d66cde88d821a5231b8520074e5;
		console.log(pet + ' , ' + smoke + ' , ' + drinking + ' , ' + gbfriend);

		LifeContract.methods.addTenant(houseNumber, tenantAddress, pet, smoke, drinking, gbfriend).send({ from: tenantAddress }, function (error, transactionHash) {
			if (!error) {
				console.log('need mined')
				console.log('transactionHash:', transactionHash)
				res.send({ msg: "ok", transactionHash: transactionHash });
			} else {
				console.log('-------------error-----------')
				console.log(error)
				console.log('-------------error-----------')
			}
		});

	},
	setCoinRule_success(req, res, next) {
		///設定你要設定的房號
		var houseNum = req.body.houseNum;
		///設定的人，表發出交易的人
		var tenantAddr = req.body.tenantAddr;
		var petcoin = req.body.petcoin;
		var smokecoin = req.body.smokecoin;
		var drinkingcoin = req.body.drinkingcoin;
		var gbfriendcoin = req.body.gbfriendcoin;

		console.log(houseNum + ' , ' + tenantAddr + ' , ' + petcoin + ' , ' + smokecoin + ' , ' + drinkingcoin + ' , ' + gbfriendcoin);

		var unlockaddress = tenantAddr;
		///用你的密碼
		var unlockpassword = 'password'
		web3.eth.personal.unlockAccount(unlockaddress, unlockpassword, 9999, function () {
			console.log('unlock accounts ok')
		});

		LifeContract.methods.setCoinRule(houseNum, petcoin, smokecoin, drinkingcoin, gbfriendcoin).send({ from: tenantAddr }, function (error, transactionHash) {
			if (!error) {
				console.log('need mined')
				console.log('transactionHash:', transactionHash)
				res.send(transactionHash);
			} else {
				console.log('-------------error-----------')
				console.log(error)
				console.log('-------------error-----------')
			}
		});

	}

}