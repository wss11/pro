
// Schema主要用于定义MongoDB中集合Collection里文档document的结构
// Schema 表结构的定义 定义文档的结构和属性  
// 每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力
// {username:String,age:Number}

// String      字符串
// Number      数字    
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID    
// Array       数组
const mongoose = require("mongoose");
var Schema = mongoose.Schema;


var liuyan_schema = new Schema({
    title: String,
    content: String,
    time: Date
})
exports.Liuyan = mongoose.model('liuyan', liuyan_schema)


var movie_schema = new Schema({
    name: String,
    actors: Array,
    poster: String,
    category: String,
    director: String,
    synopsis: String,
    filmType: Object,
    grade: String
})
exports.Movie = mongoose.model("movie", movie_schema)


//验证码
var code_schema = new Schema({
    mobile: Number,
    code: Number,
    time: Date
})
exports.Code = mongoose.model("code", code_schema)


//头像
var pic_schema = new Schema({
    mobile: Number,
    pic: String,
    time: Date
})
exports.Pic = mongoose.model("pic", pic_schema)