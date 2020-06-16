
// NodeJs  链接MongoDB 数据库
// 使用 mongoose

// 导入mongoos模块
const mongoose = require("mongoose");

const hostname = "0.0.0.0";
const port = 27017
const dbName = "reactpro"    //数据库名称
const user = "?";
const password = "?";


const mongoUrl = `mongodb://${hostname}:${port}/${dbName}`;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("连接失败")
    } else {
        console.log("连接成功")
    }
});


const connection = mongoose.connection

// 以下  可写可不写
// 连接成功
connection.on("connected", () => {
    console.log('Mongoose connection open to ' + mongoUrl);
})

// 数据库开启
connection.on("open", () => {
    console.log('mongoose open')
});

// 链接异常
connection.on('error', err => {
    console.log('Mongoose connection error: ' + err);
    // res.json()
})

// 断开链接
connection.on('disconnected', () => {
    console.log('Mongoose connection fail 链接失败')
})

module.exports = connection;