
var http = require('http');
var request = require('request');

var arrstr = [
    //'天哪不知道啥意思',
    "神马意思不太懂",
    "有木有事件教我一下呢？",
    "需要学习的东西还真多呢！",
    "好难的问题，你叫什么名字？做我的老师吧。",
    "学习是一种态度，需要认真",
    "您说的啥东西我不太懂，抱歉，今天要休息了",
    "哦，天哪，不如你问我点别的东西吧",
    "你看看现在几点了，不要玩了。",
    "你点问题把我弄的很不爽，拒绝回答你的问题"
];


var url = 'http://cnlp.me/kwAnalyse/' + '撒地方';

request.get(url, function (error, response, body) {
    print(url)
    console.log(url)
    if (!error && response.statusCode == 200) {
        var obj2 = JSON.parse(body.toString());
    }
})



http.get(url, function (res) {
    var size = 0;
    var chunks = [];
    res.on('data', function (chunk) {
        size += chunk.length;
        chunks.push(chunk);
    });
    res.on('end', function () {
        var data = Buffer.concat(chunks, size);
        //console.log(data.toString());
        var obj2 = JSON.parse(data.toString());
        //console.log(obj2.rankList);
        //console.log(obj2.rankList.length);

        //for(var i = 0; i < obj2.rankList.length; i++){
        //    console.log(obj2.rankList[i].word);
        //}

        if (obj2.rankList.length > 0) {
            countNum = 1;


            var pathUrl = '';
            for (var i = 0; i < obj2.rankList.length; i++) {
                //console.log(obj2.rankList[i].word);
                if (obj2.rankList[i].word === '����' || obj2.rankList[i].word == '��ʾ') {
                    //console.log("SymbolOf");
                    pathUrl = '/&rel=/r/SymbolOf';
                    break;

                } else if (obj2.rankList[i].word == "����" || obj2.rankList[i].word == '����' || obj2.rankList[i].word == '����') {
                    //console.log("MadeOf");
                    pathUrl = '/&rel=/r/MadeOf';
                    break;

                } else if (obj2.rankList[i].word == '����' || obj2.rankList[i].word == 'Ҳ��') {
                    //console.log("Causes");
                    pathUrl = '/&rel=/r/Causes';
                    break;

                } else {


                    pathUrl = '/';
                }
                //console.log(allpathUrl);
            }
            var allpathUrl = '/data/5.2/search?text=' + obj2.rankList[0].word + pathUrl;
        } else {
            var allpathUrl = '/data/5.2/search?text=������';
        }


        op = {
            host: 'conceptnet5.media.mit.edu',
            port: 80,
            //path: '/data/5.2/search?text='+ obj2.rankList[0].word,
            path: allpathUrl,
            method: 'GET',
            agent: false,
            headers: {
                'Content-Type': 'application/json'
            }

        }

        http.get(op, function (res) {
            var size = 0;
            var chunks = [];
            //console.log(res.statusCode);
            res.on('data', function (chunk) {
                size += chunk.length;
                chunks.push(chunk);
            });

            res.on('end', function () {
                var data = Buffer.concat(chunks, size);
                //console.log(data.toString());
                var obj2 = JSON.parse(data.toString());

                //console.log(obj2.edges.length);
                //
                //for(var i = 0; i < obj2.edges.length; i++){
                //    console.log(obj2.edges[i].surfaceText);
                //}


                if (obj2.edges.length < 1) {

                    var token = parseInt(10 * Math.random());
                    //console.log('�����' + token);
                    msgString = arrstr[token];
                }else{
                    var token = Math.floor(0 + Math.random() * (obj2.edges.length - 0));
                    //console.log(obj2.edges[token].surfaceText);
                    if(obj2.edges[token].surfaceText.search(/\[|\]/g) >=0){

                        temp = obj2.edges[token].surfaceText.replace(/\[/g, "");
                        temp = temp.replace(/\]/g, "");
                    }else{
                        temp = obj2.edges[token].surfaceText;
                    }
                    if (temp.match(/[A-Za-z]+$/) != null) {
                        msgString = temp;

                    } else {

                        msgString = temp.replace(/ /g, "");
                    }


                    //msgString = temp.replace(/ /g,"");


                }


                /////

                new Message(msgString, messageOptions, function (replyMessageObject) {
                    user.updateHistory(msg, replyMessageObject);

                    // We send back a smaller message object to the clients.
                    var clientObject = {
                        replyId: replyObj.replyId,
                        createdAt: replyMessageObject.createdAt || new Date(),
                        string: replyMessageObject.raw || "",
                        gambitId: replyObj.gambitId,
                        topicName: replyObj.topicName
                    };

                    var newClientObject = mergex(clientObject, replyObj.props || {});

                    user.save(function (e, r, s) {
                        return next(err, newClientObject);
                    });
                });

                //////

            });
        }).on('error', function (e) {
            console.log("Got error: " + e.message);
        });


    });
}).on('error', function (e) {
    console.log("Got error: " + e.message);
});