/**
 * Created by wac on 9/29/15.
 */
var mqtt    = require('mqtt');
//var client  = mqtt.connect('ws://test.mosquitto.org:80/mqtt');
var client_Id = 'user_' + Math.random().toString(16).substr(2, 8);
var settings = {
    keepalive: 10,
    protocolId: 'websocket',
    //protocolVersion: 3,
    //clientId: 'client-a',
    clientId: client_Id,
    username:"alice",
    password:"secret",
    clean: false

}

var client = mqtt.connect('ws://acnlp.com:5000', settings);

for(var i=0;i<100;i++) {
    client.publish("presence", 'hello offline msg'+i);
}
//var client  = mqtt.connect('ws://127.0.0.1:5000',settings);
//client.publish("presence", 'hello offline msg1',{qos:1});
//client.publish("presence", 'hello offline msg2',{qos:1});
//client.publish("presence", 'hello offline msg3',{qos:1});
//client.publish("presence", 'hello offline msg4',{qos:1});
client.end();

//client.on('message', function (topic, message) {
//    // message is Buffer
//    console.log(message.toString());
//    //client.end();
//});



