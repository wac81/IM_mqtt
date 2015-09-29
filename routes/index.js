var express = require('express');
var router = express.Router();

var mqtt    = require('mqtt');
var client  = mqtt.connect('ws://127.0.0.1:5000');

var request = require('request')

//client.subscribe('presence');
//
//client.on('message', function (topic, message) {
//  // message is Buffer
//  //client.publish('presence', req.body.content);
//    request.get('http://127.0.0.1:3000/',function(error,request,data){
//        if (error) console.log(eroor);
//
//    })
//  console.log(message.toString());
//
//});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',text:'wactest' });
});

router.post('/', function(req, res, next) {
  if(req.body.content!=null) {
     return  client.publish('presence', req.body.content);
  }
    return
});

module.exports = router;
