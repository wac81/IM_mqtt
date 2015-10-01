/**
 * Created by wac on 9/29/15.
 */
var mqtt    = require('mqtt');
var fork = require('child_process').fork;
//var client  = mqtt.connect('ws://test.mosquitto.org:80/mqtt');
var settings = {
    keepalive: 10,
    protocolId: 'websocket',
    //protocolVersion: 3,
    clientId: 'client-a',
//        clientId: client_Id,
    username:"alice",
    password:"secret",
    clean: false

}

//var client = mqtt.connect('ws://acnlp.com:5000', settings);
////var client  = mqtt.connect('ws://127.0.0.1:5000',settings);
//
//for(var i=0;i<1000;i++) {
//    client.subscribe('presence');
//    client.unsubscribe('presence');
//}
//for(var i=0;i<1000;i++) {
//    client.publish("presence", 'hello offline msg1');
//    client.publish("presence", 'hello offline msg2');
//    client.publish("presence", 'hello offline msg3');
//    client.publish("presence", 'hello offline msg4');
//}
//
//
//client.on('message', function (topic, message) {
//    // message is Buffer
//    console.log(message.toString());
//    //client.end();
//});


for(var i=0;i<1000;i++) {
    var worker = fork('./mqttclient.js') //����һ����������
    //setTimeout(fork('./mqttclient.js'),1000)
}
//worker.on('message', function(m) {//���չ������̼�����
//    if ('object' === typeof m && m.type === 'fibo') {
//        worker.kill();//����ɱ�����̵��ź�
//        res.send(m.result.toString());//��������ؿͻ���
//    }
//});



