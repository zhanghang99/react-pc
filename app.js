/**
 * Created by zhang on 2019/3/11.
 */
const http=require("http");
const mysql=require("mysql");
const express=require("express");
const qs=require("querystring");
const url=require("url");
var app=express();
var server=http.createServer(app);
server.listen(7077,()=>{console.log('启动成功！')});
var pool=mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"houtai",
    connectionLimit:20
});
app.use(express.static("public"));

app.post("/visitors",(req,res)=>{
    req.on("data",(data)=>{
        var obj = qs.parse(data.toString());
        var uid=obj.uid;
        var year=obj.year;
        var month=obj.month;
        var day=obj.day;
        var visitornum=obj.visitornum;
        pool.getConnection((err,conn)=>{
            if(err)throw err;
            var sql="INSERT INTO visitors VALUES(null,?,?,?,?,?)";
            conn.query(sql,[year,month,day,visitornum,uid],(err,result)=>{
                if(err) throw err;
                console.log(result);
                conn.release();
            })
        })
    })
})
app.get("/queryget",(req,res)=>{
    var output=[
        {lable:"APP端",value:60},
        {lable:"微信端",value:10},
        {lable:"手机浏览器端",value:10},
        {lable:"PC端",value:10},
        {lable:"其他",value:10}
    ];
    res.json(output);
});
app.post("/querypost",(req,res)=>{
    var output=[
        {lable:"APP端",value:60},
        {lable:"微信端",value:10},
        {lable:"手机浏览器端",value:10},
        {lable:"PC端",value:10},
        {lable:"其他",value:10}
    ];
    res.json(output);
})