
const express = require("express");
const app = express();

const hostname = "0.0.0.0";
const port = 1911;
const http = require("http");;
const server = http.createServer(app);

const connection = require("./utils/connect")

const session = require("express-session")
const path = require("path")

//cors  解决跨域问题，要下载插件  (注意位置：得放到接口前面)
var cors = require("cors");
app.use(cors());

//以下两句话很重要，如果没有，req.body就是undefined
app.use(express.json());   // 获取 POST请求的 FormData  $POST
app.use(express.urlencoded({ extended: false }));  //表单 Form


// 静态目录 __dirname 根目录   public 拆分到 根目录
//需要引用path     此代码在头像上传用到
app.use(express.static(path.join(__dirname, 'public')));



// 注意位置  设置session  session的中间件
//这一步做完后，才会得到req.session,不然是undefined
app.use(session({
    name: "AppText",
    cookie: { maxAge: 1000 * 60 * 60 },  // 时长 60min 
    secret: "test",
    resave: false,
    saveUninitialized: true 
}))


app.get("/index", (req, res) => {
    res.send("这是素店项目的后端服务器..")
})

// 配置校验token中间件。放在这个位置，只对vue的路由起作用
var { checkToken } = require("./utils");
app.use(checkToken)


var vueRouter = require("./vue");
app.use("/vue", vueRouter)


server.listen(port, hostname, () => {
    console.log(`sudian-server is running at http://${hostname}:${port}`)
})