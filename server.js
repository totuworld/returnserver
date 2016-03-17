'use strict';

const http = require('http');
const dispatcher = require('httpdispatcher');

const PORT=8080;

//targetpath는 원하는 주소로 변경합니다.
let targetPath = '/.well-known/acme-challenge/bwS7Q_TCJrt8s1HvM8gg83WN9x9I8jLrCCWNtUUd05k';
//returnValue는 돌려줘야하는 값을 넣습니다.
let returnValue = 'bwS7Q_TCJrt8s1HvM8gg83WN9x9I8jLrCCWNtUUd05k.IBkQXVLbjkDk12yEvZSRNwSrUgZx3j23HgqTrqwP1KU'; 

function handleRequest(request, response){
    try {
        
        console.log(request.url);

        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet(targetPath, function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(returnValue);
});    

var server = http.createServer(handleRequest);


server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});