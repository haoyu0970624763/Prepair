var mining_threads = 1
var txBlock = 0

function checkWork() {
if (eth.getBlock("pending").transactions.length > 0) {
    txBlock = eth.getBlock("pending").number
    if (eth.mining) return;
    console.log("  Transactions pending. Mining...");
    miner.start(mining_threads)
    while (eth.getBlock("latest").number < txBlock + 1) {
      if (eth.getBlock("pending").transactions.length > 0) txBlock = eth.getBlock("pending").number;
        }
    console.log("confirmations achieved; mining stopped.");
    miner.stop()
}
else {
    miner.stop()
     }
}

eth.filter("latest", function(err, block) { checkWork(); });
eth.filter("pending", function(err, block) { checkWork(); });

checkWork();