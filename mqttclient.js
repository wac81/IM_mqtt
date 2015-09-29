/**
 * Created by wac on 9/29/15.
 */
var mqtt    = require('mqtt');
//var client  = mqtt.connect('ws://test.mosquitto.org:80/mqtt');
var client  = mqtt.connect('ws://127.0.0.1:5000');

client.on('connect', function () {
    client.subscribe('presence');
    client.publish('presence', 'Hello mqtt');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    //client.end();
});