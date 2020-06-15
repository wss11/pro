
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


var user_schema = new Schema({
    username: String,
    mobile: Number,
    password: String,
    dbpwd: String,
    pdword: String,
    uid: Number,
    age: Number,
    word: String,
    time: Date,
    pic: String
})
exports.User = mongoose.model('user', user_schema)


var banner_schema = new Schema({
    bgColor: String,
    imgUrl: String,
    title: String,

})
exports.Banner1 = mongoose.model("banner1", banner_schema)

var banner2_schema = new Schema({
    imgUrl: String,
    name: String,

})
exports.Banner2 = mongoose.model("banner2", banner2_schema)

var good1_schema = new Schema({
    appPrice: Number,
    deliveryType: Number,
    description: String,
    goodsId: Number,
    goodsName: String,
    groupPrice: Number,
    imgUrl: String,
    marketPrice: Number,
    profit: Number,
    specialAmount: Number,
    specialTag: String,
    themeId: Number,
    totalSales: Number,
    withinbuyPrice: Number,
    withinbuyPriceDiamonds: Number

})
exports.Good1 = mongoose.model("good1", good1_schema)

var good2_schema = new Schema({
    appPrice: Number,
    buyStock: Number,
    deliveryType: Number,
    description: String,
    endTime: Number,
    goodsId: Number,
    goodsName: String,
    groupPrice: Number,
    imgUrl: String,
    marketPrice: Number,
    profit: Number,
    remainStock: Number,
    salePrice: Number,
    secProfit: Number,
    seqNum: Number,
    startTime: Number,
    sumStock: Number,
    tagId: Number,
    totalSales: Number

})
exports.Good2 = mongoose.model("good2", good2_schema)


var goodinfo_schema = new Schema({
    goodsId: Number,
    bannerImgs: Array,
    detailImgs: Array,
    goodsDetail: Array,
    postMessage: String,
    postMessageDetail: String,
    goodsSkus: Array

})
exports.Goodinfo = mongoose.model("goodinfo", goodinfo_schema)


var findgood_schema = new Schema({
    description: String,
    goodsList: Array,
    headUrl: String,
    imgUrl: String,
    imgUrls: Array,
    materialImgUrl: String,
    materialName: String,
    name: String,
    nickName: String,
    shareUrl: String,
    showTime: String,


})
exports.Findgood = mongoose.model("findgood", findgood_schema)


var findbanner_schema = new Schema({
    imgUrl: String
})
exports.Findbanner = mongoose.model("findbanner", findbanner_schema)



//购物车列表
var shopcar_schema = new Schema({
    goodsId: Number,
    imgUrl: String,
    goodsName: String,
    description: String,
    price: Number,
    count: Number,
    mobile: Number,
    check: Boolean,

    markPrice: Number,
    remainStock: Number,
    totalSales: Number,
    brandLogon: String,
    brandName: String,
    postMessage: String,
    postMessageDetail: String,
    bigImg: String,
    activeMaxIncome: Number,


})
exports.Shopcar = mongoose.model('shopcar', shopcar_schema);


//地址信息
var addreList_schema = new Schema({

    name: String,
    tel: Number,
    province: String,
    city: String,
    county: String,
    addressDetail: String,
    mobile: Number
})
exports.AddreList = mongoose.model('addreList', addreList_schema);