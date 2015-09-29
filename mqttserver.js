/**
 * Created by wac on 9/29/15.
 */
var mosca = require('mosca');

// mqtt protocol
//var MqttServer = new mosca.Server({
//    port: 8000
//});

//for websocket protocol
var MqttServer = new mosca.Server({
    http: {
        port: 5000,
        bundle: true,
        static: './'
    }
});

MqttServer.on('clientConnected', function(client){
    console.log('client connected', client.id);
});

/**
 * Listen MQTT topic messages
 **/
MqttServer.on('published', function(packet, client) {
    var topic = packet.topic;
    switch(topic){
        case 'pubMsg':
            console.log('message-publish', packet.payload.toString());
            //MQTTת��������Ϣ
            MqttServer.publish({topic: 'other', payload: 'sssss'});
            //������ϢNODEJS
            console.log('HD: '+ YHSocketMap.get('1000'));
            //����socket.io��Ϣ
            //io.sockets.socket(YHSocketMap.get('1000')).emit('subState', packet);
            break;
        case 'other':
            console.log('message-123', packet.payload.toString());
            break;
    }
});

MqttServer.on('ready', function(){
    console.log('mqtt is running...');
});

/**
 * authenticate example
 * https://github.com/mcollina/mosca/wiki/Authentication-&-Authorization
 **/
var authenticate = function(client, username, password, callback) {
    //var authorized = (username.toString() === '18FE34F48379-DC' && password.toString() === '666666');
    var authorized = (password.toString() === '666666');
    if (authorized){
        //�洢�豸����
        client.type = username.toString().split('-')[1];
    }
    callback(null, authorized);
}