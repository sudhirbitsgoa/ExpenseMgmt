db = connect("localhost:27017/bank");
db.accounts.insert({ acType:'merchant', amount: 20, userId:'merchant'})