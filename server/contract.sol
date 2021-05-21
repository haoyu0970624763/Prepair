pragma solidity ^0.5.8;
contract Contract{
    address payable landlordAddr;
    
    uint countMoney=0;
    uint tenantCount=0;
    uint houseCount = 0;

    // address payable owner = 0x8883d7dC9FE7f08615e073d1a6afeD2ae71CB3e5;

    struct House{
        address landlordAddr;
        uint id;
        uint lease;
        uint totalRent;
        uint tenantNum;
    }
    
    struct Tenant{
        address addr;
        uint rent;
        uint lease;
        bool hadPaidRent;
        bool hadPaidPower;
        address landlordAddr;
        uint Hid;//landlord's No.x house
        uint id;
        uint powerCost;
    }
    Tenant[] public tenants;

    mapping (address => House[]) houseInfo;//landlord's house's info
    mapping (uint => address payable) houseLandlord;//house'number for landlord
    mapping (uint => uint) houseRent;
    mapping (address => uint) landlordHouseNum;
    
    function addHouse(uint _lease,uint _totalRent,uint _tenantNum,address payable _landlord)public{
            houseInfo[_landlord].push(House(_landlord,houseCount,_lease,_totalRent,_tenantNum));
            houseLandlord[houseCount] = _landlord;
            houseRent[houseCount] = _totalRent;
            landlordHouseNum[_landlord]++;
            houseCount++;
    }
    
    function getLandlordHouseNum(address _addr)public view returns(uint){
        return landlordHouseNum[_addr];
    }
    function getLandlordHousebyAddr(address _addr,uint count)public view returns(address,uint,uint,uint,uint){
        return (houseInfo[_addr][count].landlordAddr,houseInfo[_addr][count].id,houseInfo[_addr][count].lease,houseInfo[_addr][count].totalRent,houseInfo[_addr][count].tenantNum);
    }
    
    mapping (address => Tenant) tenantInfo;//tenant's info
    mapping (uint => address[])houseTenants;
    event gettenant(address tenantAddr,uint rent,uint lease,uint houseNumber,address landlordaddr);
    function addTenant(address payable _addr, uint _rent, uint _lease,uint _houseNumber,address _landlord)public{
        tenantInfo[_addr] = Tenant(_addr,_rent,_lease,false,false,_landlord, _houseNumber,tenantCount,0);
        houseTenants[_houseNumber].push(_addr);
        tenantCount++;
        emit gettenant(_addr,_rent,_lease,_houseNumber,_landlord);
    }
    
    function getTenant(address _addr)public view returns(uint,uint,bool,bool,address,uint,uint){
        return (tenantInfo[_addr].rent,tenantInfo[_addr].lease,tenantInfo[_addr].hadPaidRent,tenantInfo[_addr].hadPaidPower,tenantInfo[_addr].landlordAddr,tenantInfo[_addr].id,tenantInfo[_addr].powerCost);
    }

    function ()external payable{ //fallback function
        //address(this).transfer(msg.value);
        require(msg.data.length == 0);// to prevent the function from doing sth except for receive ether
    }

    event getcontractMoneybyRent(uint howmuch,address whoPaidMoney);
    function rentToContract()public payable{
        require(msg.value == tenantInfo[msg.sender].rent);
        tenantInfo[msg.sender].hadPaidRent = true;
        countMoney += msg.value;
        emit getcontractMoneybyRent(msg.value,msg.sender);
    }

    event getTenantPowerCost(uint powercost,address tenant);
    function setTenantPowerCost(uint _powerCost,address _addr)public{
        tenantInfo[_addr].powerCost = _powerCost;
        emit getTenantPowerCost(_powerCost,_addr);
    }
   
    event getcontractMoneybyPower(uint howmuch,address whoPaidMoney);
    function powerToContract()public payable{
        require(msg.value == tenantInfo[msg.sender].powerCost);
        tenantInfo[msg.sender].hadPaidPower = true;
        countMoney += msg.value;
        emit getcontractMoneybyPower(msg.value,msg.sender);
    }

    //event paidRentornot(bool paidREnt);
    function ifTenantHasPaidRent(address _addr)public view returns(bool){
        //emit paidRentornot(tenantInfo[_addr].hadPaidRent);
        return tenantInfo[_addr].hadPaidRent;
    }
    
    //event paidPowerornot(bool paidPower);
    function ifTenantHasPaidPowerCost(address _addr)public view returns(bool){
        //emit paidPowerornot(tenantInfo[_addr].hadPaidPower);
        return tenantInfo[_addr].hadPaidPower;
    }
    
    //event rentTolandlord(bool landlordGetRent);
    /*function RentToLandlord(uint _houseNumber)public payable returns(bool){
        for(uint i=0 ; i<houseTenants[_houseNumber].length; i++){
            if(tenantInfo[houseTenants[_houseNumber][i]].hadPaidRent == false){
                //emit rentTolandlord(false);
                return false;
            }
        }
        houseLandlord[_houseNumber].transfer(houseRent[_houseNumber]);
        countMoney -= houseRent[_houseNumber];
        //emit rentTolandlord(true);
        for(uint i=0; i<houseTenants[_houseNumber].length; i++){
            tenantInfo[houseTenants[_houseNumber][i]].hadPaidRent = false;
        }
        return true;
    }*/
    
    function checkIfTenantsHadPaidRent(uint _houseNumber)public view returns(bool){
        uint i;
        for(i=0 ; i<houseTenants[_houseNumber].length ; i++){
            if(tenantInfo[houseTenants[_houseNumber][i]].hadPaidRent == false){
                return false;
            }
        }
        return true;
    }
    function RentToLandlord(uint _houseNumber)public {
        houseLandlord[_houseNumber].transfer(houseRent[_houseNumber]);
        countMoney -= houseRent[_houseNumber];
        for(uint i=0; i<houseTenants[_houseNumber].length; i++){
            tenantInfo[houseTenants[_houseNumber][i]].hadPaidRent = false;
        }
    }
    
    
    //event powerTolandlord(bool landlordGetPower);
    /*function PowerCostToLandlord(uint _houseNumber,uint _powerCost)public payable returns(bool){
        require(countMoney >= _powerCost);
        for(uint i=0 ; i<houseTenants[_houseNumber].length; i++){
            if(tenantInfo[houseTenants[_houseNumber][i]].hadPaidPower == false) {
                //emit rentTolandlord(false);
                return false;
            }
        }
        houseLandlord[_houseNumber].transfer(_powerCost);
        countMoney -= _powerCost;
        //emit rentTolandlord(true);
        for(uint i=0; i<houseTenants[_houseNumber].length; i++){
            tenantInfo[houseTenants[_houseNumber][i]].hadPaidPower = false;
        }
        return true;
    }*/
    
    function checkIfTenantsHadPaidPower(uint _houseNumber)public view returns(bool){
        uint i;
        for(i=0 ; i<houseTenants[_houseNumber].length ; i++){
            if(tenantInfo[houseTenants[_houseNumber][i]].hadPaidPower == false){
                return false;
            }
        }
        return true;
    }
    function PowerToLandlord(uint _houseNumber,uint _powerCost)public payable{
        houseLandlord[_houseNumber].transfer(_powerCost);
        countMoney -= _powerCost;
        for(uint i=0; i<houseTenants[_houseNumber].length; i++){
            tenantInfo[houseTenants[_houseNumber][i]].hadPaidPower = false;
        }
    }
    
    
    event contractMoney(uint howmuch);
    function getContractMoney()public returns(uint){
        uint money = address(this).balance;
        emit contractMoney(money);
        return money;
    }
    
}