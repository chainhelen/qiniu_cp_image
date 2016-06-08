var exec = require('child_process').exec;
var listCmdStr = './qshell listbucket miusky miusky.list.txt && rm -rf SrcDestKeyMapFile';
var cpCmdStr = './qshell batchcopy miusky miusky-official SrcDestKeyMapFile';
var fs = require('fs');

exec(listCmdStr, function(err, stdout, stdin){
    console.log("all data are writed in miusky.list.txt");
    console.log("all image are putting in SrcDestKeyMapFile ");

    var writedata = [];
    fs.readFile('miusky.list.txt', 'utf-8', function(err,data){
        data.split('\n').forEach(function(line){
            var linearr = line.split('\t');
            var len = linearr.length;
            if(2 <= len && -1 != linearr[len - 2].indexOf('image')){
                writedata.push(linearr[0] + '\n');
            }
        });
        console.log(writedata);


        for(var i = 0;i < writedata.length;i++){
            //闭包
            (function(i){
                var j = i;
                fs.writeFile('SrcDestKeyMapFile', writedata[j], 
                        {
                            encoding : 'utf-8', 
                            mode : 777,
                            flag : 'a'
                        },
                        function(err){
                            if(err){
                                console.log(err);
                            } else {
                                console.log(writedata[j] + ' write successful \t\t ' + j);
                            }
                            if(j == writedata.length - 1){
                                console.log("all images are list in SrcDestKeyMapFile \t\t " + j);
                            }
                        });
            })(i);
        }
    });
});
