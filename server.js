
var http=new require('http'),
    fs=new require('fs'),
    url=new require('url');

var server=http.createServer(function(req,res){

    var ourl=url.parse(req.url,true),
        pathname=ourl.pathname,
        squery=ourl.query,
        reg=/\.(HTML|CSS|JS)/i;

    if (reg.test(pathname)){
         try{
             var suffix=reg.exec(pathname)[1].toUpperCase(),
                 suffixType=null;
             switch(suffix){
                 case "HTML":
                     suffixType="text/html";
                     break;
                 case "CSS":
                     suffixType="text/css";
                     break;
                 case "JS":
                     suffixType="text/javascript";
                     break;


             }
             var content=fs.readFileSync("."+pathname,"utf8");
             res.writeHead(200,'content-type:'+suffixType+';charset="uft-8;"');
             res.end(content);
        }catch(e){
             res.writeHead(400);
             res.end("资源文件不存在");
         }

          return;
    }
    //请求的是getData接口
    if(pathname=='/getData'){

        var n=squery["n"]||1;
        var ary=[],
            allData=JSON.parse(fs.readFileSync('./json/data.json'));

        for(var i=(n-1)*10;i<=n*10-1;i++){
            if (i>allData.length-1) break;
            ary.push(allData[i]);
        }

        var obj={
            total:Math.ceil(allData.length/10),
            data:ary
        };

        res.writeHead(200,'content-type:application/json;charset="uft-8;"');
        res.end(JSON.stringify(obj));

    }


});

server.listen(91,function(){
    console.log(" server port 91 created success !");
});