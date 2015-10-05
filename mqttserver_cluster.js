/**
 * Created by wuanc on 2015/10/1.
 */
var cluster = require('cluster');
var http=require('http');
var cpu_num = require('os').cpus().length;

if (cluster.isMaster) {
    console.log("==start main process==");
    console.log("==cpu_num=="+cpu_num);

    for (var i = 0; i < 4; i++) {
        cluster.fork();
        //根据cpu的数量主进程 fork 了相同数量的子进程出来
    }

    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('exit worker ' + worker.process.pid + ' died');
    });
} else {
    /**
     * Created by wac on 9/29/15.
     */
    var mosca = require('mosca');
    var mongoUrl = 'mongodb://localhost:27017/mqtt';
//mongodb
    var ascoltatore = {
        //using ascoltatore
        type: 'mongo',
        url: mongoUrl,
        pubsubCollection: 'ascoltatori',
        mongo: {}
    };

//zmq
//var ascoltatore = {
//    type: 'zmq',
//    json: false,
//    zmq: require("zmq"),
//    port: "tcp://127.0.0.1:33333",
//    controlPort: "tcp://127.0.0.1:33334",
//    delay: 5
//};

    var settings = {
        http: {
            port: 5000,
            bundle: true,
            static: './'
        },
        persistence: {
            factory: mosca.persistence.Mongo,
            url: mongoUrl,
        },
        maxInflightMessages:300,
        publishClientDisconnect:true,
        backend: ascoltatore
    };
// mqtt protocol
//var MqttServer = new mosca.Server({
//    port: 8000
//});

//for websocket protocol
//var MqttServer = new mosca.Server({
//    http: {
//        port: 5000,
//        bundle: true,
//        static: './'
//    }
//});
    var MqttServer = new mosca.Server(settings);

    MqttServer.on('clientConnected', function (client) {
        console.log('client connected', client.id);
    });

    /**
     * Listen MQTT topic messages
     **/
    MqttServer.on('published', function (packet, client) {
        var topic = packet.topic;
        switch (topic) {
            case 'pubMsg':
                console.log('message-publish', packet.payload.toString());
                //MQTT转发主题消息
                MqttServer.publish({topic: 'other', payload: 'sssss'});
                //发送消息NODEJS
                console.log('HD: ' + YHSocketMap.get('1000'));
                //发送socket.io消息
                //io.sockets.socket(YHSocketMap.get('1000')).emit('subState', packet);
                break;
            case 'other':
                console.log('message-123', packet.payload.toString());
                break;
        }
        console.log("Published :=", packet.payload);
    });

    MqttServer.on("error", function (err) {
        console.log(err);
    });

    MqttServer.on('subscribed', function (topic, client) {
        console.log("Subscribed :=", client.id);
    });

    MqttServer.on('clientDisconnected', function (client) {
        console.log('Client Disconnected     := ', client.id);
    });
    MqttServer.on('ready', function () {
        //MqttServer.authenticate = authenticate;
        //MqttServer.authorizePublish = authorizePublish;
        //MqttServer.authorizeSubscribe = authorizeSubscribe;

        console.log('mqtt is running...');
    });

    /**
     * authenticate example
     * https://github.com/mcollina/mosca/wiki/Authentication-&-Authorization
     **/
    var authenticate = function (client, username, password, callback) {
        //var authorized = (username.toString() === '18FE34F48379-DC' && password.toString() === '666666');
        var authorized = (username === 'alice' && password.toString() == 'secret' );
        //if (authorized)
        //client.user= username;
        callback(null, authorized);
    }

// the username from the topic and verifing it is the same of the authorized user
    var authorizePublish = function (client, topic, payload, callback) {
        //var ok = client.user == topic.split('/')[2];
        // we can alter the message here
        //if (ok) callback(null, payload);
        //else callback(null, false);

        callback(null, true);
    }

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
    var authorizeSubscribe = function (client, topic, callback) {
        //var ok = client.user === topic.split('/')[2];
        //callback(null, ok);

        callback(null, true);
    }


}