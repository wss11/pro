

const express = require("express");
const app = express();

const hostname = "0.0.0.0";
const port = 2000;
const http = require("http");
const server = http.createServer(app);
const path = require("path"); // Node 自带模块

const connection = require("./utils/connect")

app.get("/index",(req,res)=>{
    res.send("这是react的后端的服务器")
})

server.listen(port,hostname,()=>{
    console.log(`react-server is running at http://${hostname}:${port}`)
})

//以下两句话很重要，如果没有，req.body就是undefined
app.use(express.json());   // 获取 POST请求的 FormData  $POST
app.use(express.urlencoded({extended:false}));  //表单 Form

app.use(express.static(path.join(__dirname, 'public')))

//解决跨域问题
var cors = require("cors");
app.use(cors())


//设置路由别名   （注意放的位置，要写在接口前面）
var reactRouter=  require("./react");
app.use("/react",reactRouter)

