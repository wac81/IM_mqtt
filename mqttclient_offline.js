var mqtt    = require('mqtt');
//var client  = mqtt.connect('ws://test.mosquitto.org:80/mqtt');
var settings = {
    keepalive: 10,
    protocolId: 'websocket',
    //protocolVersion: 3,
    clientId: 'client-b',
//        clientId: client_Id,
    username:"alice",
    password:"secret",
    clean: false

}
var client  = mqtt.connect('ws://127.0.0.1:5000',settings);

client.subscribe('presence',{qos:1});
//client.on('connect', function () {
//    client.subscribe('presence',{qos:1});
//});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    //client.end();
});