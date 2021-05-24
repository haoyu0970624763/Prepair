pragma solidity ^0.5.8;
contract LifeContract{
    struct Tenant{
        address payable addr;
        uint keepPet;
        uint smoke;
        uint drinking;
        uint gbfriend;
        uint houseid;
    }
    struct Coin{
        uint petcoin;
        uint smokecoin;
        uint drinkingcoin;
        uint gbfriendcoin;
    }
    /*struct Penalty{
        address tenant;
        bool Paid;
    }
    mapping (uint => Penalty[]) result;*/
    uint contractMoney;
    address whoPaidMoney;
    
    mapping (uint => Tenant[]) liferule;
    mapping (uint => Coin) coinrule;
    mapping (address => Tenant) tenantInfo;
    mapping (uint => uint) tenantNum;
    mapping (address => bool) ifPaid;
    function addTenant(uint _houseNum , address payable _addr , uint _keepPet , uint _smoke , uint _drinking , uint _gbfriend)public{
        liferule[_houseNum].push(Tenant(_addr,_keepPet,_smoke,_drinking,_gbfriend,_houseNum));
        ifPaid[_addr] = false;
        tenantNum[_houseNum]++;
        tenantInfo[_addr] = Tenant({
            addr: _addr,
            keepPet: _keepPet,
            smoke: _smoke,
            drinking: _drinking,
            gbfriend: _gbfriend,
            houseid: _houseNum
        });
    }
    function setCoinRule(uint _houseNum,uint _petcoin,uint _smokecoin,uint _drinkingcoin,uint _gbfriendcoin)public{
        coinrule[_houseNum] = Coin({
            petcoin: _petcoin,
            smokecoin: _smokecoin,
            drinkingcoin: _drinkingcoin,
            gbfriendcoin: _gbfriendcoin
        });
    }
    function getCoinRule(uint _houseNum)public view returns(uint,uint,uint,uint){
        return(coinrule[_houseNum].petcoin,coinrule[_houseNum].smokecoin,coinrule[_houseNum].drinkingcoin,coinrule[_houseNum].gbfriendcoin);   
    }

    function getTenantsNumfromHouse(uint _houseNum)public view returns(uint){
        return tenantNum[_houseNum];
    }
    function getTenantsfromHouse(uint _houseNum,uint _num)public view returns(address,uint,uint,uint,uint){
        return (liferule[_houseNum][_num].addr,liferule[_houseNum][_num].keepPet,liferule[_houseNum][_num].smoke,liferule[_houseNum][_num].drinking,liferule[_houseNum][_num].gbfriend);    
    }
    function getTenantInfofromAddr(address _addr)public view returns(uint,uint,uint,uint){
        return (tenantInfo[_addr].keepPet,tenantInfo[_addr].smoke,tenantInfo[_addr].drinking,tenantInfo[_addr].gbfriend);        
    } 
        
    /////     image    ///////
    struct Images{
        uint housenum;
        address owner;
        string pict;
    }
    
    //mapping (address => Images[]) picture;
    mapping (address => string[]) picture;
    mapping (address => uint) pictNum;
    function recordPict(address _addr,string memory _str) public {
        //picture[_addr].push(Images(_housenum,_addr,_str)); 
        picture[_addr].push(_str);
        pictNum[_addr]++;
    }
    function getPictNum(address _addr)public view returns(uint){
        return pictNum[_addr];
    }
    function  getPictAll(address _addr,uint count)public view returns(string memory){
        return (picture[_addr][count]);
    }
    
    /////     penal     //////
    
    //mapping (uint => Penalty[]) result;
    mapping (address => bool) whohadpaid;//be used for the function of ifPaidPenalty to check if paid,thenchange to false
    
    function howMuchPenalty(uint _whichPenalty,uint _houseNum)public view returns(uint){
            if(_whichPenalty == 1) return (coinrule[_houseNum].petcoin);
            else if(_whichPenalty == 2) return (coinrule[_houseNum].smokecoin);
            else if(_whichPenalty == 3) return (coinrule[_houseNum].drinkingcoin);
            else return (coinrule[_houseNum].gbfriendcoin);
    }

    function penaltyToContract()public payable{
        ifPaid[msg.sender] = true;
        whohadpaid[msg.sender] = true;
        contractMoney += msg.value;
    }
    function distributePenalty(uint _houseNum)public{
        uint people = tenantNum[_houseNum]-1;
        for(uint i=0;i<=people;i++){
            if(ifPaid[liferule[_houseNum][i].addr] == false){
                (liferule[_houseNum][i].addr).transfer(address(this).balance/people);
            }
            else ifPaid[liferule[_houseNum][i].addr] = false;
        }
        contractMoney = people-1;
    }
    
    function ifPaidPenalty(address _addr)public view returns(bool){
        if(ifPaid[_addr]==false && whohadpaid[_addr]==true) return true;
        else return false;
    }//then call changepaid in js
    function changepaid(address _addr)public{
        whohadpaid[_addr] = false;
    }
    
    function getContractMoney()public view returns(uint){
        uint money = address(this).balance;
        return money;
    }
    
}