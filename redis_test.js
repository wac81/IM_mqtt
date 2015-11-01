/**
 * Created by wuanc on 2015/10/18.
 */

var redis = require("redis");
const port = 6379;
const host = '127.0.0.1';
var ClientSender = redis.createClient(port, host);
console.log("the host 127.0.0.1 6379 is running!\n");


ClientSender.on('ready',
    function(){

        ClientSender.publish("query", "message1");
        console.log("publishing message1!\n");

    });


