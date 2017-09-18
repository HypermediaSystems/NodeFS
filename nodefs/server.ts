import express = require('express');
var http = require('http');

var fs = require('fs');
const zlib = require('zlib');

var app = express();

// http://localhost:1337/wolle/ddrive/osm/OpenNrw/harsewinkel/dom1_tiles/18/134348/128141.xyz.gz

app.use('/wolle', function (req: express.Request, res: express.Response) {
    var file = '//wolle/' + req.url;
    var options = {
        root: '', //basepath + '/',

    };
    res.contentType('text/plain');
    if ((<string>req.url).lastIndexOf('.gz') > 0) {
        const inp = fs.createReadStream(file);  
        const unzip = zlib.createUnzip();  
        inp.pipe(unzip).pipe(res);
        inp.on('end', function () {
           // res.status(200).end("Completed");
        });
        inp.on('error', function () {
            res.status(404).end( "file not found" );
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
