"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require('http');
var fs = require('fs');
var zlib = require('zlib');
var app = express();
// http://localhost:1337/wolle/ddrive/osm/OpenNrw/harsewinkel/dom1_tiles/18/134348/128141.xyz.gz
app.use('/wolle', function (req, res) {
    var file = '//wolle/' + req.url;
    var options = {
        root: '',
    };
    res.contentType('text/plain');
    if (req.url.lastIndexOf('.gz') > 0) {
        var inp = fs.createReadStream(file);
        var unzip = zlib.createUnzip();
        inp.pipe(unzip).pipe(res);
        inp.on('end', function () {
            // res.status(200).end("Completed");
        });
        inp.on('error', function () {
            res.status(404).end("file not found");
        });
    }
    else if (res.sendFile) {
        res.sendFile(file, options);
    }
    else {
        res.sendfile(file, options);
    }
});
http.createServer(app).listen(1337, function () {
    console.log('Express server listening on port 1337');
});
//# sourceMappingURL=server.js.map