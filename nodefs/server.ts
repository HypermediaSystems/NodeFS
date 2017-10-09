﻿import express = require('express');
var http = require('http');
var cors = require('cors');

var fs = require('fs');
const zlib = require('zlib');

var app = express();

// http://localhost:1337/unc/wolle/ddrive/osm/OpenNrw/harsewinkel/dom1_tiles/18/134348/128141.xyz.gz?cmd=unzip

app.use(cors());

app.use('/unc', function (req: express.Request, res: express.Response) {
    var file = '/' + req.url;
    var pos = (<string>req.url).indexOf('?');
    if (pos > 0) {
        file = '/' + (<string>req.url).substring(0, pos);
    }
    var options = {
        root: '', //basepath + '/',

    };
    res.contentType('text/plain');
    if ( req.query.cmd == 'unzip' ) {
        console.log('GET ' + req.url);

        fs.readFile(file, function (err, content) {
                  if (err) {
                        res.statusCode = 500;
                        res.end('Server error');
                  } else {
                      zlib.gunzip(content, function (_, result) {
                          // res.setHeader("Content-type", "text/html; charset=utf-8");
                          res.status(200).end(result);
                      });
                      // res.status(200).end("content");
                  }
            });

    }
    else if ((<any>res).sendFile) {
        (<any>res).sendFile(file, options);
    }
    else {
        res.sendfile(file, options);
    }

});

http.createServer(app).listen(1337, function () {
    console.log('Express server listening on port 1337');
});
