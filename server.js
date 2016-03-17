'use strict';

const http = require('http');
const dispatcher = require('httpdispatcher');

const PORT=process.env.PORT || 3000;
console.log(PORT);

//targetpath는 원하는 주소로 변경합니다.
let targetPath = '/.well-known/acme-challenge/address';
//returnValue는 돌려줘야하는 값을 넣습니다.
let returnValue = 'your return value'; 

function handleRequest(request, response){
    try {
        
        console.log(request.url);

        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

dispatcher.onGet('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('main');
});

dispatcher.onGet(targetPath, function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(returnValue);
});    

var server = http.createServer(handleRequest);


server.listen(PORT, function(){
    console.log("Server listening on port : %s", PORT);
});