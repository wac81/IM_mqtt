/**
 * Created by wuanc on 2015/10/18.
 */
var redis = require("redis");
const port = 6379;
const host = '127.0.0.1';
var ClientSender2 = redis.createClient(port, host);
console.log("the host 127.0.0.1 6379 is running!\n");

ClientSender2.subscribe('query');
ClientSender2.on('message', function(channel, Result) {

    console.log(Result+"\n");
});
