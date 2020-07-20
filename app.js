let express = require('express');
let formidable = require('formidable');
let fs   = require('fs');
let prependFile = require('prepend-file');
let app = express();
const port = process.env.PORT || 5000; // port number on which the application will run

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res){
    let form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name; 
        console.log("file.path --->>>", file.path);
    });

    form.on('file', function (name, file){
        var textData = "New File Contents";
        fs.appendFile(file.path, 'new logs............', 'utf8', function(err){
            if(err){
                console.log("append error --->>>",err);
            }
            console.log("Successful append !!!");
        });
        // prependFile(__dirname + '/uploads/' + file.name, textData+'\n\n', function (err) {
        //     if (err) {
        //         // Error
        //         console.log("Error in appending file:", err)
        //     }
        //     // Success
        //     console.log('Append at start(prepend) was successful.');
        // });
        // fs.writeFileSync((__dirname + '/uploads/' + file.name), textData, "UTF-8",{
        //     flags: 'ax',
        //     mode: 0o666,
        //     start: 0});
        // const log = fs.createWriteStream(__dirname + '/uploads/' + file.name, { 
        //     encoding: "utf8", 
        //     flag: "ax", 
        //     mode: 0o666,
        //     start: 0
        // });

        // // on new log entry ->
        // log.write(textData+'\n');
        //log.end();
        console.log('Uploaded ' + file.name);
        });
        res.sendFile(__dirname + '/index.html');
});

// Server listening to a port and runs the entire application
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});